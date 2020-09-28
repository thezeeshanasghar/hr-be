const express = require('express')
const router = express.Router()
const { DashboardPath,CompaniesCountPath,UsersCountPath} = require('../constant/variables')
const { getCompanies,getTotalCompanies,getTotalUseres } = require('../services/dashboard')


router.get(DashboardPath, async (req, res) => {
	getCompanies(req, res);
})

router.get(CompaniesCountPath, async (req, res) => {
	getTotalCompanies(req, res);
})
router.get(UsersCountPath, async (req, res) => {
	getTotalUseres(req, res);
})
module.exports = router;