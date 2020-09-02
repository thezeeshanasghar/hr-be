
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
		DOB, 
		HireDate,
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
		 EffectiveDate,
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
					var response = profileset.recordset;
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


module.exports = { GetEmployeeReport};