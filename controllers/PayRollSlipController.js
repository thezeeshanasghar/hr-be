const express = require('express')
const router = express.Router()
const { poolPromise } = require('../config/db')
const sql = require('mssql')
const { PaySlipDefaultPath,ReversePayroll,specificPayroll,changeStatuspayroll } = require('../constant/variables')
const { GeneratePayroll,GetPayRollSlip,reversePayroll,getSpecificPayroll,changeStatus } = require('../services/PayrollSlip')


router.post(PaySlipDefaultPath, async (req, res) => {
	var response = GeneratePayroll(req, res);
})
router.get(PaySlipDefaultPath, async (req, res) => {
	var response = GetPayRollSlip(req, res);
})
router.post(ReversePayroll, async (req, res) => {
	var response = reversePayroll(req, res);
})
router.get(specificPayroll,async(req,res)=>{
	getSpecificPayroll(req,res);
})
router.get(changeStatuspayroll,async(req,res)=>{
	changeStatus(req,res);
})
module.exports = router;
