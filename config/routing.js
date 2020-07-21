const auth=require('../controllers/authController');
const Bank=require('./../controllers/BankController');
const Company=require('./../controllers/CompanyController');
const costcenter=require('./../controllers/costcenterController');
const currencyexchange=require('./../controllers/currencyexchageController');

 
const routing=(app)=>{
app.use('/api', auth)  
app.use('/api', Bank)  
app.use('/api', Company)  
app.use('/api', costcenter)  
app.use('/api', currencyexchange)  

}
module.exports=routing;