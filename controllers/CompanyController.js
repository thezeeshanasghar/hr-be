const express = require('express')
const router = express.Router()
const sql = require('mssql')
const { CompanySecondaryPath,CompanydefaultPath,CompanySelectivePath } = require('./../constant/variables')
const { GetAllCompanies, GetCompanyById,InsertCompany,UpdateCompany, DeleteCompany,GetSelectiveComponies} = require('./../services/Company')
router.get(CompanydefaultPath, async (req, res) => {
	 GetAllCompanies(req, res);
});
router.get(CompanySecondaryPath, async (req, res) => {
	GetCompanyById(req, res);
})
router.post(CompanydefaultPath, async (req, res) => {
	 InsertCompany(req, res);
})
router.put(CompanySecondaryPath, async (req, res) => {
	 UpdateCompany(req, res);
})
router.delete(CompanySecondaryPath, async (req, res) => {
	 DeleteCompany(req, res);
})
router.get(CompanySelectivePath,async(req,res)=>{
	GetSelectiveComponies(req,res);
})
module.exports = router;
