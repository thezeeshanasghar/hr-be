
const { message } = require('../constant/variables');
const {sql, poolPromise } = require('../config/db');
var exceltojson = require("xlsx-to-json-lc");



const GeneratePayroll = async (req, res) => {

	if(req.body.SalaryType=="Bonus"){

		
		exceltojson({
			input: req.body.File,
			output: "output.json",
			lowerCaseHeaders: true
		}, async function (err, result) {
			if (err) {
				res.status(400).json({ message:err.message})  
				res.send(err.message)  
			} else {
				console.log(result)
				var rows="";
				for(var i=0;i<result.length;i++)
				{
					rows +=result[i].entitlement+'_'+result[i].employee+'&'+result[i].payelement+'$'+result[i].effectivedate+'@'+result[i].amount+'*'+result[i].currency+'|;'
				}

				
		try {  
			console.log(req.body.CompanyId)
			console.log(rows)
			const pool = await  poolPromise  
			const result = await pool.request()
	
			.input("Company", sql.BigInt,req.body.CompanyId)  
			.input("Detail", sql.Text,rows)  
		
			.execute("[dbo].[GenerateSalarySlipBonus]").then(function (recordSet) { 
			 res.status(200).json({ status: "Success" })  ;
			//  return ;
			})  
			} catch (err) {  
			res.status(400).json({ message:err.message})  
			res.send(err.message)  
			// return "error";
			}
			}
		});
	}else{


		try {  
			const pool = await  poolPromise  
			const result = await pool.request()
			.input("PayMonth", sql.VarChar(300),req.body.Title)  
			.input("CompanyId", sql.VarChar(300),req.body.Address)  
			.input("EmployeesIds", sql.BIGINT,req.body.BankId)  
			.input("SalaryType", sql.VarChar(500),req.body.Cnic) 
			.input("OffDateFrom", sql.VarChar(500),req.body.dateFrom) 
			.input("OffdateTo", sql.VarChar(500),req.body.dateTo) 
		
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

	
}
const exceltojsonConvert=async(Path) =>{
	exceltojson({
		input: req.body.File,
		output: "output.json",
		lowerCaseHeaders: true
	}, async function (err, result) {
		if (err) {
			res.status(400).json({ message:err.message})  
			res.send(err.message)  
		} else {
			console.log(result)
			var rows="";
			for(var i=0;i<result.length;i++)
			{
				rows +=result[i].entitlement+'_'+result[i].employee+'&'+result[i].payelement+'$'+result[i].effectivedate+'@'+result[i].amount+'*'+result[i].currency+'|;'
			}

			return rows;
		}
	});
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