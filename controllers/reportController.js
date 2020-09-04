const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {EmployeeReport,EmployeepayrollReport,EmployeeVarrianceReport} = require('./../constant/variables')
const {GetEmployeeReport,GetEmployeePayrollReport,GetEmployeeVarrianceReport} = require('./../services/Report')
router.get(EmployeeReport, async (req, res) => {
	GetEmployeeReport(req, res);
});
router.get(EmployeepayrollReport, async (req, res) => {
	GetEmployeePayrollReport(req, res);
});
router.get(EmployeeVarrianceReport, async (req, res) => {
	GetEmployeeVarrianceReport(req, res);
});
module.exports = router;
