const BulkUpload = require("../services/BulkUpload");

const userdefaultPath="/userLogin";
const userloginPath=userdefaultPath+'/:userName/:userPassword';


//#region  Bank
const defaultPath='/Bank';
const BankSecondaryPath=defaultPath+'/:Id';
//#endregion Bank
//#region  Company
const CompanydefaultPath='/Company';
const CompanySecondaryPath=CompanydefaultPath+'/:Id';
const CompanySelectivePath=CompanydefaultPath+'/Selective/data';
//#endregion CostCenter
const CostCenterdefaultPath='/CostCenter';
const CostCenterSecondaryPath=CostCenterdefaultPath+'/:Id';
const CostCenterByCompany=CostCenterdefaultPath+'/ByCompany/:CompanyId';
//#region CostCenter
//#region Currency Exchange
const ExchangedefaultPath='/Currency';
const ExchangeSecondaryPath=ExchangedefaultPath+'/:Id';
const ExchangeByCurrency=ExchangedefaultPath+'/:Currency/:ToCurrency';
//#endregion
//#region EmployeeBankAccount
const BankAccdefaultPath='/BankAccount';
const BankAccSecondaryPath=BankAccdefaultPath+'/:Id';
const BankAccByEmployee=BankAccdefaultPath+'/ByEmployee/:EmployeeId';
//#endregion
//#region Employees
const EmployeedefaultPath='/Employee';
const EmployeeSecondaryPath=EmployeedefaultPath+'/:Id';
const EmployeeByCompany=EmployeedefaultPath+'/ByCompany/:CompanyId';
const EmployeePayroll=EmployeedefaultPath+'/PayRoll/:EmployeeId';
const EmployeeApplcableLaws=EmployeedefaultPath+'/ApplicableLaw/:EmployeeId';
const EmployeeAdvanceDetail=EmployeedefaultPath+"/details/:Id";
const oneTimePayRoll=EmployeedefaultPath+"/onetime/:Id";
const EmployeeSelective=EmployeedefaultPath+"/selective/data/:CompanyId";
//#endregion

//#region GLAccount
const GLAccdefaultPath='/GLAccount';
const GLAccSecondaryPath=GLAccdefaultPath+'/:Id';
const GLAccByCompany=GLAccdefaultPath+'/ByCompany/:CompanyId';
//#endregion
//#region Grades
const GradesdefaultPath='/Grades';
const GradesSecondaryPath=GradesdefaultPath+'/:Id';
const GradesByCompany=GradesdefaultPath+'/ByCompany/:CompanyId';
//#endregion
//#region Job
const JobdefaultPath='/Job';
const JobSecondaryPath=JobdefaultPath+'/:Id';
const JobByCompany=JobdefaultPath+'/ByCompany/:CompanyId';
//#endregion
//#region PayElement
const PayElementdefaultPath='/PayElement';
const PayElementSecondaryPath=PayElementdefaultPath+'/:Id';
const PayElementByCompany=PayElementdefaultPath+'/ByCompany/:CompanyId';
const PayElementSelectivePath=PayElementdefaultPath+'/Selective/:Id';
//#endregion
//#region PayElementGLAccount
const PayElementGLAccountdefaultPath='/PayElementGLAccount';
const PayElementGLAccountSecondaryPath=PayElementGLAccountdefaultPath+'/:Id';
//#endregion
//#region Position
const PositiondefaultPath='/Position';
const PositionSecondaryPath=PositiondefaultPath+'/:Id';
const PositionByCompany=PositiondefaultPath+'/ByCompany/:CompanyId';
//#endregion
//#region SocialSecurity
const SocialSecuritydefaultPath='/SocialSecurity';
const SocialSecuritySecondaryPath=SocialSecuritydefaultPath+'/:Id';
const SocialSecurityByCompany=SocialSecuritydefaultPath+'/ByCompany/:CompanyId';
//#endregion
//#region Unit
const UnitdefaultPath='/unit';
const UnitSecondaryPath=UnitdefaultPath+'/:Id';
const UnitByCompany=UnitdefaultPath+'/ByCompany/:CompanyId';
//#endregion
//#region Unpaidleaves
const UnpaidleavesdefaultPath='/Unpaidleaves';
const UnpaidleavesSecondaryPath=UnpaidleavesdefaultPath+'/:Id';
const UnpaidleavesByCompany=UnpaidleavesdefaultPath+'/ByCompany/:CompanyId';
//#endregion
//#region userProtection
const userProtectiondefaultPath='/userProtection';
const userProtectionSecondaryPath=userProtectiondefaultPath+'/:Id';
const userProtectionByCompany=userProtectiondefaultPath+'/ByCompany/:CompanyId';
//#endregion

//#region 
const LookupsSecondaryPath="/lookups/:Id";
//#endregion

