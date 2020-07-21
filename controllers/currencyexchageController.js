const express = require('express')
const router = express.Router()
const sql = require('mssql')
const { ExchangeByCurrency,ExchangeSecondaryPath,ExchangedefaultPath } = require('./../constant/variables')
const { GetAllCurrencyExchange,GetCurrencyExchangeByCurrency,GetCurrencyExchangeById,InsertCurrencyExchange,UpdateCurrencyExchage,DeleteCurrencyExchange} = require('./../services/CurrencyExchange')
router.get(ExchangedefaultPath, async (req, res) => {
	GetAllCurrencyExchange(req, res);
});
router.get(ExchangeByCurrency, async (req, res) => {
	GetCurrencyExchangeByCurrency(req, res);
})
router.get(ExchangeSecondaryPath, async (req, res) => {
	GetCurrencyExchangeById(req, res);
})
router.post(ExchangedefaultPath, async (req, res) => {
	 InsertCurrencyExchange(req, res);
})
router.put(ExchangeSecondaryPath, async (req, res) => {
	UpdateCurrencyExchage(req, res);
})
router.delete(ExchangeSecondaryPath, async (req, res) => {
	 DeleteCurrencyExchange(req, res);
})
module.exports = router;
