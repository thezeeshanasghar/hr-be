
const { message } = require('../constant/variables');
const { sql, poolPromise } = require('../config/db');
var exceltojson = require("xlsx-to-json-lc");
const { MAX } = require('mssql');



const GeneratePayroll = async (req, res) => {
	console.log("working")
	if (req.body.SalaryType == "Bonus") {


		exceltojson({
			input: req.body.File,
			output: "output.json",
			lowerCaseHeaders: true
		}, async function (err, result) {
			if (err) {
				res.status(400).json({ message: err.message })
				res.send(err.message)
			} else {
				console.log(result)
				var rows = "";
				for (var i = 0; i < result.length; i++) {
					rows += result[i].entitlement + '_' + result[i].employee + '&' + result[i].payelement + '$' + result[i].effectivedate + '@' + result[i].amount + '*' + result[i].currency + '|;'
				}


				try {
					const pool = await poolPromise
					const result = await pool.request()

						.input("Company", sql.BigInt, req.body.CompanyId)
						.input("Detail", sql.Text, rows)

						.execute("[dbo].[GenerateSalarySlipBonus]").then(function (recordSet) {
							res.status(200).json({ status: "Success" });
							//  return ;
						})
				} catch (err) {
					res.status(400).json({ message: err.message })
					res.send(err.message)
					// return "error";
				}
			}
		});
	} else {

		try {

			const pool = await poolPromise
			const result = await pool.request()
				.input("PayMonth", sql.VarChar(300), req.body.PayMonth)
				.input("CompanyId", sql.VarChar(300), req.body.CompanyId)
				.input("EmployeesIds", sql.VarChar(MAX), req.body.EmployeesIds)
				.input("SalaryType", sql.VarChar(500), req.body.SalaryType)
				.input("OffDateFrom", sql.VarChar(500), req.body.dateFrom)
				.input("OffdateTo", sql.VarChar(500), req.body.dateTo)
				.input("PayElement", sql.VarChar(MAX), req.body.PayElement)

				.execute("[dbo].[GenerateSalarySlipNew]").then(function (recordSet) {
					console.log("success")
					res.status(200).json({ status: "Executed", data: recordSet });
					return;
				})
		} catch (err) {
			console.log("error")
			res.status(400).json({ message: err.message })
			res.send(err.message)
			return "error";
		}
	}


}
const exceltojsonConvert = async (Path) => {
	exceltojson({
		input: req.body.File,
		output: "output.json",
		lowerCaseHeaders: true
	}, async function (err, result) {
		if (err) {
			res.status(400).json({ message: err.message })
			res.send(err.message)
		} else {
			console.log(result)
			var rows = "";
			for (var i = 0; i < result.length; i++) {
				rows += result[i].entitlement + '_' + result[i].employee + '&' + result[i].payelement + '$' + result[i].effectivedate + '@' + result[i].amount + '*' + result[i].currency + '|;'
			}

			return rows;
		}
	});
}
const GetPayRollSlip = async (req, res) => {
	try {
		console.log(res);
		var query = `
		select payroll.[Id], payroll.[EmployeeId], [payables], [taxdeduction], [leavededuct], [paid], payroll.[CompanyId], format([Paidon],'dd/MM/yyyy')  as [Paidon], [PayRollType],emp.FirstName , payroll.PayGroup,payroll.Status from [myuser].[SalaryPayRoll] payroll inner join
		[dbo].[Employees] emp on emp.Id=payroll.EmployeeId
		order by payroll.CompanyId`;

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

const GetPayRollSlipByCompany = async (req, res) => {
	try {
		console.log(res);
		var query = `
		select payroll.[Id], payroll.[EmployeeId], [payables], [taxdeduction],
(
	SELECT    stuff((
        select ',' + CONCAT(LAW.Detail,'#',tax.amount)
        from [myuser].[TaxationDetail] tax
		INNER JOIN 
		[dbo].[CountryLaws] LAW ON LAW.Id =tax.LawId
		INNER JOIN [dbo].[Applicable_laws] APP ON APP.LawId=tax.LawId
        where tax.GroupCode = payroll.PayGroup AND tax.EmployeeId=payroll.[EmployeeId]
        for xml path('')
    ),1,1,'')
)  as Law ,
[leavededuct], [paid], payroll.[CompanyId], format([Paidon],'dd/MM/yyyy')  as [Paidon], [PayRollType],emp.FirstName ,
payroll.PayGroup,payroll.Status from [myuser].[SalaryPayRoll] payroll inner join
[dbo].[Employees] emp on emp.Id=payroll.EmployeeId
 where payroll.[CompanyId] ='`+ req.params.CompanyId + `'
		order by payroll.CompanyId`;

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

const reversePayroll = async (req, res) => {
	try {
		console.log(req.body)
		var query =
			`
		delete from [myuser].[SalaryPayRoll] where PayGroup ='`+ req.body.GroupName + `' and CompanyId='` + req.body.Company + `'
		update [dbo].[Employeeovertime] set GroupName=NULL where GroupName ='`+ req.body.GroupName + `' and CompanyId='` + req.body.Company + `'
		`;

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
const getSpecificPayroll = async (req, res) => {
	try {
		var query = `
		select distinct PayGroup,Status,format(Paidon,'dd/MM/yyyy') as paidon from [myuser].[SalaryPayRoll] where CompanyId='`+ req.params.Company + `'`;

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
const changeStatus = async (req, res) => {
	try {
		var query = `update [myuser].[SalaryPayRoll] set [Status]='` + req.params.status + `' where [PayGroup]='` + req.params.code + `'`;

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
module.exports = { GeneratePayroll, GetPayRollSlip, reversePayroll, getSpecificPayroll, changeStatus, GetPayRollSlipByCompany };