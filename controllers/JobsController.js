const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {JobSecondaryPath,JobByCompany,JobdefaultPath} = require('./../constant/variables')
const {GetAllJobs,GetJobsByCompany,GetJobsById,InsertJobs,DeleteJobs,UpdateJobs} = require('./../services/Jobs')
router.get(JobdefaultPath, async (req, res) => {
	GetAllJobs(req, res);
});
router.get(JobByCompany, async (req, res) => {
	GetJobsByCompany(req, res);
})
router.get(JobSecondaryPath, async (req, res) => {
	GetJobsById(req, res);
})
router.post(JobdefaultPath, async (req, res) => {
	InsertJobs(req, res);
})
router.put(JobSecondaryPath, async (req, res) => {
	UpdateJobs(req, res);
})
router.delete(JobSecondaryPath, async (req, res) => {
	DeleteJobs(req, res);
})
module.exports = router;
