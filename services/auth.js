
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');
const generateToken =require("../helpers/jwtToken");
const userlogin = async (req, res) => {
	try {
		var query = "select * from users where userName='" + req.params.userName + "' and password='" + req.params.userPassword + "' ;";
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					console.log(err)
				}
				else {
					var send_data = profileset.recordset;
					if (send_data.length > 0) {
						var response=generateToken(send_data);
						res.send(response);

						return;
					}
					res.send(message.Autherror)
					return "error";
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}

const getAllusers = async (req, res) => {
	try {
		var query = "select * from users ;";
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
module.exports = { userlogin,getAllusers };