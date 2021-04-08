const express = require('express')
const router = express.Router()
const {EmployeeReport,EmployeepayrollReport,EmployeeVarrianceReport,EmployeeVarrianceindvReport,GTNReport,downloadPath,GLReport,PaySlip,PaymentDetailReport} = require('./../constant/variables')
const {GetEmployeeReport,GetEmployeePayrollReport,GetEmployeeVarrianceReport,getIndvVarriancereport,GetGTNReport,download,GetGLReport,GeneratePaySlip,GetPaymentDetails} = require('./../services/Report')
router.post(EmployeeReport, async (req, res) => {
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
router.post(GTNReport, async (req, res) => {
	GetGTNReport(req, res);
});
router.post(GLReport, async (req, res) => {
	GetGLReport(req, res);
});

router.get(downloadPath, async (req, res) => {
	download(req, res);
});
router.get(PaySlip, async (req, res) => {
	GeneratePaySlip(req, res);
});
router.get(PaymentDetailReport, async (req, res) => {
	GetPaymentDetails(req, res);
});


module.exports = router;
