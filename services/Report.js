
const { message } = require('../constant/variables');
const { sql, poolPromise } = require('../config/db');
const { MAX } = require('mssql');
var excel = require('excel4node');
var dateFormat = require('dateformat');
var path = require('path');
var mime = require('mime');
var fs = require('fs');
const { pageOrder } = require('excel4node/distribution/lib/types');


 function Report(response){
console.log(response);
	
	return "/"+Path;
}


const download = async (req, res) => {
var file = path.join(".", "./") + '/public/'+req.params.Path;
console.log(file);
var filename = path.basename(file);
var mimetype = mime.lookup(file);

res.setHeader('Content-disposition', 'attachment; filename=' + filename);
res.setHeader('Content-type', mimetype);

var filestream = fs.createReadStream(file);
filestream.pipe(res);
}
const GetEmployeeReport = async (req, res) => {
	console.log(req.params);
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
		 LEFT JOIN [dbo].[EmployeeBankAccount] empbank ON emp.Id = empbank.EmployeeId
		 INNER JOIN [dbo].[Company]  ON [dbo].[Company].Id=emp.CompanyId
		 LEFT JOIN [dbo].[Bank] ON [dbo].[Bank].Id=empbank.[BankId] WHERE [dbo].[Company].Id=`+req.params.Id+``;
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					console.log(err)
				}
				else {
					var response = { data: profileset.recordset };
					/**********************************************/
					var workbook = new excel.Workbook();
					var worksheet = workbook.addWorksheet('Employee Report');
					
					var style = workbook.createStyle({
						font: {
							color: '#000000',
							size: 14
						},
						fill:{
							type: 'pattern',
							bgColor: '#ABABAB',
							fgColor: '#ABABAB'
						},
						alignment: { 
							shrinkToFit: true, 
							wrapText: true
						}
						
					});
					
					var datetime = Date.now();
					var Path='public/'+datetime+'.xlsx';
				
			
					worksheet.column(1).setWidth(30);
					worksheet.column(2).setWidth(30);
					worksheet.column(3).setWidth(30);
					worksheet.column(4).setWidth(30);
					worksheet.column(5).setWidth(30);
					worksheet.column(6).setWidth(30);
					worksheet.column(7).setWidth(30);
					worksheet.column(8).setWidth(30);
					worksheet.column(9).setWidth(30);
					worksheet.column(10).setWidth(30);
					worksheet.column(11).setWidth(30);
					worksheet.column(12).setWidth(30);
					worksheet.column(13).setWidth(30);
					worksheet.column(14).setWidth(30);
					worksheet.column(15).setWidth(30);
					worksheet.column(16).setWidth(30);
					worksheet.column(17).setWidth(30);
					worksheet.column(18).setWidth(30);
					worksheet.column(19).setWidth(30);
					worksheet.column(20).setWidth(30);

					worksheet.cell(1,1).string('Employee Code').style(style);
					worksheet.cell(1,2).string('CNIC').style(style);
					worksheet.cell(1,3).string('First Name').style(style);
					worksheet.cell(1,4).string('Last Name').style(style);
					worksheet.cell(1,5).string('DOB').style(style);
					worksheet.cell(1,6).string('Hire Date').style(style);
					worksheet.cell(1,7).string('Contact').style(style);
					worksheet.cell(1,8).string('Gender').style(style);
					worksheet.cell(1,9).string('Salary').style(style);
					worksheet.cell(1,10).string('Email').style(style);
					worksheet.cell(1,11).string('IBAN').style(style);
					worksheet.cell(1,12).string('Company Name').style(style);
					console.log(response.data);
					for(var i=0;i<response.data.length;i++){
						worksheet.cell(i+2,1).string(response.data[i].EmployeeCode).style(style);
						worksheet.cell(i+2,2).string(response.data[i].Cnic).style(style);
						worksheet.cell(i+2,3).string(response.data[i].FirstName).style(style);
						worksheet.cell(i+2,4).string(response.data[i].LastName).style(style);
						worksheet.cell(i+2,5).string(response.data[i].DOB).style(style);
						worksheet.cell(i+2,6).string(response.data[i].HireDate).style(style);
						worksheet.cell(i+2,7).string(response.data[i].Contact).style(style);
						worksheet.cell(i+2,8).string(response.data[i].Gender).style(style);
						worksheet.cell(i+2,9).string(response.data[i].Salary==null || ""?'':response.data[i].Salary.toString()).style(style);
						worksheet.cell(i+2,10).string(response.data[i].Email).style(style);
						worksheet.cell(i+2,11).string(response.data[i].IBAN).style(style);
						worksheet.cell(i+2,12).string(response.data[i].CompanyName).style(style);
					}
					workbook.write(Path);
					/***********************************/
					 res.send({data:response,Path:datetime+'.xlsx'});
			
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
					res.status(500)
					res.send(message.error)
					return "error";
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
					res.status(500)
		res.send(message.error)
		return "error";
				}
				else {
					var response = profileset.recordset;
					/******************************************/ 
					var workbook = new excel.Workbook();
					var worksheet = workbook.addWorksheet('Employee Report');
					
					var style = workbook.createStyle({
						font: {
							color: '#000000',
							size: 14
						},
						fill:{
							type: 'pattern',
							bgColor: '#ABABAB',
							fgColor: '#ABABAB'
						},
						alignment: { 
							shrinkToFit: true, 
							wrapText: true
						}
						
					});
					
					var datetime = Date.now();
					var Path='public/'+datetime+'.xlsx';
				
			
					worksheet.column(1).setWidth(30);
					worksheet.column(2).setWidth(30);
					worksheet.column(3).setWidth(30);
					worksheet.column(4).setWidth(30);
					worksheet.column(5).setWidth(30);
					worksheet.column(6).setWidth(30);
					worksheet.column(7).setWidth(30);
					worksheet.column(8).setWidth(30);
					worksheet.column(9).setWidth(30);
					worksheet.column(10).setWidth(30);
					worksheet.column(11).setWidth(30);
					worksheet.column(12).setWidth(30);
					worksheet.column(13).setWidth(30);
					worksheet.column(14).setWidth(30);
					worksheet.column(15).setWidth(30);
					worksheet.column(16).setWidth(30);
					worksheet.column(17).setWidth(30);
					worksheet.column(18).setWidth(30);
					worksheet.column(19).setWidth(30);
					worksheet.column(20).setWidth(30);

					worksheet.cell(1,1).string('Company').style(style);
					worksheet.cell(1,2).string('PayCycle').style(style);
					worksheet.cell(1,3).string('Group Name').style(style);
					worksheet.cell(1,4).string('Current Month').style(style);
					worksheet.cell(1,5).string('Last Month').style(style);
					worksheet.cell(1,6).string('Varrience').style(style);
					worksheet.cell(1,7).string('%').style(style);
					for(var i=0;i<response.data.length;i++){
						worksheet.cell(i+2,1).string(response.data[i].company).style(style);
						worksheet.cell(i+2,2).string(response.data[i].GroupName).style(style);
						worksheet.cell(i+2,3).string(response.data[i].FirstName).style(style);
						worksheet.cell(i+2,4).string(response.data[i].CURRENTMONTH).style(style);
						worksheet.cell(i+2,5).string(response.data[i].LASTMONTH).style(style);
						worksheet.cell(i+2,6).string(response.data[i].Varrience).style(style);
						worksheet.cell(i+2,7).string(response.data[i].CURRENTMONTH=="0" && response.data[i].LASTMONTH=="0"?"0":response.data[i].LASTMONTH=="0"?'100':response.data[i].CURRENTMONTH=="0"?"-100": (response.data[i].Varrience/response.data[i].LASTMONTH)*100).style(style);
					}
					workbook.write(Path);

					/*****************************************/

					res.send({response,Path:datetime+'.xlsx'});
					return;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}


const  GetGTNReport = async (req, res) => {
	try {
		const pool = await poolPromise
		const result = await pool.request()
			.input("CompanyId", sql.VarChar(MAX), req.body.CompanyId)
			.input("Date", sql.Date, req.body.Date)
			.execute("[dbo].[GTNReport]").then( function (data) {
				var response=data.recordset;
					/*************************************/
					var workbook = new excel.Workbook();
					var worksheet = workbook.addWorksheet('G2N Report');
					
					var style = workbook.createStyle({
						font: {
							color: '#000000',
							size: 14
						},
						fill:{
							type: 'pattern',
							bgColor: '#ABABAB',
							fgColor: '#ABABAB'
						},
						alignment: { 
							shrinkToFit: true, 
							wrapText: true
						}
						
					});
					
					var datetime = Date.now();
					var Path='public/'+datetime+'.xlsx';
				
					worksheet.cell(8,1).string('');
				
					var Objects=Object.keys(response[0]);
					for(var x=5;x<Objects.length;x++){
						worksheet.cell(9,x-4).string(Objects[x]).style(style);
					}
					worksheet.column(1).setWidth(30);
					worksheet.column(2).setWidth(30);
					worksheet.column(3).setWidth(30);
					worksheet.column(4).setWidth(30);
					worksheet.column(5).setWidth(30);
					worksheet.column(6).setWidth(30);
					worksheet.column(7).setWidth(30);
					worksheet.column(8).setWidth(30);
					worksheet.column(9).setWidth(30);
					worksheet.column(10).setWidth(30);
					worksheet.column(11).setWidth(30);
					worksheet.column(12).setWidth(30);
					worksheet.column(13).setWidth(30);
					worksheet.column(14).setWidth(30);
					worksheet.column(15).setWidth(30);
					worksheet.column(16).setWidth(30);
					worksheet.column(17).setWidth(30);
					worksheet.column(18).setWidth(30);
					worksheet.column(19).setWidth(30);
					worksheet.column(20).setWidth(30);
					for(var i=0;i<response.length;i++){
						worksheet.cell(i,x-4).string(response[i][Objects[x]].toString()).style(style);
					}
					workbook.write(Path);
					/***********************************/
					 res.send({data:data,Path:datetime+'.xlsx'});
			})
	} catch (err) {
		res.status(400).json({ message: err.message })
		res.send(err.message)
		// return "error";
	}
}
module.exports = { GetEmployeeReport, GetEmployeePayrollReport, GetEmployeeVarrianceReport ,getIndvVarriancereport,GetGTNReport,download};