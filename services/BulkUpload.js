var exceltojson = require("xlsx-to-json-lc");
// var exceltojson= require("xls-to-json");
const { message } = require('../constant/variables');
var fs = require('fs');
var multer = require('multer');
var path = require("path");

const { poolPromise,sql } = require('../config/db');
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
				res.status(500)
				res.send(err)
				return;
			} else {
				//SaveRecord(result, req.body.Type,req.body.Company);
			}
			res.send(result);
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

// const SaveRecord = async (result, Type,Company) => {

// 	//Send To DB
// 	var query = "";

// 	var obj = result;
// 	// console.log(obj,"obj")
// 	var check=0;
// 	for (var i = 0; i < obj.length; i++) {
	
// 		if(check==1){
// 			return false;
// 		}
// 		switch (Type) {
// 			case 'Bank':
// 				if(obj[i]['bank/ branch code']!="" &&  obj[i]['bank/ branch code'] !="" && obj[i]['swift code'] != ""  && obj[i]['uaefts code']!="" &&  obj[i]['route code']!="" && obj[i]['bank/ branch description']!="" ){
// 					query = `
// 					declare @Count int = 0;
// 					   select @Count=COUNT(*) from [dbo].[Bank] where [BranchCode] = '`+ obj[i]['bank/ branch code'] + `'
// 					   if(@Count = 0)
// 					   begin
// 							   INSERT INTO [dbo].[Bank]
// 							   (BankName, Address, BranchCode, Code, SwiftCode, UAEFTSBANKCode, RouteCode, Description)
// 							   VALUES
// 							   ('`+ obj[i]['bank/ branch description'] + `','` + 'N/A' + `','` + obj[i]['bank/ branch code'] + `',
// 							   '` + obj[i]['bank/ branch code'] + `','` + obj[i]['swift code'] + `'
// 							   ,'` + obj[i]['uaefts code'] + `','` + obj[i]['route code'] + `','` + obj[i]['bank/ branch description'] + `');
// 					   end
// 					   else
// 					   begin 
// 							   UPDATE  [dbo].[Bank]
// 							   SET
// 							   BankName = '`+ obj[i]['bank/ branch description']+ `',
// 							   Address = '`+ 'N/A' + `',
// 							   SwiftCode='` + obj[i]['swift code']  + `',
// 							   UAEFTSBANKCode='` + obj[i]['uaefts code']+ `',
// 							   RouteCode='` + obj[i]['route code']  + `',
// 							   Description='` + obj[i]['bank/ branch description']  + `'
// 							   WHERE
// 							   BranchCode = '`+ obj[i]['bank/ branch code']  + `';
							   
   
// 					   end
// 					   `;
// 					//    console.log(query);
// 		break;
// 				}
		
// 			case 'Company':
// 				if(obj[i].code !="" && obj[i].bankcode!=""&& obj[i].currency!=""&& obj[i].countrycode!="" && obj[i].companyname!="" && obj[i].address !="" &&  obj[i].contact !="" &&   obj[i].registrationno!="" && obj[i].email !=""  &&  obj[i].taxationno !="" && obj[i].socialsecurityno !="" &&  obj[i].eobino !=""  ){
// query = `
// 				declare @Count int = 0 , @COUNTRYCODE BIGINT = 0 , @BankId bigint = 0 , @CompanyId bigint = 0 , @CurrencyId bigint = 0 , @CompanyId bigint = 0 ;
// 				SELECT @Count=COUNT(*) FROM [dbo].[Company] WHERE [Code]='`+ obj[i].code + `';
// 				select @BankId=Id from [dbo].[Bank]  WHERE [Code]='`+ obj[i].bankcode + `';
// 				select @CurrencyId=Id from [myuser].[LookupItems] where Name =  '`+obj[i].currency+`';
// 				IF @COUNT=0
// 				BEGIN
				
// 					SELECT @COUNTRYCODE=Id FROM [myuser].[LookupItems] WHERE Name='`+ obj[i].countrycode + `';
// 					IF NOT @COUNTRYCODE = 0
// 					BEGIN
// 					INSERT INTO [dbo].[Company]
// 					( Code, CompanyName, Address, Contact, Email, StartDate, RegistrationNo, TaxationNo, SocialSecurityNo, EOBINo, CountryCode)
// 					VALUES
// 					('`+ obj[i].code + `','` + obj[i].companyname + `','` + obj[i].address + `','` + obj[i].contact + `','` + obj[i].email + `',getdate(),'` + obj[i].registrationno + `','` + obj[i].taxationno + `','` + obj[i].socialsecurityno + `','` + obj[i].eobino + `',@COUNTRYCODE);

// 					set @CompanyId = @@identity;

// 					insert into [dbo].[CompanyBankAccounts]
// 					(BankId, CompanyId, CurrencyId, Createddate, AccNo)
// 					values
// 					(@BankId,@CompanyId,@CurrencyId,getdate(),'`+ obj[i].account + `')
// 					END
// 				END
// 				ELSE
// 				BEGIN
// 					UPDATE [dbo].[Company]
// 					SET
// 					CompanyName='`+ obj[i].companyname + `',
// 					Address='`+ obj[i].address + `',
// 					Contact='`+ obj[i].contact + `',
// 					Email='`+ obj[i].email + `',
// 					RegistrationNo ='`+ obj[i].registrationno + `', 
// 					 TaxationNo ='`+ obj[i].taxationno + `',
// 					  SocialSecurityNo ='`+ obj[i].socialsecurityno + `',
// 					   EOBINo ='`+ obj[i].eobino + `'
// 					WHERE 
// 					Code='`+ obj[i].code + `'

