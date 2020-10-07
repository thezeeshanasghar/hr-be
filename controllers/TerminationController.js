const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {TerminationPrimaryPath,TerminationSecondaryPath} = require('./../constant/variables')
const {getEmployeeTerminationById,GetEmployeeTermination,InsertEmployeeTermination,UpdateEmployeeTermination,DeleteEmployeeTermination} = require('./../services/EmployeeTermination')
router.get(TerminationSecondaryPath, async (req, res) => {
	getEmployeeTerminationById(req, res);
});
router.get(TerminationPrimaryPath, async (req, res) => {
	GetEmployeeTermination(req, res);
})
router.post(TerminationPrimaryPath, async (req, res) => {
	InsertEmployeeTermination(req, res);
})
router.put(TerminationSecondaryPath, async (req, res) => {
	UpdateEmployeeTermination(req, res);
})
router.delete(TerminationSecondaryPath, async (req, res) => {
	DeleteEmployeeTermination(req, res);
})
module.exports = router;
