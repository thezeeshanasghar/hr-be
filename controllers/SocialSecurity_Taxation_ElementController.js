const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {SocialSecurityByCompany,SocialSecuritySecondaryPath,SocialSecuritydefaultPath} = require('./../constant/variables')
const {GetAllSocialSecurity_Taxation_Element,GetSocialSecurity_Taxation_ElementByCompany,GetSocialSecurity_Taxation_ElementById,InsertSocialSecurity_Taxation_Element,UpdateSocialSecurity_Taxation_Element,DeleteSocialSecurity_Taxation_Element} = require('./../services/SocialSecurity_Taxation_Element')
router.get(SocialSecuritydefaultPath, async (req, res) => {
	GetAllSocialSecurity_Taxation_Element(req, res);
});
router.get(SocialSecurityByCompany, async (req, res) => {
	GetSocialSecurity_Taxation_ElementByCompany(req, res);
})
router.get(SocialSecuritySecondaryPath, async (req, res) => {
	GetSocialSecurity_Taxation_ElementById(req, res);
})
router.post(SocialSecuritydefaultPath, async (req, res) => {
	InsertSocialSecurity_Taxation_Element(req, res);
})
router.put(SocialSecuritySecondaryPath, async (req, res) => {
	UpdateSocialSecurity_Taxation_Element(req, res);
})
router.delete(SocialSecuritySecondaryPath, async (req, res) => {
	DeleteSocialSecurity_Taxation_Element(req, res);
})
module.exports = router;
