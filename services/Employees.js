
const { message } = require('../constant/variables');
const {sql, poolPromise } = require('../config/db');
// const { sql } = require('mssql');

const GetEmployees = async (req, res) => {
	try {
		var query = "select * from  Employees ;";
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
const GetEmployeesByCompany = async (req, res) => {
	try {
		var query = "select * from  Employees where CompanyId = '"+req.params.CompanyId+"' ;";
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

const GetEmployeePayRoll = async (req, res) => {
	
	try {
		var query = "select Id, PayelementId, value, Currency,FORMAT (StartDate, 'yyyy-MM-dd') as StartDate  ,  FORMAT (EndDate, 'yyyy-MM-dd') as EndDate , EmployeeId from [myuser].[EmployeePayRoll] where [EmployeeId]='"+req.params.EmployeeId+"' ;";
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
const getEmployeeApplcableLaws = async (req, res) => {
	
	try {
		var query = "select * from [dbo].[Applicable_laws] where [EmployeeId]='"+req.params.EmployeeId+"' ;";
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

const GetEmployeeById = async (req, res) => {
	
	try {
		var query = "select * from Employees where Id='"+req.params.Id+"' ;";
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

const InsertEmployee = async (req, res) => {
	try {  
		const pool = await poolPromise  
		const result = await pool.request()
		.input("Title", sql.BIGINT,req.body.Title)  
		.input("Address", sql.VarChar(300),req.body.Address)  
		.input("BankId", sql.BIGINT,req.body.BankId)  
		.input("Cnic", sql.VarChar(500),req.body.Cnic)  
		.input("CompanyId", sql.BIGINT,req.body.CompanyId)
		.input("Contact", sql.VarChar(300),req.body.Contact) 
		.input("ContractEndDate", sql.VarChar(20),req.body.ContractEndDate)  
		.input("ContractType", sql.BIGINT,req.body.ContractType)  
		.input("Country", sql.BIGINT,req.body.Country)  
		.input("CurrencyCode", sql.BIGINT,req.body.CurrencyCode)  
		.input("CurrentEmployeeStatus", sql.BIGINT,req.body.CurrentEmployeeStatus)  
		.input("DOB", sql.VarChar(20),req.body.DOB) 
		.input("EffectiveDate", sql.VarChar(20),req.body.EffectiveDate)  
		.input("Email", sql.VarChar(300),req.body.Email)
		.input("EmployeeCode", sql.VarChar(500),req.body.EmployeeCode)   
		.input("FirstName", sql.VarChar(500),req.body.FirstName)  
		.input("Gender", sql.BIGINT,req.body.Gender) 
		.input("GradeId", sql.BIGINT,req.body.GradeId)  
		.input("HireDate", sql.VarChar(20),req.body.HireDate)  
		.input("HiringReason", sql.VarChar(500),req.body.HiringReason) 
		.input("IBAN", sql.BIGINT,req.body.IBAN)  
		.input("InsuranceId", sql.VarChar(500),req.body.InsuranceId)  
		.input("IsPrimary", sql.BIGINT,req.body.IsPrimary)  
		.input("LastName", sql.VarChar(500),req.body.LastName)  
		.input("MaritalStatus", sql.BIGINT,req.body.MaritalStatus)  
		.input("PartTimePercentage", sql.Decimal(18,2),req.body.PartTimePercentage)  
		.input("PartTimeSituation", sql.BIGINT,req.body.PartTimeSituation)  
		.input("Paymethod", sql.BIGINT,req.body.Paymethod) 
		.input("PositionId", sql.BIGINT,req.body.PositionId) 
		.input("PayRollDetail", sql.NVARCHAR(4000),req.body.PayRollDetail)
		.input("TaxationId", sql.BIGINT,req.body.TaxationId)  
		.input("ServiceStartDate", sql.VarChar(20),req.body.ServiceStartDate)  
		.input("ProbationEndDate", sql.VarChar(20),req.body.ProbationEndDate)
		.input("SalaryStatus", sql.BIGINT,req.body.SalaryStatus)  
		.input("ApplicableLaws", sql.NVarChar(4000),req.body.ApplicableLaws)  
		.execute("[dbo].[InsertEmployee]").then(function (recordSet) { 
		 res.status(200).json({ status: "Success" })  ;
		//  return ;
		})  
		} catch (err) {  
		res.status(400).json({ message:err.message})  
		res.send(err.message)  
		// return "error";
		} 
}
const UpdateEmployee = async (req, res) => {
	try {  
		const pool = await poolPromise  
		const result = await pool.request()
		.input("Id", sql.BIGINT,req.body.Id)  
		.input("Title", sql.BIGINT,req.body.Title)  
		.input("Address", sql.VarChar(300),req.body.Address)  
		.input("BankId", sql.BIGINT,req.body.BankId)  
		.input("Cnic", sql.VarChar(500),req.body.Cnic)  
		.input("CompanyId", sql.BIGINT,req.body.CompanyId)
		.input("Contact", sql.VarChar(300),req.body.Contact) 
		.input("ContractEndDate", sql.VarChar(20),req.body.ContractEndDate)  
		.input("ContractType", sql.BIGINT,req.body.ContractType)  
		.input("Country", sql.BIGINT,req.body.Country)  
		.input("CurrencyCode", sql.BIGINT,req.body.CurrencyCode)  
		.input("CurrentEmployeeStatus", sql.BIGINT,req.body.CurrentEmployeeStatus)  
		.input("DOB", sql.VarChar(20),req.body.DOB) 
		.input("EffectiveDate", sql.VarChar(20),req.body.EffectiveDate)  
		.input("Email", sql.VarChar(300),req.body.Email)
		.input("EmployeeCode", sql.VarChar(500),req.body.EmployeeCode)   
		.input("FirstName", sql.VarChar(500),req.body.FirstName)  
		.input("Gender", sql.BIGINT,req.body.Gender) 
		.input("GradeId", sql.BIGINT,req.body.GradeId)  
		.input("HireDate", sql.VarChar(20),req.body.HireDate)  
		.input("HiringReason", sql.VarChar(500),req.body.HiringReason) 
		.input("IBAN", sql.BIGINT,req.body.IBAN)  
		.input("InsuranceId", sql.VarChar(500),req.body.InsuranceId)  
		.input("IsPrimary", sql.BIGINT,req.body.IsPrimary)  
		.input("LastName", sql.VarChar(500),req.body.LastName)  
		.input("MaritalStatus", sql.BIGINT,req.body.MaritalStatus)  
		.input("PartTimePercentage", sql.Decimal(18,2),req.body.PartTimePercentage)  
		.input("PartTimeSituation", sql.BIGINT,req.body.PartTimeSituation)  
		.input("Paymethod", sql.BIGINT,req.body.Paymethod) 
		.input("PositionId", sql.BIGINT,req.body.PositionId) 
		.input("PayRollDetail", sql.NVARCHAR(4000),req.body.PayRollDetail)
		.input("TaxationId", sql.BIGINT,req.body.TaxationId)  
		.input("ServiceStartDate", sql.VarChar(20),req.body.ServiceStartDate)  
		.input("ProbationEndDate", sql.VarChar(20),req.body.ProbationEndDate)
		.input("SalaryStatus", sql.BIGINT,req.body.SalaryStatus)  
		.input("ApplicableLaws", sql.NVarChar(4000),req.body.ApplicableLaws)  
		.execute("[dbo].[UpdateEmployee]").then(function (recordSet) { 
		 res.status(200).json({ status: "Success" })  ;
		//  return ;
		})  
		} catch (err) {  
		res.status(400).json({ message:err.message})  
		res.send(err.message)  
		// return "error";
		} 
}
const DeleteEmployee = async (req, res) => {
	try {
		console.log(res);
		var query =" delete from [dbo].[Employees] where Id='"+req.params.Id+"' ;"
		 
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

module.exports = { getEmployeeApplcableLaws,GetEmployees,GetEmployeesByCompany,GetEmployeeById,
	InsertEmployee,UpdateEmployee,DeleteEmployee,GetEmployeePayRoll};