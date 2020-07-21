
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const GetAllCompanies = async (req, res) => {
	try {
		var query = "select * from  Company ;";
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

const GetCompanyById = async (req, res) => {
	try {
		var query = "select * from Company where Id='"+req.params.Id+"' ;";
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

const InsertCompany = async (req, res) => {
	try {
		console.log(res);
		var query = "Insert into Company(Code, CompanyName, Address, Contact, CompanyAccount, Email, Country) values('"+req.body.Code+"','"+req.body.CompanyName+"','"+req.body.Address+"','"+req.body.Contact+"','"+req.body.CompanyAccount+"','"+req.body.Email+"','"+req.body.Country+"');";
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
const UpdateCompany = async (req, res) => {
	try {
		console.log(res);
		var query = "update  Company set Code = '"+req.body.Code+"',CompanyName = '"+req.body.CompanyName+"',Address = '"+req.body.Address+"',Contact = '"+req.body.Contact+"',CompanyAccount = '"+req.body.CompanyAccount+"',Email = '"+req.body.Email+"',Country = '"+req.body.Country+"' where Id = '"+req.params.Id+"' ;";
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
const DeleteCompany = async (req, res) => {
	try {
		console.log(res);
		var query = "delete from Company where Id = '"+req.params.Id+"' ;";
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

module.exports = { GetAllCompanies,GetCompanyById,InsertCompany,UpdateCompany,DeleteCompany};