// 				select @CompanyId=Id from [dbo].[Company] where Code = '`+ obj[i].code +`';

// 					update [dbo].[CompanyBankAccounts]
// 					set
// 					BankId = @BankId , CurrencyId = @CurrencyId , AccNo = '`+ obj[i].account + `'
// 					where
// 					CompanyId= @CompanyId;
// 				END
				
// 					`

// 				}
				
// 				break;
// 			case 'Exchange':
// 				if(obj[i]['currency'] !="" &&  obj[i]['to currency'] !="" && obj[i]['effective date']!="" &&  obj[i].rate !=""){
// 				query = `
// 				declare @Fromcurrency int = 0 ,@ToCurrency int = 0,@Count int = 0 ; 
// 				select @Fromcurrency=Id from [myuser].[LookupItems] where Name = '`+ obj[i]['currency'] + `';
// 				select @ToCurrency=Id from [myuser].[LookupItems] where Name = '`+ obj[i]['to currency'] + `';
// 				select @Count=Count(*) from [dbo].[CurrencyExchange] where [Currency]=@Fromcurrency and [ToCurrency]=@ToCurrency and [EffectiveDate]='`+ obj[i]['effective date'] + `';

// 				if( Not @Fromcurrency  = 0 AND Not @ToCurrency  = 0  AND @Count= 0 )
// 				insert [dbo].[CurrencyExchange]
// 				(Currency, Rate, ToCurrency, EffectiveDate)
// 				values
// 				(@Fromcurrency,'`+ obj[i]['rate'] + `',@ToCurrency,'` + obj[i]['effective date']  + `')
// 				else
// 				update [dbo].[CurrencyExchange]
// 				set
// 				Rate='`+ obj[i].rate + `'
// 				WHERE
//  				[Currency]=@Fromcurrency and [ToCurrency]=@ToCurrency and [EffectiveDate]='`+ obj[i]['effective date']  + `';


// 				`	
// 				}
				
// 				break;
// 			case 'CountryLaw':

// 				query = `
// 				Declare @Count INT =0,@CountryCode bigint = 0 , @Currency bigint = 0,@CalculationMode bigint = 0 ,@Type bigint = 0 , @DeclarationMode bigint = 0   ;
// 				SELECT @Count=COUNT(*) FROM [dbo].[CountryLaws] WHERE Detail='`+ obj[i].detail + `'
// 				select @CountryCode=Id from [myuser].[LookupItems] where Name ='`+ obj[i].countrycode + `'
// 				select @Currency=Id from [myuser].[LookupItems] where Name ='`+ obj[i].currency + `'
// 				select @CalculationMode=Id from [myuser].[LookupItems] where Name ='`+ obj[i].calculationmode + `'
// 				select @Type=Id from [myuser].[LookupItems] where Name ='`+ obj[i].type + `';
// 				select @DeclarationMode = Id from [myuser].[LookupItems] where Name ='`+ obj[i].declarationmode + `';
// 				iF ( NOT @CountryCode  = 0 AND NOT @CountryCode  = 0 AND NOT @CalculationMode  = 0 AND NOT @Type  = 0)
// 				BEGIN
// 				IF(@Count=0)
// 				BEGIN
// 				INSERT INTO [dbo].[CountryLaws] (Detail, CountryCode, Currency, StartDate, AdultAge, CalculationMode, MaxSalary, MinSalary, Percentage, Type , Discount, TaxAmount, NoCarryForward, lumpsum, PaidWithin, DeclarationMode)
// 				VALUES
// 				('`+ obj[i].detail + `',@CountryCode,@Currency,'` + obj[i].startdate + `','` + obj[i].adultage + `',@CalculationMode,'` + obj[i].maxsalary + `','` + obj[i].minsalary + `','` + obj[i].percentage + `',@Type , '` + obj[i].discount + `' , '` + obj[i].taxamount + `', '`+obj[i].nocarryforward+`' ,  '` + obj[i].lumpsum + `', '` + obj[i].paidwithin + `' , @DeclarationMode );
// 				END
// 				ELSE
// 				BEGIN
// 				UPDATE [dbo].[CountryLaws]
// 				SET
// 				CountryCode=@CountryCode, Currency=@Currency, StartDate='`+ obj[i].startdate + `',
// 				CalculationMode=@CalculationMode, AdultAge='`+ obj[i].adultage + `',
// 				MaxSalary='`+ obj[i].maxsalary + `',MinSalary='` + obj[i].minsalary + `', Percentage='', Type=@Type ,
// 				Discount ='`+ obj[i].discount + `' , TaxAmount ='`+ obj[i].taxamount + `' ,  NoCarryForward ='`+ obj[i].nocarryforward + `' , lumpsum ='`+ obj[i].lumpsum + `' , PaidWithin ='`+ obj[i].paidwithin + `' , DeclarationMode ='`+ obj[i].declarationmode + `'
// 				WHERE
// 				Detail='`+ obj[i].detail + `'
// 				END
// 				END
// 				`
// 				break;
// 			case 'Grade':
// 				if(obj[i]['grade code']!="" &&  obj[i]['grade description'] !="")
// 				{
// 					console.log(obj[i]);
// 				query = `
// 				declare @Count int =0,@CompanyId bigint = 0 ;
// 				select @Count=COUNT(*) from [dbo].[Grade] where Code ='`+ obj[i]['grade code'] + `';
// 				set @CompanyId='`+Company+`';
// 				if(not @CompanyId = 0)
// 				begin
// 				IF(@Count=0)	
// 				BEGIN
// 				INSERT INTO [dbo].[Grade] 
// 				(Code, Description, CompanyId)
// 				values
// 				('`+  obj[i]['grade code']+ `','` + obj[i]['grade description'] + `',@CompanyId)
// 				END
// 				else
// 				begin
// 				update [dbo].[Grade] 
// 				set
// 				Description='`+  obj[i]['grade description'] + `'
// 				where
// 				Code='`+ obj[i]['grade code'] + `'	
// 				end
// 				end
// 				`	
// 				}
				
