const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {UnpaidleavesByCompany,UnpaidleavesSecondaryPath,UnpaidleavesdefaultPath} = require('./../constant/variables')
const {UpdateUserProtection,DeleteUserProtection,GetAllUserProtection,GetUserProtectionByCompany,GetUserProtectionById,InsertUserProtection} = require('./../services/UserProtection')
router.get(UnpaidleavesdefaultPath, async (req, res) => {
	GetAllUserProtection(req, res);
});
router.get(UnpaidleavesByCompany, async (req, res) => {
	GetUserProtectionByCompany(req, res);
})
router.get(UnpaidleavesSecondaryPath, async (req, res) => {
	GetUserProtectionById(req, res);
})
router.post(UnpaidleavesdefaultPath, async (req, res) => {
	InsertUserProtection(req, res);
})
router.put(UnpaidleavesSecondaryPath, async (req, res) => {
	UpdateUserProtection(req, res);
})
router.delete(UnpaidleavesSecondaryPath, async (req, res) => {
	DeleteUserProtection(req, res);
})
module.exports = router;
