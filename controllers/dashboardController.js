const express = require('express')
const router = express.Router()
const { DashboardPath} = require('../constant/variables')
const { getDashboard } = require('../services/dashboard')


router.get(DashboardPath, async (req, res) => {
	getDashboard(req, res);
})