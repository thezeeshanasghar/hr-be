
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');


const GetLookupsById = async (req, res) => {
	
	try {
		var query = "select Id , Name from [myuser].[LookupItems] where LookupID ='"+req.params.Id+"' ;";
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



module.exports = { GetLookupsById};