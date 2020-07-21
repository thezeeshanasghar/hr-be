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


//#endregion

const message={
	"success":"Operation successfull",
	"error":"Operation Unsuccessfull",
	"Autherror":"Invalid Credentials"
}
module.exports={userloginPath,message,defaultPath,BankSecondaryPath,CompanydefaultPath,CompanySecondaryPath,
				CostCenterdefaultPath,CostCenterSecondaryPath,CostCenterByCompany,ExchangedefaultPath,ExchangeSecondaryPath,
				ExchangeByCurrency };