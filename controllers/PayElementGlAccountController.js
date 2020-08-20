const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {PayElementGLAccountdefaultPath,PayElementGLAccountSecondaryPath} = require('./../constant/variables')
const {GetAllPayElementGlAccount,GetPayElementGlAccountById,InsertPayElementGlAccount,DeletePayElementGlAccount,UpdatePayElementGlAccount} = require('./../services/PayElementGlAccount')
router.get(PayElementGLAccountdefaultPath, async (req, res) => {
	GetAllPayElementGlAccount(req, res);
});

router.get(PayElementGLAccountSecondaryPath, async (req, res) => {
	GetPayElementGlAccountById(req, res);
})
router.post(PayElementGLAccountdefaultPath, async (req, res) => {
	InsertPayElementGlAccount(req, res);
})
router.put(PayElementGLAccountSecondaryPath, async (req, res) => {
	UpdatePayElementGlAccount(req, res);
})
router.delete(PayElementGLAccountSecondaryPath, async (req, res) => {
	DeletePayElementGlAccount(req, res);
})
module.exports = router;
