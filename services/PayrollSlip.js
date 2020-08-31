
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


module.exports = { GeneratePayroll};