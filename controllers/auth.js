const express = require('express')  
const router = express.Router()  
const { poolPromise } = require('../config/db')  
const sql = require('mssql')  
const {userloginPath}=require('./../constant/variables')
const {userlogin}=require('./../services/auth')
router.get(userloginPath, async (req, res) => {  
	var response=userlogin(req,res);
	})  
module.exports = router;
