const express = require('express')  
const router = express.Router()  
const { poolPromise } = require('../connection/db')  
const sql = require('mssql')  
router.get('/getUsers', async (req, res) => {  
try {  
const pool = await poolPromise  
const result = await pool.request()  
.query('select * from users',function(err, profileset){  
if (err)  
{  
console.log(err)  
}  
else {  
var send_data = profileset.recordset;  
res.json(send_data);  
}  
})  
} catch (err) {  
res.status(500)  
res.send(err.message)  
}  
})  

router.post('/ApiUsersPost', async (req, res) => {  
	
	try {  
	const pool = await poolPromise  
	const result = await pool.request()
	.input("Name", sql.VarChar(100),req.body.Name)  
	.input("Address", sql.VarChar(500),req.body.Address)  
	
	.execute("[dbo].[InsertUser]").then(function (recordSet) { 
 	res.status(200).json({ status: "Success" })  
	})  
	} catch (err) {  
	res.status(400).json({ message:err.message})  
	res.send(err.message)  
	}  
	});
	router.put('/ApiUsersPut/:Id', async (req, res) => {  
	
		try {  
		const pool = await poolPromise  
		const result = await pool.request()
		.input("Id", sql.VarChar(500),req.params.Id) 
		.input("Name", sql.VarChar(100),req.body.Name)  
		.input("Address", sql.VarChar(500),req.body.Address)  
		
		.execute("[dbo].[UpdateUsers]").then(function (recordSet) { 
		 res.status(200).json({ status: "Success" })  
		})  
		} catch (err) {  
		res.status(400).json({ message:err.message})  
		res.send(err.message)  
		}  
		});

	router.delete('/ApiUsersdelete/:id', async (req, res) => {  
		try {  
		const pool = await poolPromise  
		const result = await pool.request()  
		.input("Id", sql.BigInt, req.params.id)  
		.execute("[dbo].[DeleteUsers]").then(function (err, recordSet) {  
		res.status(200).json({ status: "Success" })  
		})  
		} catch (err) {  
		res.status(500)  
		res.send(err.message)  
		}  
		}) 
module.exports = router;
