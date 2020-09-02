
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const GetAllCostCenter = async (req, res) => {
	try {
		var query = "select * from  CostCenter ;";
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

const GetCostCenterByCompany = async (req, res) => {
	try {
		var query = "select * from  CostCenter where CompanyId = '"+req.params.CompanyId+"' ;";
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
const GetCostCenterById = async (req, res) => {
	try {
		var query = "select * from CostCenter where Id='"+req.params.Id+"' ;";
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

const InsertCostCenter = async (req, res) => {
	try {
		console.log(res);
		var query = "Insert into CostCenter(Code, Description, CompanyId) values('"+req.body.Code+"','"+req.body.Description+"','"+req.body.CompanyId+"');";
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
const UpdateCostCenter = async (req, res) => {
	try {
		console.log(res);
		var query = "update  CostCenter set Code = '"+req.body.Code+"', Description = '"+req.body.Description+"', CompanyId = '"+req.body.CompanyId+"' where Id = '"+req.params.Id+"'  ;";
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
const DeleteCostCenter = async (req, res) => {
	try {
		console.log(res);
		var query = "delete from CostCenter where Id in ("+req.params.Id+") ;";
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

module.exports = { GetAllCostCenter,GetCostCenterByCompany,GetCostCenterById,InsertCostCenter,UpdateCostCenter,DeleteCostCenter};