
	const { message } = require('../constant/variables');
	const { poolPromise } = require('../config/db');

	const GetEmployeeTermination = async (req, res) => {
		try {
			var query = `
			select company.[CompanyName],emp.[FirstName],termination.Id, termination.CompanyId, termination.EmployeeId, format(termination.LastWorkingDate,'dd/MM/yyyy') as LastWorkingDate, termination.TerminationReason from [myuser].[EmployeeTermination] termination
			inner join 
			[dbo].[Employees]  emp on emp.Id = termination.EmployeeId
			inner join
			[dbo].[Company] company on company.Id=termination.CompanyId
			`;
			const pool = await poolPromise
			const result = await pool.request()
				.query(query, function (err, profileset) {
					if (err) {
						res.status(500)
						res.send(message.error)
						return "error";
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

	const GetEmployeeTerminationByCompany = async (req, res) => {
		try {
			var query = `
			select company.[CompanyName],emp.[FirstName],termination.Id, termination.CompanyId, termination.EmployeeId, format(termination.LastWorkingDate,'dd/MM/yyyy') as LastWorkingDate, termination.TerminationReason from [myuser].[EmployeeTermination] termination
			inner join 
			[dbo].[Employees]  emp on emp.Id = termination.EmployeeId
			inner join
			[dbo].[Company] company on company.Id=termination.CompanyId
			where company.Id =`+req.params.CompanyId+`
			`;
			const pool = await poolPromise
			const result = await pool.request()
				.query(query, function (err, profileset) {
					if (err) {
						res.status(500)
						res.send(message.error)
						return "error";
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
						res.status(500)
						res.send(message.error)
						return "error";
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
			('`+req.body.CompanyId+`','`+req.body.EmployeeId+`','`+req.body.lastDate+`','`+req.body.reason+`');

			UPDATE [dbo].[Employees] SET CurrentEmployeeStatus=30 WHERE Id='`+req.body.EmployeeId+`';
			`
			const pool = await poolPromise
			const result = await pool.request()
				.query(query, function (err, profileset) {
					if (err) {
						res.status(500)
			res.send(message.error)
			return "error";
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
						res.status(500)
			res.send(message.error)
			return "error";
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
			var query = `
			Declare @EmployeeId BIGINT=0;
			select @EmployeeId=EmployeeId from   [myuser].[EmployeeTermination]  where Id='`+req.params.Id+`' ; 
			delete from   [myuser].[EmployeeTermination]  where Id='`+req.params.Id+`' ; 
			UPDATE [dbo].[Employees] SET CurrentEmployeeStatus=29 WHERE Id=@EmployeeId;`;
			const pool = await poolPromise
			const result = await pool.request()
				.query(query, function (err, profileset) {
					if (err) {
						res.status(500)
						res.send(message.error)
						return "error";
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
		UpdateEmployeeTermination,DeleteEmployeeTermination,GetEmployeeTerminationByCompany};