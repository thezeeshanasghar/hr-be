const express = require('express')
const router = express.Router()
const sql = require('mssql')
const { BankAccByCompany,BankAccSecondaryPath,BankAccdefaultPath} = require('./../constant/variables')
const {GetEmployeeBankAccountById,GeEmployeesBankAccount,GeEmployeesBankAccountByCompany,InsertEmployeeBankAccount,UpdateEmployeeBankAccount,DeleteEmployeeBankAccount} = require('./../services/EmployeeBankAccount')
router.get(BankAccdefaultPath, async (req, res) => {
	GeEmployeesBankAccount(req, res);
});
router.get(BankAccByCompany, async (req, res) => {
	GeEmployeesBankAccountByCompany(req, res);
})
router.get(BankAccSecondaryPath, async (req, res) => {
	GetEmployeeBankAccountById(req, res);
})
router.post(BankAccByCompany, async (req, res) => {
	InsertEmployeeBankAccount(req, res);
})
router.put(ExchangeSecondaryPath, async (req, res) => {
	UpdateEmployeeBankAccount(req, res);
})
router.delete(ExchangeSecondaryPath, async (req, res) => {
	 DeleteEmployeeBankAccount(req, res);
})
module.exports = router;
