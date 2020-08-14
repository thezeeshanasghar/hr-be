const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {UnpaidleavesByCompany,UnpaidleavesSecondaryPath,UnpaidleavesdefaultPath} = require('./../constant/variables')
const {InsertunpaidLeaves,UpdateunpaidLeaves,DeleteunpaidLeaves,GetAllunpaidLeaves,GetunpaidLeavesByCompany,GetunpaidLeavesById} = require('./../services/unpaidLeaves')
router.get(UnpaidleavesdefaultPath, async (req, res) => {
	GetAllunpaidLeaves(req, res);
});
router.get(UnpaidleavesByCompany, async (req, res) => {
	GetunpaidLeavesByCompany(req, res);
})
router.get(UnpaidleavesSecondaryPath, async (req, res) => {
	GetunpaidLeavesById(req, res);
})
router.post(UnpaidleavesdefaultPath, async (req, res) => {
	InsertunpaidLeaves(req, res);
})
router.put(UnpaidleavesSecondaryPath, async (req, res) => {
	UpdateunpaidLeaves(req, res);
})
router.delete(UnpaidleavesSecondaryPath, async (req, res) => {
	DeleteunpaidLeaves(req, res);
})
module.exports = router;
