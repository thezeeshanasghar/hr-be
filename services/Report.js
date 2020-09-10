
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const GetEmployeeReport = async (req, res) => {
	try {
		var query = `
		SELECT 
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
		(SELECT SUM(value) FROM [myuser].[EmployeePayRoll] WHERE EmployeeId=emp.Id) AS Salary,
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
					var response = {data:profileset.recordset};
					res.send(response);
					return ;
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
					var response = {data:profileset.recordset};
					res.send(response);
					return ;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}
const GetEmployeeVarrianceReport = async (req, res) => {
	try {
		var query = `
		select * from (
			select 	ROW_NUMBER()  OVER (Partition BY emp.Id
            ORDER BY emp.Id DESC ) AS RANK, EmployeeCode,FirstName,format(HireDate,'dd/MM/yyyy') as HireDate,payelement.Code,paydetail.Paid,format(paydetail.DatefPayment,'dd/MM/yyyy') as DateofPayment from [dbo].[Employees] emp inner join
		[myuser].[EmployeePayRoll] payroll on emp.Id=payroll.EmployeeId inner join
		[dbo].[PayElement] payelement on payelement.Id=payroll.PayelementId inner join
		[myuser].[PaymentDetail] paydetail on paydetail.EmployeePayRollId =  payroll.Id
		) rs 
		where RANK<3`;
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					console.log(err)
				}
				else {
					var response = {data:profileset.recordset};
					res.send(response);
					return ;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}
module.exports = { GetEmployeeReport,GetEmployeePayrollReport,GetEmployeeVarrianceReport};