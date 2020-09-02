const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {EmployeeReport} = require('./../constant/variables')
const {GetEmployeeReport} = require('./../services/Report')
router.get(EmployeeReport, async (req, res) => {
	GetEmployeeReport(req, res);
});
module.exports = router;
