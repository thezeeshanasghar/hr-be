const auth=require('./../controllers/auth');
const Bank=require('./../controllers/BankController');

 
const routing=(app)=>{
	
app.use('/api/auth', auth)  
app.use('/api', Bank)  

}
module.exports=routing;