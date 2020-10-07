
	const { message } = require('../constant/variables');
	const { poolPromise } = require('../config/db');

	const GetEmployeeTermination = async (req, res) => {
		try {
			var query = `
			select company.[CompanyName],emp.[FirstName],termination.* from [myuser].[EmployeeTermination] termination
			inner join 
			[dbo].[Employees]  emp on emp.Id = termination.EmployeeId
			inner join
			[dbo].[Company] company on company.Id=termination.CompanyId
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


	const getEmployeeTerminationById = async (req, res) => {
		
		try {
			var query = "select * from   [myuser].[EmployeeTermination]  where Id='"+req.params.Id+"' ;";
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

	const InsertEmployeeTermination = async (req, res) => {
		try {
			var query = `
			
			insert into [myuser].[EmployeeTermination]
			(CompanyId, EmployeeId, LastWorkingDate, TerminationReason)
			values
			('`+req.body.company+`','`+req.body.employee+`','`+req.body.lastDate+`','`+req.body.reason+`');
			`
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
	const UpdateEmployeeTermination = async (req, res) => {
		try {
			console.log(res);
			var query = "update  [myuser].[EmployeeTermination] set LastWorkingDate='"+req.body.lastDate+"' ,  TerminationReason='"+ req.body.reason +"' where Id ='"+ req.params.Id +"' ";
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
	const DeleteEmployeeTermination = async (req, res) => {
		try {
			console.log(res);
			var query = "delete from   [myuser].[EmployeeTermination]  where Id='"+req.params.Id+"' ;";
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

	module.exports = { GetEmployeeTermination,getEmployeeTerminationById,InsertEmployeeTermination,
		UpdateEmployeeTermination,DeleteEmployeeTermination};