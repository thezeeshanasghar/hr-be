
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const GetAllGLAccount = async (req, res) => {
	try {
		var query = "select * from  GLAccount ;";
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					res.status(500)
		res.send(message.error)
		return "error";
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

const GetGLAccountByCompany = async (req, res) => {
	try {
		
		var query = "select * from  GLAccount where CompanyId = '"+req.params.CompanyId+"' ;";
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
					return ;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}
const GetGLAccountById = async (req, res) => {
	
	try {
		var query = "select * from GLAccount where Id='"+req.params.Id+"' ;";
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
					return ;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}

const InsertGLAccount = async (req, res) => {
	try {
		console.log(res);
		var query = "Insert into GLAccount(Account, Description, CompanyId) values('"+req.body.Account+"','"+req.body.Description+"','"+req.body.CompanyId+"');";
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
					return ;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}
const UpdateGLAccount = async (req, res) => {
	try {
		
		var query = "update  GLAccount set Account = '"+req.body.Account+"',Description = '"+req.body.Description+"',CompanyId = '"+req.body.CompanyId+"' where Id = '"+req.params.Id+"' ;";
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
					return ;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}
const DeleteGLAccount = async (req, res) => {
	try {
		console.log(res);
		var query = "delete from GLAccount where Id in ("+req.params.Id+") ;";
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
					return ;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}

module.exports = { GetAllGLAccount,GetGLAccountByCompany,GetGLAccountById,
					InsertGLAccount,UpdateGLAccount,DeleteGLAccount};