
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const GetEmployeeReport = async (req, res) => {
	try {
		var query = `	SELECT 
		EmployeeCode,
		InsuranceId,
		TaxationId,
		Cnic,
		FirstName,
		LastName,
		format(DOB,'dd/MM/yyyy') as DOB, 
		format(HireDate,'dd/MM/yyyy') as HireDate ,
		Address,
		Contact,
		(SELECT  [Name] FROM [myuser].[LookupItems] WHERE Id=Gender)AS Gender,
		(SELECT  [Name] FROM [myuser].[LookupItems] WHERE Id=MaritalStatus)AS MaritalStatus,
		(SELECT  [Name] FROM [myuser].[LookupItems] WHERE Id=Country)AS Country,
		(SELECT  [Name] FROM [myuser].[LookupItems] WHERE Id=Title)AS Title,
		 Email 
		 FROM [dbo].[Employees] emp INNER JOIN [dbo].[EmployeeBankAccount] empbank
		ON 
		emp.Id = empbank.EmployeeId`;
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