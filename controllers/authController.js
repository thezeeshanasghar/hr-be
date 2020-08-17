const express = require('express')
const router = express.Router()
const { poolPromise } = require('../config/db')
const sql = require('mssql')
const { userloginPath, userdefaultPath } = require('../constant/variables')
const { userlogin,getAllusers } = require('../services/auth')


router.get(userloginPath, async (req, res) => {
	var response = userlogin(req, res);
})
router.get(userdefaultPath, async (req, res) => {
	var response = getAllusers(req, res);
})
module.exports = router;
