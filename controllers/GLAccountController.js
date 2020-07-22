const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {GLAccByCompany,GLAccSecondaryPath,GLAccdefaultPath} = require('./../constant/variables')
const {GetAllGLAccount,GetGLAccountByCompany,GetGLAccountById,InsertGLAccount,UpdateGLAccount,DeleteGLAccount} = require('./../services/GLAccount')
router.get(GLAccdefaultPath, async (req, res) => {
	GetAllGLAccount(req, res);
});
router.get(GLAccByCompany, async (req, res) => {
	GetGLAccountByCompany(req, res);
})
router.get(GLAccSecondaryPath, async (req, res) => {
	GetGLAccountById(req, res);
})
router.post(GLAccdefaultPath, async (req, res) => {
	InsertGLAccount(req, res);
})
router.put(GLAccSecondaryPath, async (req, res) => {
	UpdateGLAccount(req, res);
})
router.delete(GLAccSecondaryPath, async (req, res) => {
	DeleteGLAccount(req, res);
})
module.exports = router;
