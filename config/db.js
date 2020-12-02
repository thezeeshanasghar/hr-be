const sql = require('mssql')  
const config = {  
user:'sa',// 'myuser',  
password:'MyP@ssword123',// '_688xwsU',  
server: 'DESKTOP-50OBEKQ',//"kuicksave.com",  
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