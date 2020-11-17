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
				SaveRecord(result, req.body.Type,req.body.Company);
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

const SaveRecord = async (result, Type,Company) => {

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
									   (BankName, Address, BranchCode, Code, SwiftCode, UAEFTSBANKCode, RouteCode, Description)
									   VALUES
									   ('`+ obj[i].bankname + `','` + obj[i].address + `','` + obj[i].branchcode + `',
									   '` + obj[i].code + `','` + obj[i].swiftcode + `'
									   ,'` + obj[i].uaeftsbankcode + `','` + obj[i].routecode + `','` + obj[i].description + `');
							   end
							   else
							   begin 
									   UPDATE  [dbo].[Bank]
									   SET
									   BankName = '`+ obj[i].bankname + `',
									   Address = '`+ obj[i].address + `',
									   SwiftCode='` + obj[i].swiftcode + `',
									   UAEFTSBANKCode='` + obj[i].uaeftsbankcode + `',
									   RouteCode='` + obj[i].routecode + `',
									   Description='` + obj[i].description + `'
									   WHERE
									   BranchCode = '`+ obj[i].branchcode + `';
									   
		   
							   end
							   `;
				break;
			case 'Company':
				query = `
				declare @Count int = 0 , @COUNTRYCODE BIGINT = 0 , @BankId bigint = 0 , @CompanyId bigint = 0 , @CurrencyId bigint = 0 , @CompanyId bigint = 0 ;
				SELECT @Count=COUNT(*) FROM [dbo].[Company] WHERE [Code]='`+ obj[i].code + `';
				select @BankId=Id from [dbo].[Bank]  WHERE [Code]='`+ obj[i].code + `';
				select @CurrencyId=Id from [myuser].[LookupItems] where Name =  '`+obj[i].currency+`';
				IF @COUNT=0
				BEGIN
				
					SELECT @COUNTRYCODE=Id FROM [myuser].[LookupItems] WHERE Name='`+ obj[i].countrycode + `';
					IF NOT @COUNTRYCODE = 0
					BEGIN
					INSERT INTO [dbo].[Company]
					( Code, CompanyName, Address, Contact, Email, StartDate, RegistrationNo, TaxationNo, SocialSecurityNo, EOBINo, CountryCode)
					VALUES
					('`+ obj[i].code + `','` + obj[i].companyname + `','` + obj[i].address + `','` + obj[i].contact + `','` + obj[i].email + `',getdate(),'` + obj[i].registrationno + `','` + obj[i].taxationno + `','` + obj[i].socialsecurityno + `','` + obj[i].eobino + `',@COUNTRYCODE);

					set @CompanyId = @@identity;

					insert into [dbo].[CompanyBankAccounts]
					(BankId, CompanyId, CurrencyId, Createddate, AccNo)
					values
					(@BankId,@CompanyId,@CurrencyId,getdate(),'`+ obj[i].account + `')
					END
				END
				ELSE
				BEGIN
					UPDATE [dbo].[Company]
					SET
					CompanyName='`+ obj[i].companyname + `',
					Address='`+ obj[i].address + `',
					Contact='`+ obj[i].contact + `',
					Email='`+ obj[i].email + `',
					RegistrationNo ='`+ obj[i].registrationno + `', 
					 TaxationNo ='`+ obj[i].taxationno + `',
					  SocialSecurityNo ='`+ obj[i].socialsecurityno + `',
					   EOBINo ='`+ obj[i].eobino + `'
					WHERE 
					Code='`+ obj[i].code + `'

				select @CompanyId=Id from [dbo].[Company] where Code = '`+ obj[i].cod +`';

					update [dbo].[CompanyBankAccounts]
					set
					BankId = @BankId , CurrencyId = @CurrencyId , AccNo = '`+ obj[i].account + `'
					where
					CompanyId= @CompanyId;
				END
				
					`
				break;
			case 'Exchange':
				query = `
				declare @Fromcurrency int = 0 ,@ToCurrency int = 0,@Count int = 0 ; 
				select @Fromcurrency=Id from [myuser].[LookupItems] where Name = '`+ obj[i].currency + `';
				select @ToCurrency=Id from [myuser].[LookupItems] where Name = '`+ obj[i].tocurrency + `';
				select @Count=Count(*) from [dbo].[CurrencyExchange] where [Currency]=@Fromcurrency and [ToCurrency]=@ToCurrency and [EffectiveDate]='`+ obj[i].effectivedate + `';

				if( Not @Fromcurrency  = 0 AND Not @ToCurrency  = 0  AND @Count= 0 )
				insert [dbo].[CurrencyExchange]
				(Currency, Rate, ToCurrency, EffectiveDate)
				values
				(@Fromcurrency,'`+ obj[i].rate + `',@ToCurrency,'` + obj[i].effectivedate + `')
				else
				update [dbo].[CurrencyExchange]
				set
				Rate='`+ obj[i].rate + `'
				WHERE
 				[Currency]=@Fromcurrency and [ToCurrency]=@ToCurrency and [EffectiveDate]='`+ obj[i].effectivedate + `';


				`
				break;
			case 'CountryLaw':

				query = `
				Declare @Count INT =0,@CountryCode bigint = 0 , @Currency bigint = 0,@CalculationMode bigint = 0 ,@Type bigint = 0 , @DeclarationMode bigint = 0   ;
				SELECT @Count=COUNT(*) FROM [dbo].[CountryLaws] WHERE Detail='`+ obj[i].detail + `'
				select @CountryCode=Id from [myuser].[LookupItems] where Name ='`+ obj[i].countrycode + `'
				select @Currency=Id from [myuser].[LookupItems] where Name ='`+ obj[i].currency + `'
				select @CalculationMode=Id from [myuser].[LookupItems] where Name ='`+ obj[i].calculationmode + `'
				select @Type=Id from [myuser].[LookupItems] where Name ='`+ obj[i].type + `';
				select @DeclarationMode = Id from [myuser].[LookupItems] where Name ='`+ obj[i].declarationmode + `';
				iF ( NOT @CountryCode  = 0 AND NOT @CountryCode  = 0 AND NOT @CalculationMode  = 0 AND NOT @Type  = 0)
				BEGIN
				IF(@Count=0)
				BEGIN
				INSERT INTO [dbo].[CountryLaws] (Detail, CountryCode, Currency, StartDate, AdultAge, CalculationMode, MaxSalary, MinSalary, Percentage, Type , Discount, TaxAmount, NoCarryForward, lumpsum, PaidWithin, DeclarationMode)
				VALUES
				('`+ obj[i].detail + `',@CountryCode,@Currency,'` + obj[i].startdate + `','` + obj[i].adultage + `',@CalculationMode,'` + obj[i].maxsalary + `','` + obj[i].minsalary + `','` + obj[i].percentage + `',@Type , '` + obj[i].discount + `' , '` + obj[i].taxamount + `', '`+obj[i].nocarryforward+`' ,  '` + obj[i].lumpsum + `', '` + obj[i].paidwithin + `' , @DeclarationMode );
				END
				ELSE
				BEGIN
				UPDATE [dbo].[CountryLaws]
				SET
				CountryCode=@CountryCode, Currency=@Currency, StartDate='`+ obj[i].startdate + `',
				CalculationMode=@CalculationMode, AdultAge='`+ obj[i].adultage + `',
				MaxSalary='`+ obj[i].maxsalary + `',MinSalary='` + obj[i].minsalary + `', Percentage='', Type=@Type ,
				Discount ='`+ obj[i].discount + `' , TaxAmount ='`+ obj[i].taxamount + `' ,  NoCarryForward ='`+ obj[i].nocarryforward + `' , lumpsum ='`+ obj[i].lumpsum + `' , PaidWithin ='`+ obj[i].paidwithin + `' , DeclarationMode ='`+ obj[i].declarationmode + `'
				WHERE
				Detail='`+ obj[i].detail + `'
				END
				END
				`
				break;
			case 'Grade':
				query = `
				declare @Count int =0,@CompanyId bigint = 0 ;
				select @Count=COUNT(*) from [dbo].[Grade] where Code ='`+ obj[i].code + `';
				set @CompanyId='`+Company+`';
				if(not @CompanyId = 0)
				begin
				IF(@Count=0)	
				BEGIN
				INSERT INTO [dbo].[Grade] 
				(Code, Description, CompanyId)
				values
				('`+ obj[i].code + `','` + obj[i].description + `',@CompanyId)
				END
				else
				begin
				update [dbo].[Grade] 
				set
				Description='`+ obj[i].description + `'
				where
				Code='`+ obj[i].code + `'	
				end
				end
				`
				break
			case 'Unit':
				query = `
					declare @Count int =0,@CompanyId bigint = 0 ;
					select @Count=COUNT(*) from [dbo].[Unit] where Code ='`+ obj[i].code + `';
					set @CompanyId='`+Company+`';
					if(not @CompanyId = 0)
					begin
					IF(@Count=0)	
					BEGIN
					INSERT INTO [dbo].[Unit] 
					(Code, Name, CompanyId)
					values
					('`+ obj[i].code + `','` + obj[i].name + `',@CompanyId)
					END
					else
					begin
					update [dbo].[Unit]
					set
					Name='`+ obj[i].name + `'
					where
					Code='`+ obj[i].code + `'	
					end
					end
					`
				break
			case 'Position':
				query = `
						declare @Count int = 0,@UnitId bigint = 0 , @JobId bigint = 0,@CompanyId bigint = 0;
						select @UnitId = Id from [dbo].[Unit] where Code = '`+ obj[i].unit + `';
						select @JobId = Id from [dbo].[Jobs] where Code = '`+ obj[i].job + `'
						select @Count=Count(*) from [dbo].[Positions] where Code = '`+ obj[i].code + `';
						set @CompanyId='`+Company+`';
						if(not @UnitId = 0 and not @JobId = 0 and not @CompanyId = 0)
						begin

						if(@Count = 0)
						begin
						insert into [dbo].[Positions]
						(UnitId, JobId, Code, Title, CompanyId)
						values
						(@UnitId,@JobId,'`+ obj[i].code + `','` + obj[i].title + `',@CompanyId);
						end
						else
						begin
						update [dbo].[Positions]
						set
						UnitId=@UnitId,JobId=@JobId,Title='`+ obj[i].title + `'
						where
						Code='`+ obj[i].code + `'
						end
						end
					`
				break;
			case 'Job':
				query = `
						declare @Count int =0,@CompanyId bigint = 0 ;
						select @Count=COUNT(*) from [dbo].[Jobs] where Code ='`+ obj[i].code + `';
						set @CompanyId='`+Company+`';
						if(not @CompanyId = 0)
						begin
						IF(@Count=0)	
						BEGIN
						INSERT INTO [dbo].[Jobs]
						(Code, Description, CompanyId)
						values
						('`+ obj[i].code + `','` + obj[i].description + `',@CompanyId)
						END
						else
						begin
						update [dbo].[Jobs]
						set
						Description='`+ obj[i].description + `'
						where
						Code='`+ obj[i].code + `'	
						end
						end
						`
				break
			case 'Employee':
				query = `
					declare @Count int = 0 , @Postion bigint = 0 , @Grade bigint = 0 , @Gender int = 0 , @MaritalStatus int = 0 ,
					@ContactType int = 0 ,@Country int = 0 ,@EmployeeStatus int = 0 ,@PartTimeStatus int = 0 ,@Company int = 0,@Title int = 0;
					select @Count=count(*) from [dbo].[Employees] where EmployeeCode='`+ obj[i].code + `'
					select @Postion = Id from [dbo].[Positions] where Code ='`+ obj[i].position + `'
					select @Grade = Id from [dbo].[Grade] where Code ='`+ obj[i].grade + `'
					select @Gender = Id from [myuser].[LookupItems] where Name='`+ obj[i].gender + `'
					select @MaritalStatus = Id from [myuser].[LookupItems] where Name='`+ obj[i].maritalstatus + `'
					select @ContactType = Id from [myuser].[LookupItems] where Name='`+ obj[i].contacttype + `'
					select @Country = Id from [myuser].[LookupItems] where Name='`+ obj[i].country + `'
					select @EmployeeStatus = Id from [myuser].[LookupItems] where Name='`+ obj[i].employeestatus + `'
					select @PartTimeStatus = Id from [myuser].[LookupItems] where Name='`+ obj[i].parttimestatus + `'
					select @Title = Id from [myuser].[LookupItems] where Name='`+ obj[i].title + `'
					set @Company='`+Company+`';
					if(not @Postion = 0 and not @Grade = 0 and not @Gender = 0 and not @MaritalStatus = 0 and  not @ContactType = 0
  					and not @Country = 0 and not @EmployeeStatus = 0 and  not @PartTimeStatus = 0 and not @Company = 0 and not @Title = 0)
  					begin
  					if @Count = 0
  					begin
					INSERT INTO [dbo].[Employees]
					(CompanyId, EmployeeCode, InsuranceId, TaxationId, Cnic, FirstName,
					LastName, DOB, HireDate, HiringReason, ServiceStartDate, ProbationEndDate,
					PartTimePercentage, ContractEndDate, PositionId, GradeId, Address, Contact,
					Gender, MaritalStatus, ContractType, Country, CurrentEmployeeStatus, PartTimeSituation, Title, Email)
					values
					(@Company,'`+ obj[i].code + `','` + obj[i].insuranceid + `','` + obj[i].taxationid + `','` + obj[i].cnic + `','` + obj[i].firstname + `','` + obj[i].lastname + `','` + obj[i].dob + `',
					'`+ obj[i].hiredate + `','` + obj[i].hiringreason + `','` + obj[i].servicestartdate + `','` + obj[i].probationenddate + `','` + obj[i].parttimepercentage + `','` + obj[i].contractenddate + `',@Postion,@Grade,
					'`+ obj[i].address + `','` + obj[i].contact + `',@Gender,@MaritalStatus,@ContactType,
					@Country,@EmployeeStatus,@PartTimeStatus,@Title,'`+ obj[i].email + `')
  					end
  					else
  					begin
  					update [dbo].[Employees]
 					 set
  					InsuranceId='`+ obj[i].insuranceid + `',
  					TaxationId='`+ obj[i].taxationid + `',
  					Cnic='`+ obj[i].cnic + `',
  					FirstName='`+ obj[i].firstname + `',
					 LastName='`+ obj[i].lastname + `',
					 DOB='`+ obj[i].dob + `',
					 HireDate='`+ obj[i].hiredate + `',
					 HiringReason='`+ obj[i].hiringreason + `',
					 ServiceStartDate='`+ obj[i].servicestartdate + `',
					 ProbationEndDate='`+ obj[i].probationenddate + `',
					 PartTimePercentage='`+ obj[i].parttimepercentage + `',
					 ContractEndDate='`+ obj[i].contractenddate + `',
					 PositionId=@Postion,GradeId=@Grade,
					 Address='`+ obj[i].address + `', Contact='` + obj[i].contact + `',
					Gender=@Gender, MaritalStatus=@MaritalStatus, ContractType=@ContactType, Country=@Country, CurrentEmployeeStatus=@EmployeeStatus,
					PartTimeSituation=@PartTimeStatus, Title=@Title, Email='`+ obj[i].email + `'
					where
					EmployeeCode = '`+ obj[i].code + `';

 					end 
  					end
						`
				break;
			case 'EmployeeBank':
				query = `
				declare @Count int = 0 , @Bank bigint = 0 ,@Currency int  = 0 , @EmployeeId bigint = 0,@CompanyId bigint = 0;
				select @EmployeeId=Id from [dbo].[Employees] where [EmployeeCode]='`+ obj[i].employeecode + `';
				select @Bank=Id from [dbo].[Bank] where [BranchCode] ='`+ obj[i].branch + `';
				select @Currency=Id from [myuser].[LookupItems] where Name ='`+ obj[i].currency + `';
				select @Count=count(*) from [dbo].[EmployeeBankAccount] where IBAN ='`+ obj[i].iban + `'  and EmployeeId =@EmployeeId;
				set @CompanyId='`+Company+`';
				if(not  @EmployeeId = 0 and not @Bank = 0 and not @Currency = 0 and not @CompanyId = 0)
				begin
				if(@Count = 0)
				begin
				insert into [dbo].[EmployeeBankAccount]
				( CompanyId, BankId, IBAN, EffectiveDate, IsPrimary, CurrencyCode, EmployeeId)
				values
				(@CompanyId,@Bank, '`+ obj[i].iban + `','` + obj[i].effectivedate + `','` + obj[i].isprimary + `',@Currency,@EmployeeId);
				end
				else 
				begin
				update  [dbo].[EmployeeBankAccount]
				set
				BankId=@Bank,
				EffectiveDate='`+ obj[i].effectivedate + `',
				IsPrimary='`+ obj[i].isprimary + `',
				CurrencyCode=@Currency
				where
				IBAN='`+ obj[i].iban + `' and EmployeeId=@EmployeeId
				end
				end
				`
				break;
			case 'EmployeePayroll':
				query = `
				declare @PayElement bigint = 0 ,@Currency int = 0, @EmployeeId bigint = 0 ,@Count int = 0 , @CompanyId bigint = 0 , @Entitlement bigint = 0;
				select @PayElement=Id from [dbo].[PayElement] where Code = '`+ obj[i].payelement + `';
				select @EmployeeId=Id from [dbo].[Employees] where [EmployeeCode]='`+ obj[i].employee + `';
				select @Currency=Id from [myuser].[LookupItems] where Name ='`+ obj[i].currency + `';
				select @Entitlement=Id from [myuser].[LookupItems] where Name ='`+ obj[i].entitlement + `';
				set @CompanyId='`+Company+`';
				select @Count=Count(*) from [myuser].[PeriodicPayElements] where PayelementId = @PayElement and EmployeeId =@EmployeeId
				if(not @PayElement = 0 and not @Currency = 0 and not @EmployeeId = 0)
				begin
				if(@Count = 0)
				begin
				insert into [myuser].[PeriodicPayElements]	
				(PayElementId, amount, Currency, StartDate, EndDate, EmployeeId,CompanyId,Frequency,Entitlement)
				values
				(@PayElement,'`+ obj[i].value + `',@Currency,'` + obj[i].startdate + `','` + obj[i].enddate + `',@EmployeeId , @CompanyId , '`+obj[i].frequency+`',@Entitlement);
				end
				else 
				begin
				update [myuser].[PeriodicPayElements]
				set
				value='`+ obj[i].value + `',
				Currency=@Currency,
				StartDate='`+ obj[i].startdate + `',
				EndDate='`+ obj[i].enddate + `',
				Frequency='`+obj[i].frequency+`',
				Entitlement = @Entitlement
				where PayelementId=@PayElement and EmployeeId=@EmployeeId;
				end
				end
				`
				break;

				case 'EmployeePayrollOneTime':
					Id,
				query = `
				declare @PayElement bigint = 0 ,@Currency int = 0, @EmployeeId bigint = 0 ,@Count int = 0 , @CompanyId bigint = 0 , @Entitlement bigint = 0;
				select @PayElement=Id from [dbo].[PayElement] where Code = '`+ obj[i].payelement + `';
				select @EmployeeId=Id from [dbo].[Employees] where [EmployeeCode]='`+ obj[i].employee + `';
				select @Currency=Id from [myuser].[LookupItems] where Name ='`+ obj[i].currency + `';
				select @Entitlement=Id from [myuser].[LookupItems] where Name ='`+ obj[i].entitlement + `';
				set @CompanyId='`+Company+`';
				select @Count=Count(*) from [myuser].[OnetimeElement] where PayelementId = @PayElement and EmployeeId =@EmployeeId
				if(not @PayElement = 0 and not @Currency = 0 and not @EmployeeId = 0)
				begin
				if(@Count = 0)
				begin
				insert into [myuser].[OnetimeElement]
				( CompanyId, EmployeeId, PayElementId, EffectiveDate, Amount, Currency, Entitlement)
				values
				(@CompanyId,@EmployeeId, @PayElement,'` + obj[i].effectivedate + `','`+ obj[i].value + `',@Currency,@Entitlement);
				end
				else 
				begin
				update [myuser].[OnetimeElement]
				set
				value='`+ obj[i].value + `',
				Currency=@Currency,
				EffectiveDate='`+ obj[i].effectivedate + `',
				Entitlement = @Entitlement
				where PayelementId=@PayElement and EmployeeId=@EmployeeId;
				end
				end
				`
				break;

			case 'ApplicableLaws':
				query = `
				declare @Count int = 0,@Law bigint = 0,@Employee bigint = 0 ;
				select @Law =Id  from [dbo].[CountryLaws] where Detail = '`+ obj[i].law + `';
				select @Employee=Id from [dbo].[Employees] where [EmployeeCode]='`+ obj[i].employee + `';
				select @Count =COUNT(*) from [dbo].[Applicable_laws] where LawId=@Law and EmployeeId=@Employee;

				if(not @Employee = 0 and not @Law = 0)
				begin
				if @Count=0
				begin
 				insert into [dbo].[Applicable_laws] ( LawId, EmployeeId)
 				values
 				(@Law,@Employee)
				end
				end
				`
				break;
			case 'UnpaidLeaves':
				query = `
				select * from [dbo].[unpaidLeaves]
				declare @Count int = 0, @Company bigint = 0 , @EmployeeId bigint = 0;
				set @Company='`+Company+`';
				select @EmployeeId=Id from [dbo].[Employees] where [EmployeeCode] = '`+ obj[i].employee + `';
				select @Count=Count(*) from [dbo].[unpaidLeaves] where EmployeeId = @EmployeeId AND LeaveStartDate<='' AND LeaveEndDate>='';
				if(not @Company = 0 and not @EmployeeId = 0 )
				begin
				if(@Count=0)
				begin
				insert into [dbo].[unpaidLeaves]
				(CompanyId, EmployeeId, LeaveStartDate, LeaveEndDate)	
				values
				(@Company,@EmployeeId,'`+ obj[i].leavestartdate + `','` + obj[i].leaveenddate + `');
				end
				end
				`
			case 'CostCenter':
				query = `
				declare @Count int =0,@CompanyId bigint = 0 ;
				select @Count=COUNT(*) from [dbo].[CostCenter] where Code ='`+ obj[i].code + `';
				set @CompanyId='`+Company+`';
				if(not @CompanyId = 0)
				begin
				IF(@Count=0)	
				BEGIN
				INSERT INTO [dbo].[CostCenter]
				(Code, Description, CompanyId)
				values
				('`+ obj[i].code + `','` + obj[i].description + `',@CompanyId)
				END
				else
				begin
				update [dbo].[CostCenter]
				set
				Description='`+ obj[i].description + `'
				where
				Code='`+ obj[i].code + `'	
				end
				end`
				break;
			case 'GlAccount':
				query = `
				declare @Count int =0,@CompanyId bigint = 0 ;
				select @Count=COUNT(*) from [dbo].[GLAccount] where Account ='`+ obj[i].account + `';
				set @CompanyId='`+Company+`';
				if(not @CompanyId = 0)
				begin
				IF(@Count=0)	
				BEGIN
				INSERT INTO [dbo].[GLAccount]
				(Account, Description, CompanyId)
				values
				('`+ obj[i].account + `','` + obj[i].description + `',@CompanyId)
				END
				else
				begin
				update [dbo].[GLAccount]
				set
				Description='`+ obj[i].description + `'
				where
				Account='`+ obj[i].account + `'	
				end
				end`
				break;
			case 'PayElementGlAccount':
				query = `
				declare  @Count int = 0 , @PayElement int = 0 ,@GlAccount int = 0 ,@CostCenter int = 0 ,@Company bigint = 0 , @FinStaffCategory bigint = 0;
				select @PayElement=Id from [dbo].[PayElement] where Code ='`+ obj[i].payelement + `';
				select @GlAccount=Id from [dbo].[GLAccount] where Account='`+ obj[i].glaccount + `';
				select @CostCenter=Id from [dbo].[CostCenter] where Code ='`+ obj[i].costcenter + `';
				select @FinStaffCategory = Id from [myuser].[LookupItems] where Name '`+obj[i].finstaffcategory+`'
				set @Company='`+Company+`';
				select @Count=Count(*) from [dbo].[PayElementGlAccount] where PayElementId =@PayElement and GLAccountId =@GlAccount And
				CostCenterId = @CostCenter;
				if(not @PayElement = 0 and not @GlAccount = 0 and not @CostCenter = 0 and not @Company = 0)
				begin
				if(@Count=0)
				begin
				insert into [dbo].[PayElementGlAccount] 
				(PayElementId, GLAccountId, CostCenterPosting, CostCenterId, PostingPerEmployee,FinStaffCategory)
				values
				(@PayElement,@GlAccount,'`+ obj[i].costcenterposting + `',@CostCenter,'` + obj[i].postingperemployee + `' , @FinStaffCategory);
				end
				end
				`
				break;
			case 'PayElement':
				query = `
				declare @Group int = 0, @Periodicity int =0 ,@Currency int = 0, @Days int = 0 ,@Month int = 0 ,@Increment int =0 ,
				@Company int = 0,@Count int =0;
				select @Group=Id from [myuser].[LookupItems] where Name='`+ obj[i].group + `'
				select @Periodicity=Id from [myuser].[LookupItems] where Name='`+ obj[i].periodicity + `'
				select @Currency=Id from [myuser].[LookupItems] where Name='`+ obj[i].currency + `';
				select @Days=Id from [myuser].[LookupItems] where Name='`+ obj[i].days + `';
				select @Month=Id from [myuser].[LookupItems] where Name='`+ obj[i].month + `'
				select @Increment=Id from [myuser].[LookupItems] where Name='`+ obj[i].entitlement + `'
				set @Company='`+Company+`';	
				select @Count=Count(*) from [dbo].[PayElement] where Code ='`+ obj[i].code + `';
				if(not @Group = 0 and not @Periodicity = 0 and not @Currency = 0 and not @Days = 0 and not @Month = 0 and  not @Increment = 0 and
 				not @Company = 0 )
				 begin
 				if(@Count = 0)
 				begin
 				insert into [dbo].[PayElement]( Code, Description, GroupId, Periodicity, CurrencyCode,
 				lumpsum, noofDays, ofMonth, CompanyId, Increment , Frequency)
 				values
 				('`+ obj[i].code + `','` + obj[i].description + `',@Group,@Periodicity,@Currency,'` + obj[i].lumpsum + `',@Days,@Month,@Company,@Increment , '`+obj[i].frequency+`' )
 				end
 				else
 				begin
 				update [dbo].[PayElement]
 				set
 				Description='`+ obj[i].description + `',
 				GroupId=@Group,
 				Periodicity=@Periodicity,
 				CurrencyCode=@Currency,
 				lumpsum='`+ obj[i].lumpsum + `',
 				noofDays=@Days,
 				ofMonth=@Month,
 				CompanyId=@Company,
				 Increment=@Increment ,
				 Frequency= '`+obj[i].frequency+`'
				 where
 				Code='`+ obj[i].code + `'
				end
 				end
				`
				break;
				case 'Termination':
					query = `declare @CompanyId bigint = 0 , @EmployeeId bigint = 0, @Count bigint = 0 ;
					set @CompanyId='`+Company+`';
					select @EmployeeId=Id from [dbo].[Employees] where [EmployeeCode]= '`+obj[i].employee+`';
					select @Count = count(*) from [myuser].[EmployeeTermination] where CompanyId = @CompanyId and  EmployeeId = @EmployeeId;
					if(@Count=0)
					begin
					
					insert into [myuser].[EmployeeTermination] 
					(CompanyId, EmployeeId, LastWorkingDate, TerminationReason)
					values
					(@CompanyId,@EmployeeId,'`+obj[i].lastworkingdate+`','`+obj[i].terminationreason+`');
					
					end
					else
					begin
					update [myuser].[EmployeeTermination] 
					set
					LastWorkingDate = '`+obj[i].lastworkingdate+`',
					TerminationReason='`+obj[i].terminationreason+`'
					where CompanyId = @CompanyId and  EmployeeId = @EmployeeId;
					end
					`
					break;
				case 'overtime':
					query=`
					declare @EmployeeId bigint,@CompanyId bigint,@Count int;
					set @CompanyId='`+Company+`';
					select @EmployeeId=Id from [dbo].[Employees] where EmployeeCode ='`+obj[i].employeecode+`';
					select @Count=count(*) from  [dbo].[Employeeovertime] where  [Paidon]='`+obj[i].paidon+`' And EmployeeId=@EmployeeId
					if(@Count=0)
					begin
					insert into [dbo].[Employeeovertime]( [EmployeeId], [OvertimeAmount], [Paidon], [CompanyId])
					values(@EmployeeId,'`+obj[i].overtimepayment+`','`+obj[i].paidon+`',@CompanyId);
					end 
					else
					begin
					update [dbo].[Employeeovertime]
					set
					[OvertimeAmount]='`+obj[i].overtimepayment+`',
					[Paidon]='`+obj[i].paidon+`'
					where
					[EmployeeId]=@EmployeeId
					end
					`;
					console.log(query);
					break;	
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
