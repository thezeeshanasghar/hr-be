const express = require('express')
const router = express.Router()
const sql = require('mssql')
const {EmployeeApplcableLaws, EmployeePayroll,EmployeeByCompany,EmployeeSecondaryPath,EmployeedefaultPath,EmployeeAdvanceDetail,oneTimePayRoll,EmployeeSelective} = require('./../constant/variables')
const {getEmployeeApplcableLaws,GetEmployeePayRoll,GetEmployees,GetEmployeeById,InsertEmployee,UpdateEmployee,DeleteEmployee,GetEmployeesByCompany,GetEmployeeAdvanceDetail,GetEmployeeoneTimePayRoll,
	GetEmployeesSelective} = require('./../services/Employees')
router.get(EmployeedefaultPath, async (req, res) => {
	GetEmployees(req, res);
});
router.get(EmployeeApplcableLaws, async (req, res) => {
	getEmployeeApplcableLaws(req, res);
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
router.get(EmployeeAdvanceDetail, async (req, res) => {
	GetEmployeeAdvanceDetail(req, res);
});
router.get(oneTimePayRoll, async (req, res) => {
	GetEmployeeoneTimePayRoll(req, res);
});
router.get(EmployeeSelective, async (req, res) => {
	GetEmployeesSelective(req, res);
});
module.exports = router;
