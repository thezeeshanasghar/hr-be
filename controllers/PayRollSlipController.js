const express = require('express')
const router = express.Router()
const { poolPromise } = require('../config/db')
const sql = require('mssql')
const { PaySlipDefaultPath } = require('../constant/variables')
const { GeneratePayroll,GetPayRollSlip } = require('../services/PayrollSlip')


router.post(PaySlipDefaultPath, async (req, res) => {
	var response = GeneratePayroll(req, res);
})
router.get(PaySlipDefaultPath, async (req, res) => {
	var response = GetPayRollSlip(req, res);
})
module.exports = router;
