
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const GetAllCountryLaw = async (req, res) => {
	try {
		var query = "select * from  CountryLaws ;";
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

const GetCountryLawById = async (req, res) => {
	try {
		var query = "select * from CountryLaws where Id='"+req.params.Id+"' ;";
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

const InsertCountryLaw= async (req, res) => {
	try {
		console.log(res);
		var query = "Insert into CountryLaws( Detail, CountryCode, Currency, StartDate, AdultAge, CalculationMode) values('"+req.body.Detail+"','"+req.body.CountryCode+"','"+req.body.Currency+"',getdate(),'"+req.body.AdultAge+"','"+req.body.CalculationMode+"' );";
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
const UpdateCountryLaw = async (req, res) => {
	try {
		console.log(res);
		var query = "update  CountryLaws set Detail = '"+req.body.Detail+"', CountryCode = '"+req.body.CountryCode+"', Currency = '"+req.body.Currency+"', AdultAge = '"+req.body.AdultAge+"', CalculationMode='"+req.body.CalculationMode+"' where Id = '"+req.params.Id+"'  ;";
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
const DeleteCountryLaw = async (req, res) => {
	try {
		console.log(res);
		var query = "delete from CountryLaws where Id='"+req.params.Id+"' ;";
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
module.exports = { GetAllCountryLaw,GetCountryLawById,InsertCountryLaw,UpdateCountryLaw,DeleteCountryLaw};