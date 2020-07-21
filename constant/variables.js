const userloginPath='/userLogin/:userName/:userPassword';

//#region  Bank
const defaultPath='/Bank';
const BankSecondaryPath=defaultPath+'/:Id';


//#endregion Bank

const message={
	"success":"Operation successfull",
	"error":"Operation Unsuccessfull",
	"Autherror":"Invalid Credentials"
}
module.exports={userloginPath,message,defaultPath,BankSecondaryPath};