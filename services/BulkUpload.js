var exceltojson = require("xlsx-to-json-lc");
const { message } = require('../constant/variables');
var fs = require('fs');
var multer = require('multer');
var path = require("path");

const { poolPromise } = require('../config/db');
const { type } = require("os");
const BulkUpload = async (req, res) => {
	try {
		// var response = xlsxConvert();
		exceltojson({
			input: req.body.Path,
			output: "output.json",
			// sheet: "Sheet1",  // specific sheetname inside excel file (if you have multiple sheets)
			lowerCaseHeaders: true
		}, function (err, result) {
			if (err) {
				return err;
			} else {
				SaveRecord(result, req.body.Type);
			}
			res.send(result.length.toString());
			res.status(200);
			return;
		});
		return;
	} catch (err) {
		res.status(500)
		res.send(err)
		return;
	}
}

const fileUpload = async (req, res) => {
	var date = Date.now();
	var FilePath = "";
	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'public')
		},
		filename: function (req, file, cb) {
			FilePath = date + '-' + file.originalname;
			cb(null, date + '-' + file.originalname)
		}
	})
	var upload = multer({ storage: storage }).single('file')
	upload(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err)
		} else if (err) {
			return res.status(500).json(err)
		}
		return res.status(200).send(path.resolve('./public/' + FilePath))

	})
}

