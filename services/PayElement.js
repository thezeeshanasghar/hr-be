
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const GetAllPayElement = async (req, res) => {
	try {
		var query = "select * from  PayElement ;";
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

const GetPayElementByCompany = async (req, res) => {
	try {
		
		var query = "select * from  PayElement where CompanyId = '"+req.params.Id+"' ;";
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
const GetPayElementById = async (req, res) => {
	
	try {
		var query = "select * from PayElement where Id='"+req.params.Id+"' ;";
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

const InsertPayElement = async (req, res) => {
	try {
		console.log(res);
		var query = "Insert into PayElement(Code, Description, GroupId, Increment, Periodicity, CurrencyCode, lumpsum, noofDays, ofMonth, CompanyId)"
		+" values('"+req.body.Code+"','"+req.body.Description+"','"+req.body.GroupId+"','"+req.body.Increment+"','"+req.body.Periodicity+"','"+req.body.CurrencyCode+"','"+req.body.lumpsum+"','"+req.body.noofDays+"','"+req.body.ofMonth+"','"+req.body.CompanyId+"');";
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
const UpdatePayElement = async (req, res) => {
	try {
		
		var query = "update  PayElement set Code = '"+req.body.Code+"',Description = '"+req.body.Description+"',GroupId = '"+req.body.GroupId+"',Increment = '"+req.body.Increment+"',Periodicity = '"+req.body.Periodicity+"',CurrencyCode = '"+req.body.CurrencyCode+"',lumpsum = '"+req.body.lumpsum+"',noofDays = '"+req.body.noofDays+"',ofMonth = '"+req.body.ofMonth+"',CompanyId = '"+req.body.CompanyId+"' where Id = '"+req.params.Id+"' ;";
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
const DeletePayElement= async (req, res) => {
	try {
		console.log(res);
		var query = "delete from PayElement where Id='"+req.params.Id+"' ;";
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

module.exports = { GetAllPayElement,GetPayElementByCompany,GetPayElementById,
					InsertPayElement,UpdatePayElement,DeletePayElement};