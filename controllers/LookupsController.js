const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {LookupsSecondaryPath} = require('./../constant/variables')
const {GetLookupsById} = require('./../services/Lookups')

router.get(LookupsSecondaryPath, async (req, res) => {
	GetLookupsById(req, res);
})

module.exports = router;
