const express = require('express')
const router = express.Router()
const sql = require('mssql')
const { CostCenterByCompany,CostCenterSecondaryPath,CostCenterdefaultPath } = require('./../constant/variables')
const { GetAllCostCenter,DeleteCostCenter,GetCostCenterByCompany,GetCostCenterById,InsertCostCenter,UpdateCostCenter} = require('./../services/CostCenter')
router.get(CostCenterdefaultPath, async (req, res) => {
	GetAllCostCenter(req, res);
});
router.get(CostCenterByCompany, async (req, res) => {
	 GetCostCenterByCompany(req, res);
})

router.get(CostCenterSecondaryPath, async (req, res) => {
	GetCostCenterById(req, res);
})
router.post(CostCenterdefaultPath, async (req, res) => {
	 InsertCostCenter(req, res);
})
router.put(CostCenterSecondaryPath, async (req, res) => {
	UpdateCostCenter(req, res);
})
router.delete(CostCenterSecondaryPath, async (req, res) => {
	 DeleteCostCenter(req, res);
})
module.exports = router;
