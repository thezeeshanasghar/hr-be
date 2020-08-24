const express = require('express')
const router = express.Router()
const sql = require('mssql')
const { BankAccByEmployee,BankAccSecondaryPath,BankAccdefaultPath} = require('./../constant/variables')
const {GetEmployeeBankAccountById,GeEmployeesBankAccount,GeEmployeesBankAccountByEmployee,InsertEmployeeBankAccount,UpdateEmployeeBankAccount,DeleteEmployeeBankAccount} = require('./../services/EmployeeBankAccount')
router.get(BankAccdefaultPath, async (req, res) => {
	GeEmployeesBankAccount(req, res);
});
router.get(BankAccByEmployee, async (req, res) => {
	GeEmployeesBankAccountByEmployee(req, res);
})
router.get(BankAccSecondaryPath, async (req, res) => {
	GetEmployeeBankAccountById(req, res);
})
router.post(BankAccdefaultPath, async (req, res) => {
	InsertEmployeeBankAccount(req, res);
})
router.put(BankAccSecondaryPath, async (req, res) => {
	UpdateEmployeeBankAccount(req, res);
})
router.delete(BankAccSecondaryPath, async (req, res) => {
	 DeleteEmployeeBankAccount(req, res);
})
module.exports = router;
