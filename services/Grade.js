
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const GetAllGrades = async (req, res) => {
	try {
		var query = `select [dbo].[Grade].*,[dbo].[Company].CompanyName as Company from [dbo].[Grade] inner join
		[dbo].[Company] on [dbo].[Company].Id = CompanyId ;`;
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

const GetGradeByCompany = async (req, res) => {
	try {

		var query = "select * from  Grade where CompanyId = '" + req.params.CompanyId + "' ;";
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
const GetGradeById = async (req, res) => {

	try {
		var query = "select * from Grade where Id='" + req.params.Id + "' ;";
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

const InsertGrade = async (req, res) => {
	try {
		console.log(res);
		var query = "Insert into Grade(Code, Description, CompanyId) values('" + req.body.Code + "','" + req.body.Description + "','" + req.body.CompanyId + "');";
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
const UpdateGrade = async (req, res) => {
	try {

		var query = "update  Grade set Code = '" + req.body.Code + "',Description = '" + req.body.Description + "',CompanyId = '" + req.body.CompanyId + "' where Id = '" + req.params.Id + "' ;";
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
const DeleteGrade = async (req, res) => {
	try {
		console.log(req.params.Id);
		var query = "delete from Grade where Id in (" + req.params.Id + ") ;";
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
	GetAllGrades, GetGradeByCompany, GetGradeById,
	InsertGrade, UpdateGrade, DeleteGrade
};