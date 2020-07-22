const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {GradesByCompany,GradesSecondaryPath,GradesdefaultPath} = require('./../constant/variables')
const {GetAllGrades,GetGradeByCompany,GetGradeById,InsertGrade,UpdateGrade,DeleteGrade} = require('./../services/Grade')
router.get(GradesdefaultPath, async (req, res) => {
	GetAllGrades(req, res);
});
router.get(GradesByCompany, async (req, res) => {
	GetGradeByCompany(req, res);
})
router.get(GradesSecondaryPath, async (req, res) => {
	GetGradeById(req, res);
})
router.post(GradesdefaultPath, async (req, res) => {
	InsertGrade(req, res);
})
router.put(GradesSecondaryPath, async (req, res) => {
	UpdateGrade(req, res);
})
router.delete(GradesSecondaryPath, async (req, res) => {
	DeleteGrade(req, res);
})
module.exports = router;