// 				break
// 			case 'Unit':
// 				if(obj[i]['unit code'] !="" &&  obj[i]['unit description'] !="")
// 				{
// 				query = `
// 					declare @Count int =0,@CompanyId bigint = 0 ;
// 					select @Count=COUNT(*) from [dbo].[Unit] where Code ='`+ obj[i]['unit code'] + `';
// 					set @CompanyId='`+Company+`';
// 					if(not @CompanyId = 0)
// 					begin
// 					IF(@Count=0)	
// 					BEGIN
// 					INSERT INTO [dbo].[Unit] 
// 					(Code, Name, CompanyId)
// 					values
// 					('`+ obj[i]['unit code'] + `','` + obj[i]['unit description'] + `',@CompanyId)
// 					END
// 					else
// 					begin
// 					update [dbo].[Unit]
// 					set
// 					Name='`+ obj[i]['unit description'] + `'
// 					where
// 					Code='`+ obj[i]['unit code'] + `'	
// 					end
// 					end
// 					`
// 				}
// 				break
// 			case 'Position':
// 				if(obj[i]['unit code'] !="" && obj[i]['job code'] !="" && obj[i]['position code'] !="" && obj[i]['position title'] !=""){
// 							query = `
// 						declare @Count int = 0,@UnitId bigint = 0 , @JobId bigint = 0,@CompanyId bigint = 0;
// 						select @UnitId = Id from [dbo].[Unit] where Code = '`+ obj[i]['unit code'] + `';
// 						select @JobId = Id from [dbo].[Jobs] where Code = '`+ obj[i]['job code'] + `'
// 						select @Count=Count(*) from [dbo].[Positions] where Code = '`+ obj[i]['position code'] + `';
// 						set @CompanyId='`+Company+`';
// 						if(not @UnitId = 0 and not @JobId = 0 and not @CompanyId = 0)
// 						begin

// 						if(@Count = 0)
// 						begin
// 						insert into [dbo].[Positions]
// 						(UnitId, JobId, Code, Title, CompanyId)
// 						values
// 						(@UnitId,@JobId,'`+ obj[i]['position code']  + `','` + obj[i]['position title'] + `',@CompanyId);
// 						end
// 						else
// 						begin
// 						update [dbo].[Positions]
// 						set
// 						UnitId=@UnitId,JobId=@JobId,Title='`+ obj[i]['position title'] + `'
// 						where
// 						Code='`+ obj[i]['position code'] + `'
// 						end
// 						end
// 					`
// 				}
		
// 				break;
// 			case 'Job':
// 				if(obj[i]['job code']!="" &&  obj[i]['job description'] !="")
// 				{
// 				query = `
// 						declare @Count int =0,@CompanyId bigint = 0 ;
// 						select @Count=COUNT(*) from [dbo].[Jobs] where Code ='`+ obj[i]['job code'] + `';
// 						set @CompanyId='`+Company+`';
// 						if(not @CompanyId = 0)
// 						begin
// 						IF(@Count=0)	
// 						BEGIN
// 						INSERT INTO [dbo].[Jobs]
// 						(Code, Description, CompanyId)
// 						values
// 						('`+ obj[i]['job code'] + `','` + obj[i]['job description'] + `',@CompanyId)
// 						END
// 						else
// 						begin
// 						update [dbo].[Jobs]
// 						set
// 						Description='`+ obj[i]['job description'] + `'
// 						where
// 						Code='`+ obj[i]['job code'] + `'	
// 						end
// 						end
// 						`
// 				}
// 				break
// 			case 'Employee':
// 				if(obj[i]['client employee id'] !="" && obj[i]['position code'] !=""  && 
// 				obj[i]['grade code'] !="" &&  obj[i].gender !="" && obj[i]['marital status']!="" && obj[i]['contract type']!="" &&  obj[i]['base country code'] !="" &&
// 				obj[i]['current employee status code'] !="" &&  obj[i]['part time situation'] !="" && obj[i].title !="" &&  obj[i]['social security /insurance id'] !=""
// 				&&  obj[i]['taxation id'] !=""  && obj[i]['national id'] !="" && obj[i]['first name english'] !="" && obj[i]['family name english'] !="" &&  obj[i]['birth date'] !=""
// 				&& obj[i]['hire date'] !="" && obj[i]['hiring reason'] !="" && obj[i]['continuous service date'] !="" && obj[i]['probation end date']!="" && obj[i]['part time percentage'] !="" && obj[i]['contract end date']!=""){
// 					query = `
// 					declare @Count int = 0 , @Postion bigint = 0 , @Grade bigint = 0 , @Gender int = 0 , @MaritalStatus int = 0 ,
// 					@ContactType int = 0 ,@Country int = 0 ,@EmployeeStatus int = 0 ,@PartTimeStatus int = 0 ,@Company int = 0,@Title int = 0,@CompanyId bigint = 0;

