const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {UnitByCompany,UnitSecondaryPath,UnitdefaultPath} = require('./../constant/variables')
const {UpdateUnit,DeleteUnit,GetAllUnit,GetUnitByCompany,GetUnitById,InsertUnit} = require('./../services/Unit')
router.get(UnitdefaultPath, async (req, res) => {
	GetAllUnit(req, res);
});
router.get(UnitByCompany, async (req, res) => {
	GetUnitByCompany(req, res);
})
router.get(UnitSecondaryPath, async (req, res) => {
	GetUnitById(req, res);
})
router.post(UnitdefaultPath, async (req, res) => {
	InsertUnit(req, res);
})
router.put(UnitSecondaryPath, async (req, res) => {
	UpdateUnit(req, res);
})
router.delete(UnitSecondaryPath, async (req, res) => {
	DeleteUnit(req, res);
})
module.exports = router;
