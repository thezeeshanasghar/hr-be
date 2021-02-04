const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {ApplicableLawSecondaryPath,ApplicableLawByCompany,ApplicablelawdefaultPath} = require('./../constant/variables')
const {GetAllApplicableLaws,GetApplicableLawsByCompany,GetApplicableById,InsertApplicableLaw,UpdateApplicableLaw,DeleteApplicableLaw} = require('./../services/ApplicableLaws')
router.get(ApplicablelawdefaultPath, async (req, res) => {
	GetAllApplicableLaws(req, res);
});
router.get(ApplicableLawByCompany, async (req, res) => {
	GetApplicableLawsByCompany(req, res);
})
router.get(ApplicableLawSecondaryPath, async (req, res) => {
	GetApplicableById(req, res);
})
router.post(ApplicablelawdefaultPath, async (req, res) => {
	InsertApplicableLaw(req, res);
})
router.put(ApplicableLawSecondaryPath, async (req, res) => {
	UpdateApplicableLaw(req, res);
})
router.delete(ApplicableLawSecondaryPath, async (req, res) => {
	DeleteApplicableLaw(req, res);
})
module.exports = router;
