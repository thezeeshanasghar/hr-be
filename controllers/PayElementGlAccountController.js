const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {GLAccdefaultPath,GLAccSecondaryPath} = require('./../constant/variables')
const {GetAllPayElementGlAccount,GetPayElementGlAccountById,InsertPayElementGlAccount,DeletePayElementGlAccount,UpdatePayElementGlAccount} = require('./../services/PayElementGlAccount')
router.get(GLAccdefaultPath, async (req, res) => {
	GetAllPayElementGlAccount(req, res);
});

router.get(GLAccSecondaryPath, async (req, res) => {
	GetPayElementGlAccountById(req, res);
})
router.post(GLAccdefaultPath, async (req, res) => {
	InsertPayElementGlAccount(req, res);
})
router.put(GLAccSecondaryPath, async (req, res) => {
	UpdatePayElementGlAccount(req, res);
})
router.delete(GLAccSecondaryPath, async (req, res) => {
	DeletePayElementGlAccount(req, res);
})
module.exports = router;