const SaveRecord = async (result, Type) => {

	//Send To DB
	var query = "";

	var obj = result;
	console.log(obj)
	for (var i = 0; i < obj.length; i++) {

		switch (Type) {
			case 'Bank':
				query = `
							declare @Count int = 0;
							   select @Count=COUNT(*) from [dbo].[Bank] where [BranchCode] = '`+ obj[i].branchcode + `'
							   if(@Count = 0)
							   begin
									   INSERT INTO [dbo].[Bank]
									   (BankName, Address, BranchCode)
									   VALUES
									   ('`+ obj[i].bankname + `','` + obj[i].address + `','` + obj[i].branchcode + `');
							   end
							   else
							   begin 
									   UPDATE  [dbo].[Bank]
									   SET
									   BankName = '`+ obj[i].bankname + `',
									   Address = '`+ obj[i].address + `'
									   WHERE
									   BranchCode = '`+ obj[i].branchcode + `';
									   
		   
							   end
							   `;
				break;
			case 'Company':
				query = `
				declare @Count int = 0 , @COUNTRYCODE BIGINT = 0
				SELECT @Count=COUNT(*) FROM [dbo].[Company] WHERE [Code]='`+ obj[i].code + `';
				IF @COUNT=0
				BEGIN
				
					SELECT @COUNTRYCODE=Id FROM [myuser].[LookupItems] WHERE Name='`+ obj[i].countrycode + `';
					IF NOT @COUNTRYCODE = 0
					BEGIN
					INSERT INTO [dbo].[Company]
					( Code, CompanyName, Address, Contact, Email, CountryCode)
					VALUES
					('`+ obj[i].code + `','` + obj[i].companyname + `','` + obj[i].address + `','` + obj[i].contact + `','` + obj[i].email + `',@COUNTRYCODE);
					END
				END
				ELSE
				BEGIN
					UPDATE [dbo].[Company]
					SET
					CompanyName='`+ obj[i].companyname + `',
					Address='`+ obj[i].address + `',
					Contact='`+ obj[i].contact + `',
					Email='`+ obj[i].email + `'
					WHERE 
					Code='`+ obj[i].code + `'
				END
				
					`
				break;
			case 'Exchange':
				query = `
				declare @Fromcurrency int = 0 ,@ToCurrency int = 0,@Count int = 0 ; 
				select @Fromcurrency=Id from [myuser].[LookupItems] where Name = '`+obj[i].currency+`';
				select @ToCurrency=Id from [myuser].[LookupItems] where Name = '`+obj[i].tocurrency+`';
				select @Count=Count(*) from [dbo].[CurrencyExchange] where [Currency]=@Fromcurrency and [ToCurrency]=@ToCurrency and [EffectiveDate]='`+obj[i].effectivedate+`';

				if( Not @Fromcurrency  = 0 AND Not @ToCurrency  = 0  AND @Count= 0 )
				insert [dbo].[CurrencyExchange]
				(Currency, Rate, ToCurrency, EffectiveDate)
				values
				(@Fromcurrency,'`+obj[i].rate+`',@ToCurrency,'`+obj[i].effectivedate+`')
				else
				update [dbo].[CurrencyExchange]
				set
				Rate='`+obj[i].rate+`'
				WHERE
 				[Currency]=@Fromcurrency and [ToCurrency]=@ToCurrency and [EffectiveDate]='`+obj[i].effectivedate+`';


				`
				break;
				case 'CountryLaw':
				query=`
				Declare @Count INT =0,@CountryCode bigint = 0 , @Currency bigint = 0,@CalculationMode bigint = 0 ,@Type bigint = 0   ;
				SELECT @Count=COUNT(*) FROM [dbo].[CountryLaws] WHERE Detail='`+ obj[i].detail+`'
				select @CountryCode=Id from [myuser].[LookupItems] where Name ='`+ obj[i].countrycode+`'
				select @Currency=Id from [myuser].[LookupItems] where Name ='`+ obj[i].currency+`'
				select @CalculationMode=Id from [myuser].[LookupItems] where Name ='`+ obj[i].calculationmode+`'
				select @Type=Id from [myuser].[LookupItems] where Name ='`+ obj[i].type+`'
				iF ( NOT @CountryCode  = 0 AND NOT @CountryCode  = 0 AND NOT @CalculationMode  = 0 AND NOT @Type  = 0)
				BEGIN
				IF(@Count=0)
				BEGIN
				INSERT INTO [dbo].[CountryLaws] (Detail, CountryCode, Currency, StartDate, AdultAge, CalculationMode, MaxSalary, MinSalary, Percentage, Type)
				VALUES
				('`+obj[i].detail+`',@CountryCode,@Currency,'`+obj[i].startdate+`','`+obj[i].adultage+`',@CalculationMode,'`+obj[i].maxsalary+`','`+obj[i].minsalary+`','`+obj[i].percentage+`',@Type);
				END
				ELSE
				BEGIN
				UPDATE [dbo].[CountryLaws]
				SET
				CountryCode=@CountryCode, Currency=@Currency, StartDate='`+obj[i].startdate+`',
				CalculationMode=@CalculationMode, AdultAge='`+obj[i].adultage+`',
				MaxSalary='`+obj[i].maxsalary+`',MinSalary='`+obj[i].minsalary+`', Percentage='', Type=@Type
				WHERE
				Detail='`+obj[i].detail+`'
				END
				END
				`
				break;	
			case 'Grade':
				query=`
				declare @Count int =0,@CompanyId bigint = 0 ;
				select @Count=COUNT(*) from [dbo].[Grade] where Code ='`+obj[i].code+`';
				select @CompanyId=Id from [dbo].[Company] where Code ='`+obj[i].companycode+`';
				if(not @CompanyId = 0)
				begin
				IF(@Count=0)	
				BEGIN
				INSERT INTO [dbo].[Grade] 
				(Code, Description, CompanyId)
				values
				('`+obj[i].code+`','`+obj[i].description+`',@CompanyId)
				END
				else
				begin
				update [dbo].[Grade] 
				set
				Description='`+obj[i].description+`'
				where
				Code='`+obj[i].code+`'	
				end
				end
				`
				break	
				case 'Unit':
					query=`
					declare @Count int =0,@CompanyId bigint = 0 ;
					select @Count=COUNT(*) from [dbo].[Unit] where Code ='`+obj[i].code+`';
					select @CompanyId=Id from [dbo].[Company] where Code ='`+obj[i].companycode+`';
					if(not @CompanyId = 0)
					begin
					IF(@Count=0)	
					BEGIN
					INSERT INTO [dbo].[Unit] 
					(Code, Name, CompanyId)
					values
					('`+obj[i].code+`','`+obj[i].name+`',@CompanyId)
					END
					else
					begin
					update [dbo].[Unit]
					set
					Name='`+obj[i].name+`'
					where
					Code='`+obj[i].code+`'	
					end
					end
					`
					break	
			default:

				break;

		}
		console.log(query);
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					return err; //res.status(500).json(err)
				}
				else {
					var response = profileset.recordset;

				}

			});
	}
}
module.exports = { BulkUpload, fileUpload };
