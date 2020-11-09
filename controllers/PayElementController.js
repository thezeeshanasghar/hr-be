const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {PayElementByCompany,PayElementSecondaryPath,PayElementdefaultPath,PayElementSelectivePath} = require('./../constant/variables')
const {GetAllPayElement,GetPayElementById,InsertPayElement,GetPayElementByCompany,UpdatePayElement,DeletePayElement,GetSelectivePayElementById} = require('./../services/PayElement')
router.get(PayElementdefaultPath, async (req, res) => {
	GetAllPayElement(req, res);
});
router.get(PayElementByCompany, async (req, res) => {
	GetPayElementByCompany(req, res);
})
router.get(PayElementSecondaryPath, async (req, res) => {
	GetPayElementById(req, res);
})
router.post(PayElementdefaultPath, async (req, res) => {
	InsertPayElement(req, res);
})
router.put(PayElementSecondaryPath, async (req, res) => {
	UpdatePayElement(req, res);
})
router.delete(PayElementSecondaryPath, async (req, res) => {
	DeletePayElement(req, res);
})
router.get(PayElementSelectivePath, async (req, res) => {
	GetSelectivePayElementById(req, res);
})
module.exports = router;
