
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const GetAllCurrencyExchange = async (req, res) => {
	try {
		var query = `select
		(select Name from [myuser].[LookupItems] where Id=CurrencyExchange.Currency) as CurrencyName  ,
		(select Name from [myuser].[LookupItems] where Id=CurrencyExchange.ToCurrency) as ToCurrencyName ,
		Id, Currency, Rate, ToCurrency,format(EffectiveDate,'dd/MM/yyyy') as EffectiveDate from  CurrencyExchange;`;
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

const GetCurrencyExchangeByCurrency = async (req, res) => {
	try {
		
		var query = "select * from  CurrencyExchange where Currency = '"+req.params.Currency+"' and ToCurrency = '"+req.params.ToCurrency+"' ;";
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
const GetCurrencyExchangeById = async (req, res) => {
	
	try {
		var query = "select * from CurrencyExchange where Id='"+req.params.Id+"' ;";
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

const InsertCurrencyExchange = async (req, res) => {
	try {
		console.log(res);
		var query = "Insert into CurrencyExchange(Currency, Rate, ToCurrency, EffectiveDate) values('"+req.body.Currency+"','"+req.body.Rate+"','"+req.body.ToCurrency+"','"+req.body.EffectiveDate+"');";
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
const UpdateCurrencyExchage = async (req, res) => {
	try {
		console.log(res);
		var query = "update  CurrencyExchange set Currency = '"+req.body.Currency+"',Rate = '"+req.body.Rate+"',ToCurrency = '"+req.body.ToCurrency+"',EffectiveDate = '"+req.body.EffectiveDate+"' where Id = '"+req.params.Id+"' ;";
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
const DeleteCurrencyExchange = async (req, res) => {
	try {
		console.log(res);
		var query = "delete from CurrencyExchange where Id in ("+req.params.Id+") ;";
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

module.exports = { GetAllCurrencyExchange,GetCurrencyExchangeByCurrency,GetCurrencyExchangeById,
				   InsertCurrencyExchange,UpdateCurrencyExchage,DeleteCurrencyExchange};