//#region country Law
const CountryLawdefaultPath='/countrylaw';
const CountryLawSecondaryPath='/countrylaw/:Id';
const CountryLawByCompanyPath=CountryLawdefaultPath+"/ByCompany/:CompanyId"
//#endregion
//#region 
const PaySlipDefaultPath='/payslip';
const payrollbyCompany=PaySlipDefaultPath +"/ByCompany/:CompanyId";
//#endregion
//#region Reports
const EmployeeReport='/Report/Employee';
const EmployeepayrollReport='/Report/PayRoll';
const EmployeeVarrianceReport="/Report/Varriance"
const EmployeeVarrianceindvReport="/Report/indevVarriance";
const GTNReport="/Report/GTN";
const downloadPath="/Download/:Path";
const GLReport="/Report/GL";
const PaySlip="/Report/PaySlip/:Id";
const PaymentDetailReport="/Report/PaySlipdetail/:GroupName/:EmployeeId";
//#endregion 
//#region BulkUpload
const BulkUploadPath='/bulkupload';
const FileUpload='/Upload';
const PostBulkUploadPath=BulkUploadPath+"/data";
//#endregion
const message={
	"success":"Operation successfull",
	"error":"Operation Unsuccessfull",
	"Autherror":"Invalid Credentials"
}
//#region Dashboard
const DashboardPath="/dashboard/Companies";
const CompaniesCountPath="/dashboard/Companies/Count"
const UsersCountPath="/dashboard/users/Count"
//#endregion

//#region Termination
const TerminationPrimaryPath="/termination";
const TerminationSecondaryPath=TerminationPrimaryPath+"/:Id";
const TerminationByCompany=TerminationPrimaryPath+"/ByCompany/:CompanyId"

const ReversePayroll=PaySlipDefaultPath+"/reversePayroll"
const specificPayroll=PaySlipDefaultPath+"/specific/:Company";
const changeStatuspayroll=PaySlipDefaultPath+"/status/:status/:code"

//#endregion
//#region Applicable Law
const ApplicablelawdefaultPath="/CompanyApplicableLaw";
const ApplicableLawSecondaryPath =ApplicablelawdefaultPath+"/:Id";
const ApplicableLawByCompany=ApplicablelawdefaultPath+"/ByCompany/:CompanyId";

//#endregion

//#region taxable Element
const taxabledefaultPath="/taxable";
const taxableByCompany=defaultPath+"/ByCompany";
const taxableSecondaryPath=defaultPath+"/:Id"
//#endregion
module.exports={userloginPath,userdefaultPath,message,defaultPath,BankSecondaryPath,CompanydefaultPath,CompanySelectivePath,CompanySecondaryPath,
				CostCenterdefaultPath,CostCenterSecondaryPath,CostCenterByCompany,ExchangedefaultPath,ExchangeSecondaryPath,
				ExchangeByCurrency,BankAccdefaultPath,BankAccSecondaryPath,BankAccByEmployee,EmployeedefaultPath,
				EmployeeSecondaryPath,EmployeeByCompany,EmployeePayroll,EmployeeApplcableLaws,GLAccdefaultPath,GLAccSecondaryPath,GLAccByCompany,
				GradesdefaultPath,GradesSecondaryPath,GradesByCompany,JobdefaultPath,JobSecondaryPath,JobByCompany,
				PayElementdefaultPath,PayElementSelectivePath,PayElementSecondaryPath,PayElementByCompany,PayElementGLAccountdefaultPath,
				PayElementGLAccountSecondaryPath,PositiondefaultPath,PositionSecondaryPath,PositionByCompany,
				SocialSecuritydefaultPath,SocialSecuritySecondaryPath,SocialSecurityByCompany,
				UnitdefaultPath,UnitSecondaryPath,UnitByCompany,UnpaidleavesdefaultPath,UnpaidleavesSecondaryPath,UnpaidleavesByCompany,
				userProtectiondefaultPath,userProtectionSecondaryPath,userProtectionByCompany,LookupsSecondaryPath,
				CountryLawdefaultPath,CountryLawSecondaryPath,CountryLawByCompanyPath,PaySlipDefaultPath,EmployeeReport,EmployeepayrollReport,EmployeeVarrianceReport,EmployeeVarrianceindvReport,
				BulkUploadPath,FileUpload,PostBulkUploadPath,DashboardPath,CompaniesCountPath,UsersCountPath,
				TerminationPrimaryPath,TerminationSecondaryPath,TerminationByCompany,
				EmployeeAdvanceDetail,oneTimePayRoll,EmployeeSelective,ReversePayroll,specificPayroll,payrollbyCompany,changeStatuspayroll,
				taxableByCompany,taxableSecondaryPath,taxabledefaultPath,GTNReport,
				ApplicableLawSecondaryPath,ApplicableLawByCompany,ApplicablelawdefaultPath,downloadPath,GLReport,PaySlip,
				PaymentDetailReport};