
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const GetAllApplicableLaws = async (req, res) => {
	try {
		var query = `select * from [dbo].[Applicable_laws];`;
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					res.status(500)
					res.send(message.error)
					return "error";
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

const GetApplicableLawsByCompany = async (req, res) => {
	try {

		var query = "select * from  [dbo].[Applicable_laws] where CompanyId = '" + req.params.CompanyId + "' ;";
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					res.status(500)
					res.send(message.error)
					return "error";
				}
				else {
					var response = profileset.recordset;
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
const GetApplicableById = async (req, res) => {

	try {
		var query = "select * from [dbo].[Applicable_laws] where Id='" + req.params.Id + "' ;";
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					res.status(500)
					res.send(message.error)
					return "error";
				}
				else {
					var response = profileset.recordset;
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

const InsertApplicableLaw = async (req, res) => {
	try {
		console.log(res);
        var query = `Insert into [dbo].[Applicable_laws](LawId, CompanyId, DeductionType, FixedAmount, CompanyCut, EmployeeCut, PayElements) 
        values('` + req.body.LawId + `','` + req.body.CompanyId + `','` + req.body.DeductionType + `','` + req.body.FixedAmount + `','` + req.body.CompanyCut + `','` + req.body.EmployeeCut + `','` + req.body.PayElements + `');`;
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					res.status(500)
					res.send(message.error)
					return "error";
				}
				else {
					var response = profileset.recordset;
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
const UpdateApplicableLaw = async (req, res) => {
	try {

		var query = "update  [dbo].[Applicable_laws] set LawId = '" + req.body.LawId + "',DeductionType = '" + req.body.DeductionType + "',CompanyId = '" + req.body.CompanyId + "',FixedAmount = '" + req.body.FixedAmount + "',CompanyCut = '" + req.body.CompanyCut + "',EmployeeCut = '" + req.body.EmployeeCut + "'PayElements = '" + req.body.PayElements + "' where Id = '" + req.params.Id + "' ;";
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					res.status(500)
					res.send(message.error)
					return "error";
				}
				else {
					var response = profileset.recordset;
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
const DeleteApplicableLaw = async (req, res) => {
	try {
		console.log(req.params.Id);
		var query = "delete from [dbo].[Applicable_laws] where Id in (" + req.params.Id + ") ;";
		console.log(query);
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					res.status(500)
					res.send(message.error)
					return "error";
				}
				else {
					var response = profileset.recordset;
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

module.exports = {
	GetAllApplicableLaws, GetApplicableLawsByCompany, GetApplicableById,
	InsertApplicableLaw, UpdateApplicableLaw, DeleteApplicableLaw
};