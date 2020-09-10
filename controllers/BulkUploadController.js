const express = require('express')
const router = express.Router()
const { poolPromise } = require('../config/db')
const sql = require('mssql')
const { BulkUploadPath } = require('../constant/variables')
const { BulkUpload } = require('../services/BulkUpload')

router.post(BulkUploadPath, async (req, res) => {
	var response = BulkUpload(req, res);
})

module.exports = router;
