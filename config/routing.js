const auth=require('./../controllers/auth');
const routing=(app)=>{
	
app.use('/api/auth', auth)  
}
module.exports=routing;