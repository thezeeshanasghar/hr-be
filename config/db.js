const sql = require('mssql')  
const config = {  
user: 'myuser',  
password: '_688xwsU',  
server: "kuicksave.com",  
database: "kuicksav_hrms"  ,

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