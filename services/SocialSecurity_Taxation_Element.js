
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const GetAllSocialSecurity_Taxation_Element = async (req, res) => {
	try {
		var query = "select * from  SocialSecurity_Taxation_Element ;";
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

const GetSocialSecurity_Taxation_ElementByCompany = async (req, res) => {
	try {
		
		var query = "select * from  SocialSecurity_Taxation_Element where CompanyId = '"+req.params.Id+"' ;";
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
const GetSocialSecurity_Taxation_ElementById = async (req, res) => {
	
	try {
		var query = "select * from SocialSecurity_Taxation_Element where Id='"+req.params.Id+"' ;";
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

const InsertSocialSecurity_Taxation_Element = async (req, res) => {
	try {
		console.log(res);
		var query = "Insert into SocialSecurity_Taxation_Element(CompanyId, LawId, Code, Type) values('"+req.body.CompanyId+"','"+req.body.LawId+"','"+req.body.Code+"','"+req.body.Type+"');";
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
const UpdateSocialSecurity_Taxation_Element = async (req, res) => {
	try {
		
		var query = "update  SocialSecurity_Taxation_Element set CompanyId = '"+req.body.CompanyId+"',LawId = '"+req.body.LawId+"',Code = '"+req.body.Code+"',Type = '"+req.body.Type+"' where Id = '"+req.params.Id+"' ;";
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
const DeleteSocialSecurity_Taxation_Element= async (req, res) => {
	try {
		console.log(res);
		var query = "delete from SocialSecurity_Taxation_Element where Id='"+req.params.Id+"' ;";
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

module.exports = { GetAllSocialSecurity_Taxation_Element,GetSocialSecurity_Taxation_ElementByCompany,GetSocialSecurity_Taxation_ElementById,
					InsertSocialSecurity_Taxation_Element,UpdateSocialSecurity_Taxation_Element,DeleteSocialSecurity_Taxation_Element};