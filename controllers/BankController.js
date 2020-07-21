const express = require('express')
const router = express.Router()
const sql = require('mssql')
const { BankSecondaryPath,defaultPath } = require('./../constant/variables')
const { GetAllBanks, GetBankById,InsertBank,UpdateBank, DeleteBank} = require('./../services/Bank')
router.get(defaultPath, async (req, res) => {
	var response = GetAllBanks(req, res);
});
router.get(BankSecondaryPath, async (req, res) => {
	var response = GetBankById(req, res);
})
router.post(defaultPath, async (req, res) => {
	var response = InsertBank(req, res);
})
router.put(BankSecondaryPath, async (req, res) => {
	var response = UpdateBank(req, res);
})
router.delete(BankSecondaryPath, async (req, res) => {
	var response = DeleteBank(req, res);
})
module.exports = router;
