
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

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
		var query = "select * from  Employees where CompanyId = '"+req.body.CompanyId+"' ;";
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
		var query = "select * from Employees where Id='"+req.body.Id+"' ;";
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
		var query = "insert into Employees( CompanyId, EmployeeCode, InsuranceId, TaxationId, Cnic, Title, FirstName,"
					+"middleName, FamilyName, Gender, MaritalStatus, DOB, CountryofBirth, Email, BaseCountry, ContractType,"
					+"CurrentEmployeeStatus, HireDate, HiringReason, ServiceStartDate, ProbationEndDate, PartTimeSituation,"
					+" PartTimePercentage, ContractEndDate, UnitId, JobId, PositionId, GradeId, CurrencyCode, SalaryStatus,"
					+" Paymethod, ApplicableSocialSecurityId, ApplicableTaxationId)"
					+"values('"+req.body.CompanyId+"', '"+req.body.EmployeeCode+"', '"+req.body.InsuranceId+"', '"+req.body.TaxationId+"',"
					+"'"+req.body.Cnic+"', '"+req.body.Title+"', '"+req.body.FirstName+"', '"+req.body.middleName+"', '"+req.body.FamilyName+"',"
					+"'"+req.body.Gender+"', '"+req.body.MaritalStatus+"', '"+req.body.DOB+"', '"+req.body.CountryofBirth+"', '"+req.body.Email+"',"
					+" '"+req.body.BaseCountry+"', '"+req.body.ContractType+"', '"+req.body.CurrentEmployeeStatus+"', '"+req.body.HireDate+"',"
					+" '"+req.body.HiringReason+"', '"+req.body.ServiceStartDate+"', '"+req.body.ProbationEndDate+"', '"+req.body.PartTimeSituation+"',"
					+" '"+req.body.PartTimePercentage+"', '"+req.body.ContractEndDate+"', '"+req.body.UnitId+"', '"+req.body.JobId+"', '"+req.body.PositionId+"',"
					+" '"+req.body.GradeId+"', '"+req.body.CurrencyCode+"', '"+req.body.SalaryStatus+"', '"+req.body.Paymethod+"', '"+req.body.ApplicableSocialSecurityId+"',"
					+" '"+req.body.ApplicableTaxationId+"')";
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
const UpdateEmployee = async (req, res) => {
	try {
		var query = "update Employees set  CompanyId = '"+req.body.CompanyId+"', EmployeeCode = '"+req.body.CompanyId+"', InsuranceId = '"+req.body.CompanyId+"', TaxationId = '"+req.body.CompanyId+"', Cnic = '"+req.body.CompanyId+"', Title = '"+req.body.CompanyId+"', FirstName = '"+req.body.CompanyId+"' ,"
		+"middleName = '"+req.body.CompanyId+"' , FamilyName = '"+req.body.CompanyId+"' , Gender = '"+req.body.CompanyId+"', MaritalStatus = '"+req.body.CompanyId+"', DOB = '"+req.body.CompanyId+"', CountryofBirth = '"+req.body.CompanyId+"', Email = '"+req.body.CompanyId+"', BaseCountry = '"+req.body.CompanyId+"', ContractType = '"+req.body.CompanyId+"',"
		+"CurrentEmployeeStatus = '"+req.body.CompanyId+"', HireDate = '"+req.body.CompanyId+"', HiringReason = '"+req.body.CompanyId+"', ServiceStartDate = '"+req.body.CompanyId+"', ProbationEndDate = '"+req.body.CompanyId+"', PartTimeSituation = '"+req.body.CompanyId+"',"
		+" PartTimePercentage = '"+req.body.CompanyId+"', ContractEndDate = '"+req.body.CompanyId+"', UnitId = '"+req.body.CompanyId+"', JobId = '"+req.body.CompanyId+"', PositionId = '"+req.body.CompanyId+"', GradeId = '"+req.body.CompanyId+"', CurrencyCode = '"+req.body.CompanyId+"',SalaryStatus = '"+req.body.CompanyId+"',"
		+" Paymethod = '"+req.body.CompanyId+"', ApplicableSocialSecurityId = '"+req.body.CompanyId+"', ApplicableTaxationId = '"+req.body.CompanyId+"' where Id = '"+req.params.Id  +"'"
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
const DeleteEmployee = async (req, res) => {
	try {
		console.log(res);
		var query = "delete from Employee where Id='"+req.params.Id+"' ;";
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

module.exports = { GetEmployees,GetEmployeesByCompany,GetEmployeeById,
	InsertEmployee,UpdateEmployee,DeleteEmployee};