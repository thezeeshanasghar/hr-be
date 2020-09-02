
const { message } = require('../constant/variables');
const {sql, poolPromise } = require('../config/db');


const GeneratePayroll = async (req, res) => {

	try {  
		const pool = await poolPromise  
		const result = await pool.request()
		.input("PayMonth", sql.VarChar(300),req.body.Title)  
		.input("CompanyId", sql.VarChar(300),req.body.Address)  
		.input("EmployeesIds", sql.BIGINT,req.body.BankId)  
		.input("SalaryType", sql.VarChar(500),req.body.Cnic) 

		.execute("[dbo].[GenerateSalarySlip]").then(function (recordSet) { 
		 res.status(200).json({ status: "Success" })  ;
		//  return ;
		})  
		} catch (err) {  
		res.status(400).json({ message:err.message})  
		res.send(err.message)  
		// return "error";
		} 
}
const GetPayRollSlip=async (req,res)=>{
	try {
		console.log(res);
		var query = `
		select payroll.*,emp.FirstName from [myuser].[SalaryPayRoll] payroll inner join
		[dbo].[Employees] emp on emp.Id=payroll.EmployeeId
		order by payroll.CompanyId`;

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


module.exports = { GeneratePayroll,GetPayRollSlip};