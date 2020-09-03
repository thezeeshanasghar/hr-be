const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {EmployeeReport,EmployeepayrollReport} = require('./../constant/variables')
const {GetEmployeeReport,GetEmployeePayrollReport} = require('./../services/Report')
router.get(EmployeeReport, async (req, res) => {
	GetEmployeeReport(req, res);
});
router.get(EmployeepayrollReport, async (req, res) => {
	GetEmployeePayrollReport(req, res);
});
module.exports = router;
