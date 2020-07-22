const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {userProtectionByCompany,userProtectionSecondaryPath,userProtectiondefaultPath} = require('./../constant/variables')
const {InsertunpaidLeaves,UpdateunpaidLeaves,DeleteunpaidLeaves,GetAllunpaidLeaves,GetunpaidLeavesByCompany,GetunpaidLeavesById} = require('./../services/unpaidLeaves')
router.get(userProtectiondefaultPath, async (req, res) => {
	GetAllunpaidLeaves(req, res);
});
router.get(userProtectionByCompany, async (req, res) => {
	GetunpaidLeavesByCompany(req, res);
})
router.get(userProtectionSecondaryPath, async (req, res) => {
	GetunpaidLeavesById(req, res);
})
router.post(userProtectiondefaultPath, async (req, res) => {
	InsertunpaidLeaves(req, res);
})
router.put(userProtectionSecondaryPath, async (req, res) => {
	UpdateunpaidLeaves(req, res);
})
router.delete(userProtectionSecondaryPath, async (req, res) => {
	DeleteunpaidLeaves(req, res);
})
module.exports = router;
