
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const gettaxableElements = async (req, res) => {
	try {
		var query = "select * from  taxable_elements ;";
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

const gettaxablelawsbyCompany = async (req, res) => {
	try {
		
		var query = "select * from  taxable_elements where CompanyId = '"+req.params.Id+"' ;";
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
const getTaxableElementById = async (req, res) => {
	
	try {
		var query = "select * from taxable_elements where Id='"+req.params.Id+"' ;";
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

const InsertTaxableElement = async (req, res) => {
	try {
		console.log(res);
        var query = `Insert into taxable_elements([Lawid], [PayElement], [CompanyId])
         values('`+req.body.CompanyId+`','`+req.body.Lawid+`','`+req.body.PayElement+`','`+req.body.CompanyId+`');`;
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
const updateTaxableElements = async (req, res) => {
	try {
		
		var query = "update  taxable_elements set CompanyId = '"+req.body.CompanyId+"',Lawid = '"+req.body.Lawid+"',PayElement = '"+req.body.PayElement+"' where Id = '"+req.params.Id+"' ;";
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
const deleteTaxableElements= async (req, res) => {
	try {
		console.log(res);
		var query = "delete from taxable_elements where Id='"+req.params.Id+"' ;";
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

module.exports = {deleteTaxableElements,updateTaxableElements,InsertTaxableElement,getTaxableElementById,gettaxablelawsbyCompany,gettaxableElements};