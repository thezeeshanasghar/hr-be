
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');


const GetAllCompanies = async (req, res) => {
	try {
		var query = "select * from  Company ;";
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

const GetCompanyById = async (req, res) => {
	try {
		var query =	`select
					company.Id , company.Code, company.CompanyName, company.Address, 
					company.Contact, company.Email, company.StartDate, company.RegistrationNo, company.TaxationNo,
					company.SocialSecurityNo, company.EOBINo, company.CountryCode,
					acc.BankId, acc.CompanyId, acc.CurrencyId, acc.Createddate, acc.AccNo,
					company.PayrollFormula,company.EmployeeDeduction,company.CompanyDeduction
		 			from [dbo].[Company] company inner join
					[dbo].[CompanyBankAccounts] acc on acc.CompanyId = company.Id where company.Id='`+req.params.Id+`' ;`	;
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

const InsertCompany = async (req, res) => {
	
	try {                                      
		var query = `insert into [dbo].[Company] (Code, CompanyName, Address, Contact, Email, CountryCode, StartDate, RegistrationNo, TaxationNo, SocialSecurityNo, EOBINo,PayrollFormula,CompanyDeduction,EmployeeDeduction) values('`+req.body.Code+`','`+req.body.CompanyName+`','`+req.body.Address+`','`+req.body.Contact+`','`+req.body.Email+`','`+req.body.CountryCode+`',getdate(),'`+req.body.RegistrationNo+`','`+req.body.TaxationNo+`','`+req.body.SocialSecurityNo+`','`+req.body.EOBINo+`','`+req.body.payrollformula+`','`+req.body.companyPercentage+`','`+req.body.employeePercentage+`' );
					Declare @Id int=0;
					set @Id =@@identity;
					insert into [dbo].[CompanyBankAccounts]
					( BankId, CompanyId, CurrencyId, Createddate, AccNo)
					values ('`+req.body.Bank+`',@Id,'`+req.body.Currency+`',getdate(),'`+req.body.AccountNo+`')`;
					console.log(query);
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
const UpdateCompany = async (req, res) => {
	try {
		console.log(res);
		var query = `update  Company set Code = '`+req.body.Code+`',CompanyName = '`+req.body.CompanyName+`',Address = '`+req.body.Address+`',Contact = '`+req.body.Contact+`',Email = '`+req.body.Email+`',CountryCode = '`+req.body.CountryCode+`' ,  RegistrationNo = '`+req.body.RegistrationNo+`' , TaxationNo = '`+req.body.TaxationNo+`' , SocialSecurityNo = '`+req.body.SocialSecurityNo +`' , EOBINo = '`+req.body.EOBINo +`',PayrollFormula='`+req.body.payrollformula+`',CompanyDeduction='`+req.body.companyPercentage+`',EmployeeDeduction='`+req.body.employeePercentage+`' where Id = '`+req.params.Id+`' ;
						update [dbo].[CompanyBankAccounts] set BankId='`+req.body.Bank+`'  ,CurrencyId='`+req.body.Currency+`' , AccNo='`+req.body.AccountNo+`'  where  CompanyId ='`+req.params.Id+`'  `;
		console.log(query);
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
const DeleteCompany = async (req, res) => {
	try {
		console.log(res);
		var query = `delete from Company where Id in (`+req.params.Id+`) ;
					 delete from [dbo].[CompanyBankAccounts] where [CompanyId] in (`+req.params.Id+`) `;
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

const GetSelectiveComponies = async (req, res) => {
	try {
		var query = "select Id as value , CompanyName as label from  Company ;";
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
module.exports = { GetAllCompanies,GetCompanyById,InsertCompany,UpdateCompany,DeleteCompany,GetSelectiveComponies};