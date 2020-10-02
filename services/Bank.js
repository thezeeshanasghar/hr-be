
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const GetAllBanks = async (req, res) => {
	try {
		var query = "select * from  Bank ;";
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					console.log(err)
				}
				else {
					var response ={data : profileset.recordset};
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

const GetBankById = async (req, res) => {
	try {
		var query = "select * from Bank where Id='"+req.params.Id+"' ;";
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

const InsertBank = async (req, res) => {
	try {
		console.log(res);
		var query = "insert into [dbo].[Bank](BankName, Address, BranchCode, Code, SwiftCode, UAEFTSBANKCode, RouteCode, Description) values('"+req.body.BankName+"','"+req.body.Address+"','"+req.body.BranchCode+"','"+req.body.Code+"','"+req.body.SwiftCode+"','"+req.body.UAEFTSBANKCode+"','"+req.body.RouteCode+"','"+req.body.Description+"');";
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
const UpdateBank = async (req, res) => {
	try {
		console.log(res);
		var query = "Update Bank set BankName = '"+req.body.BankName+"', Address = '"+req.body.Address+"',BranchCode='"+req.body.BranchCode+"' , Code ='"+req.body.Code+"', SwiftCode ='"+req.body.SwiftCode+"', UAEFTSBANKCode ='"+req.body.UAEFTSBANKCode+"', RouteCode ='"+req.body.RouteCode+"' where Id='"+req.params.Id+"' ;";
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
const DeleteBank = async (req, res) => {
	try {
		console.log(res);
		var query = "delete from Bank where Id in ("+req.params.Id +") ;";
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

module.exports = { GetAllBanks,GetBankById,InsertBank,UpdateBank,DeleteBank};