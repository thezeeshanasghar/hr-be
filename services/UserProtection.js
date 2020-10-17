
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const GetAllUserProtection = async (req, res) => {
	try {
		var query = `
		select protection.Id,LabourId,CompanyName,(select Name from [myuser].[LookupItems] where Id =protection.Country ) as Country from WagesProtection protection inner join
		[dbo].[Company] company on company.Id = protection.CompanyId
		`;
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

const GetUserProtectionByCompany = async (req, res) => {
	try {
		
		var query = "select * from  WagesProtection where CompanyId = '"+req.params.Id+"' ;";
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
const GetUserProtectionById = async (req, res) => {
	
	try {
		var query = "select * from WagesProtection where Id='"+req.params.Id+"' ;";
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

const InsertUserProtection = async (req, res) => {
	try {
		console.log(res);
		var query = "Insert into WagesProtection(CompanyId,LabourId, Country) values('"+req.body.CompanyId+"','"+req.body.LabourId+"','"+req.body.Country+"');";
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
const UpdateUserProtection = async (req, res) => {
	try {
		
		var query = "update  WagesProtection set CompanyId = '"+req.body.CompanyId+"',LabourId = '"+req.body.LabourId+"' , Country='"+req.body.Country+"' where Id = '"+req.params.Id+"' ;";
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
const DeleteUserProtection= async (req, res) => {
	try {
		console.log(res);
		var query = "delete from WagesProtection where Id in ("+req.params.Id+") ;";
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

module.exports = { GetAllUserProtection,GetUserProtectionByCompany,GetUserProtectionById,
					InsertUserProtection,UpdateUserProtection,DeleteUserProtection};