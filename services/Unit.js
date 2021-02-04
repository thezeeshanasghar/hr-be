
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const GetAllUnit = async (req, res) => {
	try {
		var query = "select * from  Unit ;";
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

const GetUnitByCompany = async (req, res) => {
	try {

		var query = "select * from  Unit where CompanyId = '" + req.params.CompanyId + "' ;";
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
const GetUnitById = async (req, res) => {

	try {
		var query = "select * from Unit where Id='" + req.params.Id + "' ;";
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

const InsertUnit = async (req, res) => {
	try {
		console.log(res);
		var query = "Insert into Unit(CompanyId, Code,Name) values('" + req.body.CompanyId + "','" + req.body.Code + "','" + req.body.Name + "');";
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
const UpdateUnit = async (req, res) => {
	try {

		var query = "update  Unit set CompanyId = '" + req.body.CompanyId + "',Code = '" + req.body.Code + "',Name = '" + req.body.Name + "'  where Id = '" + req.params.Id + "' ;";
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
const DeleteUnit = async (req, res) => {
	try {
		console.log(res);
		var query = "delete from Unit where Id in (" + req.params.Id + ") ;";
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
	GetAllUnit, GetUnitByCompany, GetUnitById,
	InsertUnit, UpdateUnit, DeleteUnit
};