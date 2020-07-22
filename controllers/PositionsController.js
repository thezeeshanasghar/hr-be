const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {PositionSecondaryPath,PositionByCompany,PositiondefaultPath} = require('./../constant/variables')
const {DeletePositions,GetAllPositions,GetPositionsByCompany,GetPositionsById,InsertPositions,UpdatePositions} = require('./../services/Positions')
router.get(PositiondefaultPath, async (req, res) => {
	GetAllPositions(req, res);
});
router.get(PositionByCompany, async (req, res) => {
	 GetPositionsByCompany(req, res);
})
router.get(PositionSecondaryPath, async (req, res) => {
	GetPositionsById(req, res);
})
router.post(PositiondefaultPath, async (req, res) => {
	InsertPositions(req, res);
})
router.put(PositionSecondaryPath, async (req, res) => {
	UpdatePositions(req, res);
})
router.delete(PositionSecondaryPath, async (req, res) => {
	DeletePositions(req, res);
})
module.exports = router;
