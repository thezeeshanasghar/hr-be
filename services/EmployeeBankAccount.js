
	const { message } = require('../constant/variables');
	const { poolPromise } = require('../config/db');

	const GeEmployeesBankAccount = async (req, res) => {
		try {
			var query = "select * from  EmployeeBankAccount ;";
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
	const GeEmployeesBankAccountByEmployee = async (req, res) => {
		try {
			var query = "select * from  EmployeeBankAccount where EmployeeId = '"+req.params.EmployeeId+"' ;";
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


	const GetEmployeeBankAccountById = async (req, res) => {
		
		try {
			var query = "select * from EmployeeBankAccount where Id='"+req.params.Id+"' ;";
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

	const InsertEmployeeBankAccount = async (req, res) => {
		try {
			var query = "Insert into EmployeeBankAccount(CompanyId, EmployeeId, BankId, IBAN, CurrencyCode, EffectiveDate, IsPrimary)"
						+" values('"+req.body.CompanyId+"','"+req.body.EmployeeId+"','"+req.body.BankId+"','"+req.body.IBAN+"','"+req.body.CurrencyCode+"','"+req.body.EffectiveDate+"','"+req.body.IsPrimary+"');";
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
	const UpdateEmployeeBankAccount = async (req, res) => {
		try {
			console.log(res);
			var query = "update  EmployeeBankAccount set CompanyId = '"+req.body.CompanyId+"',EmployeeId = '"+req.body.EmployeeId+"',BankId = '"+req.body.BankId+"',IBAN = '"+req.body.IBAN+"',CurrencyCode = '"+req.body.CurrencyCode+"',EffectiveDate = '"+req.body.EffectiveDate+"',IsPrimary = '"+req.body.IsPrimary+"' where Id = '"+req.params.Id+"' ;";
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
	const DeleteEmployeeBankAccount = async (req, res) => {
		try {
			console.log(res);
			var query = "delete from EmployeeBankAccount where Id='"+req.params.Id+"' ;";
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

	module.exports = { GeEmployeesBankAccount,GeEmployeesBankAccountByEmployee,GetEmployeeBankAccountById,
		InsertEmployeeBankAccount,UpdateEmployeeBankAccount,DeleteEmployeeBankAccount};