// 					select @CompanyId=Id from Company where Code='`+obj[i]['Company Code']+`'
// 					if(@CompanyId = '`+Company+`')
// 					begin
// 					select @Count=count(*) from [dbo].[Employees] where EmployeeCode='`+ obj[i]['client employee id']  + `'
// 					select @Postion = Id from [dbo].[Positions] where Code ='`+ obj[i]['position code'] + `'
// 					select @Grade = Id from [dbo].[Grade] where Code ='`+ obj[i]['grade code'] + `'
// 					select @Gender = Id from [myuser].[LookupItems] where Name='`+ obj[i].gender + `'
// 					select @MaritalStatus = Id from [myuser].[LookupItems] where Name='`+ obj[i]['marital status'] + `'
// 					select @ContactType = Id from [myuser].[LookupItems] where Name='`+ obj[i]['contract type'] + `'
// 					select @Country = Id from [myuser].[LookupItems] where Name='`+ obj[i]['base country code'] + `'
// 					select @EmployeeStatus = Id from [myuser].[LookupItems] where Name='`+ obj[i]['current employee status code'] + `'
// 					select @PartTimeStatus = Id from [myuser].[LookupItems] where Name='`+ obj[i]['part time situation'] + `'
// 					select @Title = Id from [myuser].[LookupItems] where Name='`+ obj[i].title + `'
// 					set @Company='`+Company+`';
// 					if(not @Postion = 0 and not @Grade = 0 and not @Gender = 0 and not @MaritalStatus = 0 and  not @ContactType = 0
//   					and not @Country = 0 and not @EmployeeStatus = 0 and  not @PartTimeStatus = 0 and not @Company = 0 and not @Title = 0)
//   					begin
//   					if @Count = 0
//   					begin
// 					INSERT INTO [dbo].[Employees]
// 					(CompanyId, EmployeeCode, InsuranceId, TaxationId, Cnic, FirstName,
// 					LastName, DOB, HireDate, HiringReason, ServiceStartDate, ProbationEndDate,
// 					PartTimePercentage, ContractEndDate, PositionId, GradeId, Address, Contact,
// 					Gender, MaritalStatus, ContractType, Country, CurrentEmployeeStatus, PartTimeSituation, Title, Email)
// 					values
// 					(@Company,'`+ obj[i]['client employee id'] + `','` + obj[i]['social security /insurance id'] + `','` + obj[i]['taxation id'] + `','` + obj[i]['national id'] + `','` + obj[i]['first name english'] + `','` + obj[i]['family name english'] + `','` + obj[i]['birth date'] + `',
// 					'`+ obj[i]['hire date'] + `','` + obj[i]['hiring reason'] + `','` + obj[i]['continuous service date'] + `','` + obj[i]['probation end date'] + `','` + obj[i]['part time percentage'] + `','` + obj[i]['contract end date'] + `',@Postion,@Grade,
// 					'`+ obj[i].address + `','` + obj[i].contact + `',@Gender,@MaritalStatus,@ContactType,
// 					@Country,@EmployeeStatus,@PartTimeStatus,@Title,'`+ obj[i].email + `')
//   					end
//   					else
//   					begin
//   					update [dbo].[Employees]
//  					 set
//   					InsuranceId='`+ obj[i]['social security /insurance id'] + `',
//   					TaxationId='`+ obj[i]['taxation id']  + `',
//   					Cnic='`+ obj[i]['national id']  + `',
//   					FirstName='`+ obj[i]['first name english'] + `',
// 					 LastName='`+ obj[i]['family name english'] + `',
// 					 DOB='`+ obj[i]['birth date'] + `',
// 					 HireDate='`+ obj[i]['hire date']  + `',
// 					 HiringReason='`+ obj[i]['hiring reason'] + `',
// 					 ServiceStartDate='`+ obj[i]['continuous service date'] + `',
// 					 ProbationEndDate='`+ obj[i]['probation end date'] + `',
// 					 PartTimePercentage='`+ obj[i]['part time percentage'] + `',
// 					 ContractEndDate='`+ obj[i]['contract end date'] + `',
// 					 PositionId=@Postion,GradeId=@Grade,
// 					 Address='`+ obj[i].address + `', Contact='` + obj[i].contact + `',
// 					Gender=@Gender, MaritalStatus=@MaritalStatus, ContractType=@ContactType, Country=@Country, CurrentEmployeeStatus=@EmployeeStatus,
// 					PartTimeSituation=@PartTimeStatus, Title=@Title, Email='`+ obj[i].email + `'
// 					where
// 					EmployeeCode = '`+ obj[i]['client employee id'] + `';

//  					end 
// 					  end
// 					  end
// 						`
				
