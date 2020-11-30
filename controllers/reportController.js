const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {EmployeeReport,EmployeepayrollReport,EmployeeVarrianceReport,EmployeeVarrianceindvReport} = require('./../constant/variables')
const {GetEmployeeReport,GetEmployeePayrollReport,GetEmployeeVarrianceReport,getIndvVarriancereport} = require('./../services/Report')
router.get(EmployeeReport, async (req, res) => {
	GetEmployeeReport(req, res);
});
router.get(EmployeepayrollReport, async (req, res) => {
	GetEmployeePayrollReport(req, res);
});
router.post(EmployeeVarrianceReport, async (req, res) => {
	GetEmployeeVarrianceReport(req, res);
});
router.post(EmployeeVarrianceindvReport, async (req, res) => {
	getIndvVarriancereport(req, res);
});
module.exports = router;
