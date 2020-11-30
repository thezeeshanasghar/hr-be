
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const GetEmployeeReport = async (req, res) => {
	try {
		var query = `
		SELECT 
		[dbo].[Company].Id,
		EmployeeCode,
		InsuranceId,
		TaxationId,
		Cnic,
		FirstName,
		LastName,
		FORMAT(DOB,'dd/MM/yyyy') AS DOB, 
		FORMAT(HireDate,'dd/MM/yyyy') AS HireDate,
		emp.[Address],
		emp.Contact,
		(SELECT  [Name] FROM [myuser].[LookupItems] WHERE Id=Gender)AS Gender,
		(SELECT  [Name] FROM [myuser].[LookupItems] WHERE Id=MaritalStatus)AS MaritalStatus,
		(SELECT  [Name] FROM [myuser].[LookupItems] WHERE Id=Country)AS Country,
		(SELECT  [Name] FROM [myuser].[LookupItems] WHERE Id=Title)AS Title,
		(SELECT SUM(Amount) FROM myuser.OnetimeElement WHERE EmployeeId=emp.Id) AS Salary,
		 emp.Email,
		 BankId, 
		 IBAN,
		 FORMAT(EffectiveDate,'dd/MM/yyyy') AS EffectiveDate,
		 IsPrimary,
		 ( SELECT  [Name] FROM [myuser].[LookupItems] WHERE Id=CurrencyCode)AS CurrencyCode,
		 [BankName],
		 [dbo].[Company].CompanyName
		 FROM [dbo].[Employees] emp 
		 INNER JOIN [dbo].[EmployeeBankAccount] empbank ON emp.Id = empbank.EmployeeId
		 INNER JOIN [dbo].[Company]  ON [dbo].[Company].Id=emp.CompanyId
		 INNER JOIN [dbo].[Bank] ON [dbo].[Bank].Id=empbank.[BankId]`;
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					console.log(err)
				}
				else {
					var response = { data: profileset.recordset };
					res.send(response);
					return;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}
const GetEmployeePayrollReport = async (req, res) => {
	try {
		var query = `
		select FirstName,
		format(HireDate,'dd/MM/yyyy') as HireDate,
		(SELECT SUM(value) from  [myuser].[EmployeePayRoll] where EmployeeId=emp.Id) as NetSalary,
		payele.Description as PayElement,value
		from [dbo].[Employees] emp inner join [myuser].[EmployeePayRoll] payroll on payroll.EmployeeId=emp.Id 
		inner join
	   [dbo].[PayElement] payele on payele.Id=payroll.PayelementId
	   order by emp.Id`;
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					console.log(err)
				}
				else {
					var response = { data: profileset.recordset };
					res.send(response);
					return;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}
const GetEmployeeVarrianceReport = async (req, res) => {
	console.log(req.body)
	try {
		var query = `
			

DECLARE @PayMonth varchar(100)='`+req.body.Date+`'
DECLARE @FirstDate DATE,@LastDate DATE,@PrevFistDate DATE,@prevLastDate DATE,@CompanyName VARCHAR(100);
SELECT @CompanyName=CompanyName FROM dbo.Company WHERE Id='`+req.body.CompanyId+`'
 
SELECT @FirstDate= DATEADD(month, DATEDIFF(month, 0, @PayMonth), 0) 
SELECT @LastDate=EOMONTH(@PayMonth);

select @PrevFistDate=DATEADD(MONTH, DATEDIFF(MONTH, 0, @PayMonth)-1, 0) --First day of previous month
select @prevLastDate=DATEADD(MONTH, DATEDIFF(MONTH, -1, @PayMonth)-1, -1) --Last Day of previous month


SELECT dbo.Company.CompanyName
FROM  myuser.SalaryPayRoll payroll
INNER JOIN myuser.PaymentDetail detail ON detail.PayRollCode=payroll.PayGroup
INNER JOIN dbo.Company ON Company.Id = payroll.CompanyId
WHERE payroll.Paidon>=@FirstDate AND payroll.Paidon<=@LastDate AND payroll.CompanyId='`+req.body.CompanyId+`';

CREATE TABLE #CurrentMonth(Id BIGINT IDENTITY(1,1),amount MONEY,payElement BIGINT);
INSERT INTO #CurrentMonth
SELECT isnull(SUM(detail.amount),0) AS amount,detail.PayElementId
FROM  myuser.SalaryPayRoll payroll
INNER JOIN myuser.PaymentDetail detail ON detail.PayRollCode=payroll.PayGroup
WHERE payroll.Paidon>=@FirstDate AND payroll.Paidon<=@LastDate AND payroll.CompanyId='`+req.body.CompanyId+`' GROUP BY detail.PayElementId ;

CREATE TABLE #LastMonth(Id BIGINT IDENTITY(1,1),amount MONEY,payElement BIGINT);
INSERT INTO #LastMonth
SELECT isnull(SUM(detail.amount),0) AS currentMonth,detail.PayElementId
FROM  myuser.SalaryPayRoll payroll
INNER JOIN myuser.PaymentDetail detail ON detail.PayRollCode=payroll.PayGroup
WHERE payroll.Paidon>=@PrevFistDate AND payroll.Paidon<=@prevLastDate AND payroll.CompanyId='`+req.body.CompanyId+`' GROUP BY detail.PayElementId;

SELECT @CompanyName AS company,currentMonth.payElement,lookups.Name as GroupName,currentMonth.amount AS CURRENTMONTH,LastMonth.amount AS LASTMONTH,(currentMonth.amount-LastMonth.amount) AS Varrience,format(@LastDate,'dd/MM/yyyy') AS LastDate,format(@FirstDate,'dd/MM/yyyy') AS FirstDate FROM #CurrentMonth currentMonth 
INNER JOIN #LastMonth LastMonth ON currentMonth.payElement=LastMonth.payElement
INNER JOIN  dbo.PayElement ele ON  ele.Id=currentMonth.payElement
INNER JOIN  myuser.LookupItems lookups ON lookups.Id=ele.GroupId;
DROP TABLE #CurrentMonth;
DROP TABLE #LastMonth
`;
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					console.log(err)
				}
				else {
					var response = profileset.recordsets[1];
					res.send(response);
					return;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}



const getIndvVarriancereport = async (req, res) => {
	console.log(req.body)
	try {
		var query = `

		DECLARE @PayMonth varchar(100)='`+req.body.Date+`'
		DECLARE @FirstDate DATE,@LastDate DATE,@PrevFistDate DATE,@prevLastDate DATE,@CompanyName VARCHAR(100);
		SELECT @CompanyName=CompanyName FROM dbo.Company WHERE Id='`+req.body.CompanyId+`'
		 
		SELECT @FirstDate= DATEADD(month, DATEDIFF(month, 0, @PayMonth), 0) 
		SELECT @LastDate=EOMONTH(@PayMonth);
		
		select @PrevFistDate=DATEADD(MONTH, DATEDIFF(MONTH, 0, @PayMonth)-1, 0) --First day of previous month
		select @prevLastDate=DATEADD(MONTH, DATEDIFF(MONTH, -1, @PayMonth)-1, -1) --Last Day of previous month
		
		
		
		CREATE TABLE #CurrentMonth(Id BIGINT IDENTITY(1,1),amount MONEY,payElement BIGINT,EmployeeId BIGINT);
		INSERT INTO #CurrentMonth
		SELECT isnull(SUM(detail.amount),0) AS amount,detail.PayElementId,EmployeeId
		FROM  myuser.SalaryPayRoll payroll
		INNER JOIN myuser.PaymentDetail detail ON detail.PayRollCode=payroll.PayGroup
		WHERE payroll.Paidon>=@FirstDate AND payroll.Paidon<=@LastDate AND payroll.CompanyId='`+req.body.CompanyId+`' GROUP BY detail.PayElementId,payroll.EmployeeId ;
		
		CREATE TABLE #LastMonth(Id BIGINT IDENTITY(1,1),amount MONEY,payElement BIGINT,EmployeeId BIGINT);
		INSERT INTO #LastMonth
		SELECT isnull(SUM(detail.amount),0) AS currentMonth,detail.PayElementId,payroll.EmployeeId
		FROM  myuser.SalaryPayRoll payroll
		INNER JOIN myuser.PaymentDetail detail ON detail.PayRollCode=payroll.PayGroup
		WHERE payroll.Paidon>=@PrevFistDate AND payroll.Paidon<=@prevLastDate AND payroll.CompanyId='`+req.body.CompanyId+`' GROUP BY detail.PayElementId,payroll.EmployeeId;
		
		SELECT @CompanyName AS company,currentMonth.payElement,lookups.Name as GroupName,currentMonth.amount AS CURRENTMONTH,LastMonth.amount AS LASTMONTH,(currentMonth.amount-LastMonth.amount) AS Varrience,format(@LastDate,'dd/MM/yyyy') AS LastDate,format(@FirstDate,'dd/MM/yyyy') AS FirstDate,CONCAT(emp.FirstName,' ',emp.LastName ) AS Name FROM #CurrentMonth currentMonth 
		INNER JOIN #LastMonth LastMonth ON currentMonth.payElement=LastMonth.payElement
		INNER JOIN  dbo.PayElement ele ON  ele.Id=currentMonth.payElement
		INNER JOIN  myuser.LookupItems lookups ON lookups.Id=ele.GroupId
		INNER JOIN  dbo.Employees emp ON emp.Id = currentMonth.EmployeeId;
		DROP TABLE #CurrentMonth;
		DROP TABLE #LastMonth
		
`;
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					console.log(err)
				}
				else {
					var response = profileset.recordset;
					res.send(response);
					return;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}
module.exports = { GetEmployeeReport, GetEmployeePayrollReport, GetEmployeeVarrianceReport ,getIndvVarriancereport};