// 				}
// 				break;
// 			case 'EmployeeBank':
// 				if(obj[i]['client employee id']!="" && obj[i]['bank code']!="" && obj[i]['currency code']!="" && obj[i]['iban (or bank account)'] !="" && obj[i]['effective date']!="" &&  obj[i]['primary account']!=""  ){
// 					query = `
// 				declare @Count int = 0 , @Bank bigint = 0 ,@Currency int  = 0 , @EmployeeId bigint = 0,@CompanyId bigint = 0;
// 				select @CompanyId=Id from Company where Code='`+obj[i]['Company Code']+`'
// 				if(@CompanyId='`+Company+`')
// 				begin
// 				select @EmployeeId=Id from [dbo].[Employees] where [EmployeeCode]='`+ obj[i]['client employee id'] + `';
// 				select @Bank=Id from [dbo].[Bank] where [BranchCode] ='`+ obj[i]['bank code'] + `';
// 				select @Currency=Id from [myuser].[LookupItems] where Name ='`+ obj[i]['currency code'] + `';
// 				select @Count=count(*) from [dbo].[EmployeeBankAccount] where IBAN ='`+ obj[i]['iban (or bank account)'] + `'  and EmployeeId =@EmployeeId;
// 				set @CompanyId='`+Company+`';
// 				if(not  @EmployeeId = 0 and not @Bank = 0 and not @Currency = 0 and not @CompanyId = 0)
// 				begin
// 				if(@Count = 0)
// 				begin
// 				insert into [dbo].[EmployeeBankAccount]
// 				( CompanyId, BankId, IBAN, EffectiveDate, IsPrimary, CurrencyCode, EmployeeId)
// 				values
// 				(@CompanyId,@Bank, '`+ obj[i]['iban (or bank account)'] + `','` + obj[i]['effective date'] + `','` + obj[i]['primary account'] + `',@Currency,@EmployeeId);
// 				end
// 				else 
// 				begin
// 				update  [dbo].[EmployeeBankAccount]
// 				set
// 				BankId=@Bank,
// 				EffectiveDate='`+ obj[i]['effective date'] + `',
// 				IsPrimary='`+ obj[i]['primary account'] + `',
// 				CurrencyCode=@Currency
// 				where
// 				IBAN='`+ obj[i]['iban (or bank account)'] + `' and EmployeeId=@EmployeeId
// 				end
// 				end
// 				end
// 				`
// 				}
				
// 				break;
// 			case 'EmployeePayroll':
// 				if( obj[i]['pay element code'] !="" && obj[i]['client employee id'] !="" && obj[i]['currency code']!="" && obj[i]['entitlement/deduction']!="" && obj[i]['start date']!="" && obj[i]['amount'] !="" && obj[i]['frequency']!="" && obj[i]['end date']!="")
// 				{
// 					query = `
// 				declare @PayElement bigint = 0 ,@Currency int = 0, @EmployeeId bigint = 0 ,@Count int = 0 , @CompanyId bigint = 0 , @Entitlement bigint = 0;
// 				select @CompanyId=Id from Company where Code='`+obj[i]['Company Code']+`'
// 				if(@CompanyId='`+Company+`')
// 				begin
// 				select @PayElement=Id from [dbo].[PayElement] where Code = '`+ obj[i]['pay element code'] + `';
// 				select @EmployeeId=Id from [dbo].[Employees] where [EmployeeCode]='`+ obj[i]['client employee id'] + `';
// 				select @Currency=Id from [myuser].[LookupItems] where Name ='`+ obj[i]['currency code'] + `';
// 				select @Entitlement=Id from [myuser].[LookupItems] where Name ='`+ obj[i]['entitlement/deduction'] + `';
// 				set @CompanyId='`+Company+`';
// 				select @Count=Count(*) from [myuser].[OnetimeElement] where PayelementId = @PayElement and EmployeeId =@EmployeeId
// 				if(not @PayElement = 0 and not @Currency = 0 and not @EmployeeId = 0)
// 				begin
// 				if(@Count = 0)
// 				begin
// 				insert into [myuser].[PeriodicPayElements]
// 				( [CompanyId], [EmployeeId], [PayElementId], [StartDate], [amount], [Currency], [Frequency], [Entitlement], [EndDate])
// 				values
// 				(@CompanyId,@EmployeeId, @PayElement,'` + obj[i]['start date'] + `','`+ obj[i]['amount'] + `',@Currency,'`+ obj[i]['frequency'] + `',@Entitlement,'`+ obj[i]['end date'] + `');
// 				end
// 				else 
// 				begin
// 				update [myuser].[PeriodicPayElements]
// 				set
// 				value='`+ obj[i]['amount'] + `',
// 				Currency=@Currency,
// 				StartDate='`+  obj[i]['start date']  + `',
// 				Frequency='`+  obj[i]['frequency']  + `',
// 				EndDate='`+  obj[i]['end date']   + `',
// 				Entitlement = @Entitlement
// 				where PayelementId=@PayElement and EmployeeId=@EmployeeId;
// 				end
// 				end
// 				end
// 				`
// 				}
				
// 				break;

// 				case 'EmployeePayrollOneTime':
					
// 				if(obj[i]['pay element code'] !="" && obj[i]['client employee id'] !="" && obj[i]['currency code'] !="" && obj[i]['entitlement/deduction'] !="" &&  obj[i]['effective date'] !="" &&  obj[i]['amount']!=""){
				
