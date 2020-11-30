const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {taxableByCompany,taxableSecondaryPath,taxabledefaultPath} = require('./../constant/variables')
const {InsertTaxableElement,getTaxableElementById,deleteTaxableElements,gettaxablelawsbyCompany,gettaxableElements,updateTaxableElements} = require('./../services/taxable_Elements')
router.get(taxabledefaultPath, async (req, res) => {
	gettaxableElements(req, res);
});
router.get(taxableByCompany, async (req, res) => {
	gettaxablelawsbyCompany(req, res);
});
router.get(taxableSecondaryPath, async (req, res) => {
	getTaxableElementById(req, res);
});
router.post(taxabledefaultPath, async (req, res) => {
	InsertTaxableElement(req, res);
});
router.put(taxableSecondaryPath, async (req, res) => {
	updateTaxableElements(req, res);
});
router.delete(taxableSecondaryPath, async (req, res) => {
	deleteTaxableElements(req, res);
});
module.exports = router;
