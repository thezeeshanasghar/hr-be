
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');

const GetAllunpaidLeaves = async (req, res) => {
	try {
		var query = `select unpaidLeaves.Id, employee.FirstName,company.CompanyName,unpaidLeaves.CompanyId, unpaidLeaves.EmployeeId, format(unpaidLeaves.LeaveStartDate,'dd/MM/yyyy') as LeaveStartDate , format(unpaidLeaves.LeaveEndDate,'dd/MM/yyyy') as LeaveEndDate from  unpaidLeaves 
					 inner join [dbo].[Company] company on unpaidLeaves.CompanyId=company.Id
					 inner join [dbo].[Employees] employee on unpaidLeaves.EmployeeId=employee.Id ;`;
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					console.log(err)
				}
				else {
					var response ={data:profileset.recordset};
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

const GetunpaidLeavesByCompany = async (req, res) => {
	try {
		
		var query = "select * from  unpaidLeaves where CompanyId = '"+req.params.Id+"' ;";
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
const GetunpaidLeavesById = async (req, res) => {
	
	try {
		var query = "select * from unpaidLeaves where Id='"+req.params.Id+"' ;";
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

const InsertunpaidLeaves = async (req, res) => {
	try {
		console.log(res);
		var query = "Insert into unpaidLeaves(CompanyId, EmployeeId, LeaveStartDate, LeaveEndDate) values('"+req.body.CompanyId+"','"+req.body.EmployeeId+"','"+req.body.LeaveStartDate+"','"+req.body.LeaveEndDate+"');";
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
const UpdateunpaidLeaves = async (req, res) => {
	try {
		
		var query = "update  unpaidLeaves set CompanyId = '"+req.body.CompanyId+"',EmployeeId = '"+req.body.EmployeeId+"',LeaveStartDate = '"+req.body.LeaveStartDate+"',LeaveEndDate = '"+req.body.LeaveEndDate+"' where Id = '"+req.params.Id+"' ;";
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
const DeleteunpaidLeaves= async (req, res) => {
	try {
		console.log(res);
		var query = "delete from unpaidLeaves where Id in ("+req.params.Id+") ;";
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

module.exports = { GetAllunpaidLeaves,GetunpaidLeavesByCompany,GetunpaidLeavesById,
					InsertunpaidLeaves,UpdateunpaidLeaves,DeleteunpaidLeaves};