// 				query = `
// 				declare @PayElement bigint = 0 ,@Currency int = 0, @EmployeeId bigint = 0 ,@Count int = 0 , @CompanyId bigint = 0 , @Entitlement bigint = 0;
// 				select @CompanyId=Id from Company where Code='`+obj[i]['Company Code']+`'
// 				if(@CompanyId='`+Company+`')
// 				begin
// 				select @PayElement=Id from [dbo].[PayElement] where Code = '`+ obj[i]['pay element code'] + `';
// 				select @EmployeeId=Id from [dbo].[Employees] where [EmployeeCode]='`+ obj[i]['client employee id'] + `';
// 				select @Currency=Id from [myuser].[LookupItems] where Name ='`+ obj[i]['currency code'] + `';
// 				select @Entitlement=Id from [myuser].[LookupItems] where Name ='`+ obj[i]['entitlement/deduction'] + `';
// 				set @CompanyId='`+Company+`';
// 				select @Count=Count(*) from [myuser].[OnetimeElement] where PayelementId = @PayElement and EmployeeId =@EmployeeId
// 				if(not @PayElement = 0 and not @Currency = 0 and not @EmployeeId = 0)
// 				begin
// 				if(@Count = 0)
// 				begin
// 				insert into [myuser].[OnetimeElement]
// 				([CompanyId], [EmployeeId], [PayElementId], [EffectiveDate], [Amount], [Currency], [Entitlement])
// 				values
// 				(@CompanyId,@EmployeeId, @PayElement,'` + obj[i]['effective date'] + `','`+ obj[i]['amount'] + `',@Currency,@Entitlement);
// 				end
// 				else 
// 				begin
// 				update [myuser].[OnetimeElement]
// 				set
// 				[Amount]='`+ obj[i]['amount'] + `',
// 				Currency=@Currency,
// 				EffectiveDate='`+  obj[i]['effective date']  + `',
// 				Entitlement = @Entitlement
// 				where PayelementId=@PayElement and EmployeeId=@EmployeeId;
// 				end
// 				end
// 				end
// 				`
// 				}

// 				break;

// 			case 'ApplicableLaws':
// 				if(obj[i].law!="" && obj[i].employee!=""){
// 				query = `
// 				declare @Count int = 0,@Law bigint = 0,@Employee bigint = 0 ;
// 				select @Law =Id  from [dbo].[CountryLaws] where Detail = '`+ obj[i].law + `';
// 				select @Employee=Id from [dbo].[Employees] where [EmployeeCode]='`+ obj[i].employee + `';
// 				select @Count =COUNT(*) from [dbo].[Applicable_laws] where LawId=@Law and EmployeeId=@Employee;

// 				if(not @Employee = 0 and not @Law = 0)
// 				begin
// 				if @Count=0
// 				begin
//  				insert into [dbo].[Applicable_laws] ( LawId, EmployeeId)
//  				values
//  				(@Law,@Employee)
// 				end
// 				end
// 				`	
// 				}
				
// 				break;
// 			case 'UnpaidLeaves':
// 				if(obj[i]['client employee id']!="" && obj[i]['unpaid leave start date'] !="" && obj[i]['unpaid leave end date'] !=""  ){
// 						query = `
// 						declare @Count int = 0, @Company bigint = 0 , @EmployeeId bigint = 0;
// 						select @Company=Id from Company where Code='`+obj[i]['Company Code']+`'
// 				if(@Company='`+Company+`')
// 				begin
			
// 				set @Company='`+Company+`';
// 				select @EmployeeId=Id from [dbo].[Employees] where [EmployeeCode] = '`+ obj[i]['client employee id'] + `';
// 				select @Count=Count(*) from [dbo].[unpaidLeaves] where EmployeeId = @EmployeeId AND LeaveStartDate<='' AND LeaveEndDate>='';
// 				if(not @Company = 0 and not @EmployeeId = 0 )
// 				begin
// 				if(@Count=0)
// 				begin
// 				insert into [dbo].[unpaidLeaves]
// 				(CompanyId, EmployeeId, LeaveStartDate, LeaveEndDate)	
// 				values
// 				(@Company,@EmployeeId,'`+ obj[i]['unpaid leave start date'] + `','` + obj[i]['unpaid leave end date'] + `');
// 				end
// 				end
// 				end
// 				`
// 				}
			
// 			case 'CostCenter':
// 				if(obj[i]['cost center code']!="" && obj[i]['cost center description']!=""){
// 					query = `
// 				declare @Count int =0,@CompanyId bigint = 0 ;
// 				select @Count=COUNT(*) from [dbo].[CostCenter] where Code ='`+ obj[i]['cost center code'] + `';
// 				set @CompanyId='`+Company+`';
// 				if(not @CompanyId = 0)
// 				begin
// 				IF(@Count=0)	
// 				BEGIN
// 				INSERT INTO [dbo].[CostCenter]
// 				(Code, Description, CompanyId)
// 				values
// 				('`+ obj[i]['cost center code'] + `','` + obj[i]['cost center description'] + `',@CompanyId)
// 				END
// 				else
// 				begin
// 				update [dbo].[CostCenter]
// 				set
// 				Description='`+ obj[i]['cost center description'] + `'
// 				where
// 				Code='`+ obj[i]['cost center code'] + `'	
// 				end
// 				end`
// 				}
				
