
const { message } = require('../constant/variables');
const {sql, poolPromise } = require('../config/db');
var exceltojson = require("xlsx-to-json-lc");
const { MAX } = require('mssql');



const GeneratePayroll = async (req, res) => {
console.log(req.body)
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
			.input("PayMonth", sql.VarChar(300),req.body.PayMonth)  
			.input("CompanyId", sql.VarChar(300),req.body.CompanyId)  
			.input("EmployeesIds", sql.VarChar(MAX),req.body.EmployeesIdsf)  
			.input("SalaryType", sql.VarChar(500),req.body.SalaryType) 
			.input("OffDateFrom", sql.VarChar(500),req.body.dateFrom) 
			.input("OffdateTo", sql.VarChar(500),req.body.dateTo) 
			.input("PayElement", sql.VarChar(MAX),req.body.PayElement) 
		
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
		select payroll.[Id], payroll.[EmployeeId], [payables], [taxdeduction], [leavededuct], [paid], payroll.[CompanyId], format([Paidon],'dd/MM/yyyy')  as [Paidon], [PayRollType],emp.FirstName from [myuser].[SalaryPayRoll] payroll inner join
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

const reversePayroll=async (req,res)=>{
	try {
		var query = `
		delete from [myuser].[SalaryPayRoll] where Paidon ='`+req.body.Date+`' and CompanyId='`+req.body.Company+`'`;

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
module.exports = { GeneratePayroll,GetPayRollSlip,reversePayroll};