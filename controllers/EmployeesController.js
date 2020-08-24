const express = require('express')
const router = express.Router()
const sql = require('mssql')
const { EmployeePayroll,EmployeeByCompany,EmployeeSecondaryPath,EmployeedefaultPath} = require('./../constant/variables')
const {GetEmployeePayRoll,GetEmployees,GetEmployeeById,InsertEmployee,UpdateEmployee,DeleteEmployee,GetEmployeesByCompany} = require('./../services/Employees')
router.get(EmployeedefaultPath, async (req, res) => {
	GetEmployees(req, res);
});
router.get(EmployeeByCompany, async (req, res) => {
	GetEmployeesByCompany(req, res);
})
router.get(EmployeePayroll, async (req, res) => {
	GetEmployeePayRoll(req, res);
})
router.get(EmployeeSecondaryPath, async (req, res) => {
	GetEmployeeById(req, res);
})
router.post(EmployeedefaultPath, async (req, res) => {
	InsertEmployee(req, res);
})
router.put(EmployeeSecondaryPath, async (req, res) => {
	UpdateEmployee(req, res);
})
router.delete(EmployeeSecondaryPath, async (req, res) => {
	DeleteEmployee(req, res);
})
module.exports = router;
