const userloginPath='/userLogin/:userName/:userPassword';

//#region  Bank
const defaultPath='/Bank';
const BankSecondaryPath=defaultPath+'/:Id';
//#endregion Bank
//#region  Company
const CompanydefaultPath='/Company';
const CompanySecondaryPath=CompanydefaultPath+'/:Id';
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
const BankAccByCompany=BankAccdefaultPath+'/ByCompany/:CompanyId';
//#endregion
//#region Employees
const EmployeedefaultPath='/Employees';
const EmployeeSecondaryPath=EmployeedefaultPath+'/:Id';
const EmployeeByCompany=EmployeedefaultPath+'/ByCompany/:CompanyId';
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
const message={
	"success":"Operation successfull",
	"error":"Operation Unsuccessfull",
	"Autherror":"Invalid Credentials"
}
module.exports={userloginPath,message,defaultPath,BankSecondaryPath,CompanydefaultPath,CompanySecondaryPath,
				CostCenterdefaultPath,CostCenterSecondaryPath,CostCenterByCompany,ExchangedefaultPath,ExchangeSecondaryPath,
				ExchangeByCurrency,BankAccdefaultPath,BankAccSecondaryPath,BankAccByCompany,EmployeedefaultPath,
				EmployeeSecondaryPath,EmployeeByCompany,GLAccdefaultPath,GLAccSecondaryPath,GLAccByCompany,
				GradesdefaultPath,GradesSecondaryPath,GradesByCompany,JobdefaultPath,JobSecondaryPath,JobByCompany,
				PayElementdefaultPath,PayElementSecondaryPath,PayElementByCompany,PayElementGLAccountdefaultPath,
				PayElementGLAccountSecondaryPath,PositiondefaultPath,PositionSecondaryPath,PositionByCompany,
				SocialSecuritydefaultPath,SocialSecuritySecondaryPath,SocialSecurityByCompany};