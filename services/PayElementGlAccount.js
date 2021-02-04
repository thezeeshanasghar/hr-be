
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const GetAllPayElementGlAccount = async (req, res) => {
	try {
		var query = "select * from  PayElementGlAccount ;";
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

const GetPayElementGlAccountById = async (req, res) => {
	
	try {
		var query = "select * from PayElementGlAccount where Id='"+req.params.Id+"' ;";
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

const InsertPayElementGlAccount = async (req, res) => {
	try {
		console.log(res);
		var query = "Insert into PayElementGlAccount(PayElementId, GLAccountId, CostCenterPosting, CostCenterId, PostingPerEmployee,FinStaffCategory)"
		+" values('"+req.body.PayElementId+"','"+req.body.GLAccountId+"','"+req.body.CostCenterPosting+"','"+req.body.CostCenterId+"','"+req.body.PostingPerEmployee+"','"+req.body.FinStaffCategory+"');";
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
const UpdatePayElementGlAccount = async (req, res) => {
	try {
		
		var query = "update  PayElementGlAccount set PayElementId = '"+req.body.PayElementId+"',GLAccountId = '"+req.body.GLAccountId+"',CostCenterPosting = '"+req.body.CostCenterPosting+"',CostCenterId = '"+req.body.CostCenterId+"',PostingPerEmployee = '"+req.body.PostingPerEmployee+"' , FinStaffCategory = '"+req.body.FinStaffCategory+"' where Id = '"+req.params.Id+"' ;";
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
const DeletePayElementGlAccount= async (req, res) => {
	try {
		console.log(res);
		var query = "delete from PayElementGlAccount where Id in ("+req.params.Id+") ;";
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

module.exports = { GetAllPayElementGlAccount,GetPayElementGlAccountById,
					InsertPayElementGlAccount,UpdatePayElementGlAccount,DeletePayElementGlAccount};