// 				break;
// 			case 'GlAccount':
// 				if(obj[i]['account #']!="" && obj[i]['account description']!=""){
// 				query = `
// 				declare @Count int =0,@CompanyId bigint = 0 ;
// 				select @Count=COUNT(*) from [dbo].[GLAccount] where Account ='`+ obj[i]['account #'] + `';
// 				set @CompanyId='`+Company+`';
// 				if(not @CompanyId = 0)
// 				begin
// 				IF(@Count=0)	
// 				BEGIN
// 				INSERT INTO [dbo].[GLAccount]
// 				(Account, Description, CompanyId)
// 				values
// 				('`+ obj[i]['account #'] + `','` + obj[i]['account description'] + `',@CompanyId)
// 				END
// 				else
// 				begin
// 				update [dbo].[GLAccount]
// 				set
// 				Description='`+ obj[i]['account description'] + `'
// 				where
// 				Account='`+ obj[i]['account #'] + `'	
// 				end
// 				end`
// 				}
// 				break;
// 			case 'PayElementGlAccount':
// 				if(obj[i]['element code'] !="" && obj[i]['account #'] !="" && obj[i]['fixed cost center code'] !="" && obj[i]['fin staff category'] !="" && obj[i]['posting per employee'] !=""  )
// 				query = `
// 				declare  @Count int = 0 , @PayElement int = 0 ,@GlAccount int = 0 ,@CostCenter int = 0 ,@Company bigint = 0 , @FinStaffCategory bigint = 0;
// 				select @Company=Id from Company where Code='`+obj[i]['Company Code']+`'
// 				if(@Company='`+Company+`')
// 				begin
// 				select @PayElement=Id from [dbo].[PayElement] where Code ='`+ obj[i]['element code'] + `';
// 				select @GlAccount=Id from [dbo].[GLAccount] where Account='`+ obj[i]['account #'] + `';
// 				select @CostCenter=Id from [dbo].[CostCenter] where Code ='`+ obj[i]['fixed cost center code'] + `';
// 				select @FinStaffCategory = Id from [myuser].[LookupItems] where Name '`+obj[i]['fin staff category']+`'
// 				set @Company='`+Company+`';
// 				select @Count=Count(*) from [dbo].[PayElementGlAccount] where PayElementId =@PayElement and GLAccountId =@GlAccount And
// 				CostCenterId = @CostCenter;
// 				if(not @PayElement = 0 and not @GlAccount = 0 and not @CostCenter = 0 and not @Company = 0)
// 				begin
// 				if(@Count=0)
// 				begin
// 				insert into [dbo].[PayElementGlAccount] 
// 				(PayElementId, GLAccountId, CostCenterPosting, CostCenterId, PostingPerEmployee,FinStaffCategory)
// 				values
// 				(@PayElement,@GlAccount,'`+ obj[i]['fixed cost center code'] + `',@CostCenter,'` + obj[i]['posting per employee'] + `' , @FinStaffCategory);
// 				end
// 				end
// 				end
// 				`
// 				break;
// 			case 'PayElement':
// 				if(obj[i]['element group'] !="" &&  obj[i]['periodicity'] !="" && obj[i]['default currency code']!="" && obj[i]['# days/ month (Prorata option)']!="" && obj[i]['entitlement/deduction'] !="" && obj[i]['element code'] !="" &&  obj[i]['element description']!="" && obj[i]['lumpsum or prorata']!="" && obj[i]['frequency']!="" ){
// 							query = `
// 				declare @Group int = 0, @Periodicity int =0 ,@Currency int = 0, @Days int = 0 ,@Month int = 0 ,@Increment int =0 ,
// 				@Company int = 0,@Count int =0;
// 				if('`+obj[i]['Company(Company Name - Country)']+`'='`+Company+`')
// 				begin
// 				select @Group=Id from [myuser].[LookupItems] where Name='`+ obj[i]['element group'] + `'
// 				select @Periodicity=Id from [myuser].[LookupItems] where Name='`+ obj[i]['periodicity'] + `'
// 				select @Currency=Id from [myuser].[LookupItems] where Name='`+ obj[i]['default currency code'] + `';
// 				select @Days=Id from [myuser].[LookupItems] where Name='`+ obj[i]['# days/ month (Prorata option)'] + `';
// 				select @Month=Id from [myuser].[LookupItems] where Name='`+ obj[i]['# days/ month (Prorata option)'] + `';
// 				select @Increment=Id from [myuser].[LookupItems] where Name='`+ obj[i]['entitlement/deduction'] + `'
// 				set @Company='`+Company+`';	
// 				select @Count=Count(*) from [dbo].[PayElement] where Code ='`+  obj[i]['element code']  + `';
// 				if(not @Group = 0 and not @Periodicity = 0 and not @Currency = 0 and not @Days = 0 and not @Month = 0 and  not @Increment = 0 and
//  				not @Company = 0 )
// 				 begin
//  				if(@Count = 0)
//  				begin
//  				insert into [dbo].[PayElement]( Code, Description, GroupId, Periodicity, CurrencyCode,
//  				lumpsum, noofDays, ofMonth, CompanyId, Increment , Frequency)
//  				values
//  				('`+ obj[i]['element code'] + `','` + obj[i]['element description'] + `',@Group,@Periodicity,@Currency,'` + obj[i]['lumpsum or prorata'] + `',@Days,@Month,@Company,@Increment , '`+obj[i]['frequency']+`' )
//  				end
//  				else
//  				begin
//  				update [dbo].[PayElement]
//  				set
//  				Description='`+ obj[i]['element description'] + `',
//  				GroupId=@Group,
//  				Periodicity=@Periodicity,
//  				CurrencyCode=@Currency,
//  				lumpsum='`+ obj[i]['lumpsum or prorata'] + `',
//  				noofDays=@Days,
//  				ofMonth=@Month,
//  				CompanyId=@Company,
// 				 Increment=@Increment ,
// 				 Frequency= '`+obj[i]['frequency']+`'
// 				 where
//  				Code='`+ obj[i]['element code']+ `'
// 				end
// 				end
// 				end
// 				`
// 				}
		
