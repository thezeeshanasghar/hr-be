const sql = require('mssql')  
const config = {  
user: "myuser",//'hrsolutionhouse.com',  
password: '_688xwsU',//"nSz4psse9@1oINng",//,  
server: "kuicksave.com",//"91.205.175.115\\MSSQLSERVER2012",//,  
database:"kuicksav_hrms" //"hrsolutionhouse_com_hr"//  ,

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