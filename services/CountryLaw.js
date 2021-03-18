
const { message } = require('../constant/variables');
const { poolPromise } = require('../config/db');
const { json } = require('body-parser');
const CountryLaw = require('./../models/CountryLaw');
const GetAllCountryLaw = async (req, res) => {
	try {
		var query = "select Id, Detail, CountryCode, Currency, format(StartDate,'dd/MM/yyyy') as StartDate , format(EndDate,'dd/MM/yyyy') as EndDate, AdultAge, CalculationMode, MaxSalary, MinSalary, Percentage, Type from  CountryLaws ;";
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					console.log(err)
				}
				else {
					var response = { data: profileset.recordset };
					res.send(response);
					return;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}

const GetCountryLawByCountry = async (req, res) => {
	try {
		var query = "select law.* from [dbo].[CountryLaws] law inner join [dbo].[Company] company on company.CountryCode=law.CountryCode where company.Id='" + req.params.CompanyId + "'";
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					console.log(err)
				}
				else {
					var response = { data: profileset.recordset };
					res.send(response);
					return;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}

const GetCountryLawById = async (req, res) => {
	try {
		var query = `select * from CountryLaws where Id='` + req.params.Id + `' ;
					select ROW_NUMBER() OVER(ORDER BY Id) AS id,maxSalary,minSalary,Discount,TaxAmount,Percentage  from LawRanges where LawId='`+req.params.Id+`' `;
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					res.status(500)
		res.send(message.error)
		return "error";
				}
				else {
					
					var response = CountryLaw(profileset.recordsets);
					res.send(response);
					return;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}

const InsertCountryLaw = async (req, res) => {
	try {

		console.log(req.body);
		var query = `Insert into CountryLaws( Detail, CountryCode, Currency, AdultAge, CalculationMode, Type, NoCarryForward, lumpsum, PaidWithin, DeclarationMode,StartDate,EndDate) 
		values('`+ req.body.Detail + `','` + req.body.CountryCode + `','` + req.body.Currency + `','` + req.body.AdultAge + `','` + req.body.CalculationMode + `','` + req.body.Type + `','` + req.body.NoCarryForward + `','` + req.body.Lumpsum + `','` + req.body.PaidWithIn + `','` + req.body.DeclarationMode + `','` + req.body.StartDate + `','` + req.body.EndDate + `' );
		
		Declare @Id BIGINT=0;
		set @Id=@@identity;

		Insert into LawRanges(MaxSalary,MinSalary,Discount,Percentage,LawId,TaxAmount)
		select maxSalary,minSalary,Discount,Percentage,@Id,TaxAmount from OPENJSON('`+ req.body.Ranges + `') with(minSalary money,maxSalary money,Discount int,Percentage INT,TaxAmount money);


		`;
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
					return;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}
const UpdateCountryLaw = async (req, res) => {
	try {
		console.log(res);
		var query = `update  CountryLaws set StartDate = '` + req.body.StartDate + `'
		,EndDate = '` + req.body.EndDate + `',Detail = '` + req.body.Detail + `',
		 CountryCode = '` + req.body.CountryCode + `', Currency = '` + req.body.Currency + `',
		  AdultAge = '` + req.body.AdultAge + `', CalculationMode='` + req.body.CalculationMode + `' ,
		 Type = '` + req.body.Type + `' ,
			 NoCarryForward = '` + req.body.NoCarryForward + `', lumpsum = '` + req.body.Lumpsum + `', PaidWithin = '` + req.body.PaidWithIn + `',
		 DeclarationMode = '` + req.body.DeclarationMode + `'  where Id = '` + req.params.Id + `'  ;
		 
		 delete from LawRanges where LawId ='`+req.params.Id+`'
		 
		 Insert into LawRanges(MaxSalary,MinSalary,Discount,Percentage,LawId,TaxAmount)
		 select maxSalary,minSalary,Discount,Percentage,'`+req.params.Id+`',TaxAmount from OPENJSON('`+ req.body.Ranges + `') with(minSalary money,maxSalary money,Discount int,Percentage INT,TaxAmount money);
  `;
		 console.log(query)
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
					return;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}
const DeleteCountryLaw = async (req, res) => {
	try {
		console.log(res);
		var query = "delete from CountryLaws where Id in (" + req.params.Id + ") ;";
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					console.log(err)
				}
				else {
					var response = profileset.recordset;
					res.send(response);
					return;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}
module.exports = { GetAllCountryLaw, GetCountryLawById, InsertCountryLaw, UpdateCountryLaw, DeleteCountryLaw, GetCountryLawByCountry };