// 				break;
// 				case 'Termination':
// 					if(obj[i]['client employee id']!="" && obj[i]['last working day']!="" && obj[i]['termination reason']!="")
// 					query = `declare @CompanyId bigint = 0 , @EmployeeId bigint = 0, @Count bigint = 0 ;
// 					select @CompanyId=Id from Company where Code='`+obj[i]['Company Code']+`'
// 					if(@CompanyId='`+Company+`')
// 					begin
// 					set @CompanyId='`+Company+`';
// 					select @EmployeeId=Id from [dbo].[Employees] where [EmployeeCode]= '`+obj[i]['client employee id']+`';
// 					select @Count = count(*) from [myuser].[EmployeeTermination] where CompanyId = @CompanyId and  EmployeeId = @EmployeeId;
// 					if(@Count=0)
// 					begin
					
// 					insert into [myuser].[EmployeeTermination] 
// 					(CompanyId, EmployeeId, LastWorkingDate, TerminationReason)
// 					values
// 					(@CompanyId,@EmployeeId,'`+obj[i]['last working day']+`','`+obj[i]['termination reason']+`');
					
// 					end
// 					else
// 					begin
// 					update [myuser].[EmployeeTermination] 
// 					set
// 					LastWorkingDate = '`+obj[i]['last working day']+`',
// 					TerminationReason='`+obj[i]['termination reason']+`'
// 					where CompanyId = @CompanyId and  EmployeeId = @EmployeeId;
// 					end
// 					end
// 					`
// 					break;
// 				case 'overtime':
// 					if(obj[i].employeecode !="" && obj[i].overtimepayment !="" && obj[i].paidon!=""  )
// 					query=`
// 					declare @EmployeeId bigint,@CompanyId bigint,@Count int;
// 					set @CompanyId='`+Company+`';
// 					select @EmployeeId=Id from [dbo].[Employees] where EmployeeCode ='`+obj[i].employeecode+`';
// 					select @Count=count(*) from  [dbo].[Employeeovertime] where  [Paidon]='`+obj[i].paidon+`' And EmployeeId=@EmployeeId
// 					if(@Count=0)
// 					begin
// 					insert into [dbo].[Employeeovertime]( [EmployeeId], [OvertimeAmount], [Paidon], [CompanyId])
// 					values(@EmployeeId,'`+obj[i].overtimepayment+`','`+obj[i].paidon+`',@CompanyId);
// 					end 
// 					else
// 					begin
// 					update [dbo].[Employeeovertime]
// 					set
// 					[OvertimeAmount]='`+obj[i].overtimepayment+`',
// 					[Paidon]='`+obj[i].paidon+`'
// 					where
// 					[EmployeeId]=@EmployeeId
// 					end
// 					`;
// 					// console.log(query);
// 					break;	

// 					case 'wagesProtection':
// 						if(obj[i]['Employer Ministry of Labor ID'] !=""  && obj[i]['Employer Entity Name']!=""  )
// 						query=`
// 						declare @EmployeeId bigint,@CompanyId bigint,@Count int;
// 						set @CompanyId='`+Company+`';
// 						select @EmployeeId=Id from [dbo].[Employees] where EmployeeCode ='`+obj[i].employeecode+`';
// 						select @Count=count(*) from  [dbo].[Employeeovertime] where  [Paidon]='`+obj[i].paidon+`' And EmployeeId=@EmployeeId
// 						if(@Count=0)
// 						begin
// 						insert into myuser.WagesProtection( [EmployeeId], [OvertimeAmount], [Paidon], [CompanyId])
// 						values(@EmployeeId,'`+obj[i].overtimepayment+`','`+obj[i].paidon+`',@CompanyId);
// 						end 
// 						else
// 						begin
// 						update myuser.WagesProtection
// 						set
// 						[OvertimeAmount]='`+obj[i].overtimepayment+`',
// 						[Paidon]='`+obj[i].paidon+`'
// 						where
// 						[EmployeeId]=@EmployeeId
// 						end
// 						`;
// 						// console.log(query);
// 						break;	
// 			default:

// 				break;

// 		}
// 		// console.log(query);
// 		const pool = await poolPromise
// 		const result = await pool.request()
// 			.query(query, function (err, profileset) {
// 				if (err) {
// 					return err; //res.status(500).json(err)
// 				}
// 				else {
// 					var response = profileset.recordset;

// 				}

// 			});
// 	}
// }

const PostBulkUpload = async (req, res) => {
	console.log(req.body);
	try {
		const pool = await poolPromise
		const result = await pool.request()
			.input("CompanyId", sql.BIGINT, req.body.Company)
			.input("Type", sql.VARCHAR(500), req.body.Type)
			.input("Data", sql.Text, req.body.Data)
			
			.execute("[dbo].[BulkUpload]").then(function (recordSet) {
				res.status(200).json({ status: "Success" });
				//  return ;
			})
	} catch (err) {
		res.status(400).json({ message: err.message })
		res.send(err.message)
		// return "error";
	}
}
module.exports = { BulkUpload, fileUpload,PostBulkUpload };
