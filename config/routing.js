const auth=require('../controllers/authController');
const Bank=require('./../controllers/BankController');
const Company=require('./../controllers/CompanyController');
const costcenter=require('./../controllers/costcenterController');
const currencyexchange=require('./../controllers/currencyexchageController');
const EmployeeBank=require('./../controllers/EmployeeBankAccountController');
const Employee=require('./../controllers/EmployeesController');
const GLACC=require('./../controllers/GLAccountController');
const Grade=require('./../controllers/GradeController');
const Jobs=require('./../controllers/JobsController');
const PayElement=require('./../controllers/PayElementController');
const PayGLACC=require('./../controllers/PayElementGlAccountController');
const Position=require('./../controllers/PositionsController');
const Security=require('./../controllers/SocialSecurity_Taxation_ElementController');
const unit=require('./../controllers/UnitController');
const unpaidleaves=require('./../controllers/unpaidLeavesController');
const userProtection=require('./../controllers/UserProtectionController');
const lookups=require('./../controllers/LookupsController');
const countryLaw=require('./../controllers/countryLawController');
const payrollslip=require('./../controllers/PayRollSlipController');


const routing=(app)=>{
app.use('/api', auth)  
app.use('/api', Bank)  
app.use('/api', Company)  
app.use('/api', costcenter)  
app.use('/api', currencyexchange)  
app.use('/api', EmployeeBank)  
app.use('/api', Employee)  
app.use('/api', GLACC)  
app.use('/api', Grade)  
app.use('/api', Jobs)  
app.use('/api', PayElement)  
app.use('/api', PayGLACC)  
app.use('/api', Position)  
app.use('/api', Security)  
app.use('/api', unit)  
app.use('/api', unpaidleaves)  
app.use('/api', userProtection) 
app.use('/api',lookups); 
app.use('/api',countryLaw);
app.use('/api',payrollslip);

}
module.exports=routing;