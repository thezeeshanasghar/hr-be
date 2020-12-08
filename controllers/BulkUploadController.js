const express = require('express')
const router = express.Router()
const { poolPromise } = require('../config/db')
const sql = require('mssql')
const { BulkUploadPath,FileUpload,PostBulkUploadPath } = require('../constant/variables')
const { BulkUpload ,fileUpload,PostBulkUpload} = require('../services/BulkUpload')

router.post(BulkUploadPath, async (req, res) => {
	var response = BulkUpload(req, res);
})
router.post(FileUpload, async (req, res) => {
	var response = fileUpload(req, res);
})
router.post(PostBulkUploadPath, async (req, res) => {
	PostBulkUpload(req, res);
})

module.exports = router;
