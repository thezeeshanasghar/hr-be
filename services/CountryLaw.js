
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const GetAllCountryLaw = async (req, res) => {
	try {
		var query = "select Id, Detail, CountryCode, Currency, format(StartDate,'dd/MM/yyyy') as StartDate , format(EndDate,'dd/MM/yyyy') as EndDate, AdultAge, CalculationMode, MaxSalary, MinSalary, Percentage, Type from  CountryLaws ;";
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					console.log(err)
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
	
		console.log(req.body);
		var query = "Insert into CountryLaws( Detail, CountryCode, Currency, StartDate, AdultAge, CalculationMode,MaxSalary, MinSalary, Percentage, Type, Discount, TaxAmount, NoCarryForward, lumpsum, PaidWithin, DeclarationMode) values('"+req.body.Detail+"','"+req.body.CountryCode+"','"+req.body.Currency+"',getdate(),'"+req.body.AdultAge+"','"+req.body.CalculationMode+"','"+req.body.MaxSalary+"','"+req.body.MinSalary+"','"+req.body.Percentage+"','"+req.body.Type +"','"+req.body.Discount +"','"+req.body.TaxAmount +"','"+req.body.NoCarryForward +"','"+req.body.Lumpsum +"','"+req.body.PaidWithIn +"','"+req.body.DeclarationMode +"' );";
		console.log(query);
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
		var query = "update  CountryLaws set Detail = '"+req.body.Detail+"', CountryCode = '"+req.body.CountryCode+"', Currency = '"+req.body.Currency+"', AdultAge = '"+req.body.AdultAge+"', CalculationMode='"+req.body.CalculationMode+"' , MaxSalary='"+req.body.MaxSalary+"' , MinSalary='"+req.body.MinSalary+"' , Percentage = '"+req.body.Percentage+"' , Type = '"+req.body.Type +"' , Discount = '"+req.body.Discount +"',TaxAmount = '"+req.body.TaxAmount +"', NoCarryForward = '"+req.body.NoCarryForward +"', lumpsum = '"+req.body.Lumpsum +"', PaidWithin = '"+req.body.PaidWithIn +"', DeclarationMode = '"+req.body.DeclarationMode +"'  where Id = '"+req.params.Id+"'  ;";
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
		var query = "delete from CountryLaws where Id in ("+req.params.Id+") ;";
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