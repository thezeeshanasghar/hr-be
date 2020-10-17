const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {userProtectionByCompany,userProtectionSecondaryPath,userProtectiondefaultPath} = require('./../constant/variables')
const {UpdateUserProtection,DeleteUserProtection,GetAllUserProtection,GetUserProtectionByCompany,GetUserProtectionById,InsertUserProtection} = require('./../services/UserProtection')
router.get(userProtectiondefaultPath, async (req, res) => {
	GetAllUserProtection(req, res);
});
router.get(userProtectionByCompany, async (req, res) => {
	GetUserProtectionByCompany(req, res);
})
router.get(userProtectionSecondaryPath, async (req, res) => {
	GetUserProtectionById(req, res);
})
router.post(userProtectiondefaultPath, async (req, res) => {
	InsertUserProtection(req, res);
})
router.put(userProtectionSecondaryPath, async (req, res) => {
	UpdateUserProtection(req, res);
})
router.delete(userProtectionSecondaryPath, async (req, res) => {
	DeleteUserProtection(req, res);
})
module.exports = router;
