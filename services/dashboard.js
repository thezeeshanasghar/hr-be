
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');
const widget11 =require('../models/Dashboard-Widget11');
const widget1 =require('../models/Dashboard-Widget1');

const getCompanies = async (req, res) => {
	try {
		console.log(res);
		var query = "select Id, Code, CompanyName, Contact, Email from [dbo].[Company];";
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					console.log(err)
				}
				else {
					var response = profileset.recordset;
					res.send(widget11(response));
					return ;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}
const getTotalCompanies = async (req, res) => {
	try {
		console.log(res);
		var query = "select count(*) as Companies from [dbo].[Company];";
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					console.log(err)
				}
				else {
					var response = profileset.recordset;
					res.send(widget1(response));
					return ;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}

const getTotalUseres = async (req, res) => {
	try {
		console.log(res);
		var query = "select count(*) as  users from  [dbo].[Users];";
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					console.log(err)
				}
				else {
					var response = profileset.recordset;
					res.send(widget1(response));
					return ;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}
module.exports = { getCompanies,getTotalCompanies,getTotalUseres};