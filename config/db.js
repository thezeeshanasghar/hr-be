const sql = require('mssql')  
const config = {  
user: 'hrsolutionhouse.com',  
password:"nSz4psse9@1oINng",// '_688xwsU',  
server: "91.205.175.115\\MSSQLSERVER2012",//"kuicksave.com",  
database:"hrsolutionhouse_com_hr"// "kuicksav_hrms"  ,

}  
const poolPromise = new sql.ConnectionPool(config)  
.connect()  
.then(pool => {  
console.log('Connected to MSSQL')  
return pool  
})  
.catch(err => console.log('Database Connection Failed! Bad Config: ', err))  
module.exports = {  
sql, poolPromise  
}  