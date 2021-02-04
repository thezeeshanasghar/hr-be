const express = require('express')
const router = express.Router()
const sql = require('mssql')
const { CountryLawdefaultPath,CountryLawSecondaryPath,CountryLawByCompanyPath } = require('./../constant/variables')
const { GetAllCountryLaw,GetCountryLawById,InsertCountryLaw,UpdateCountryLaw,DeleteCountryLaw,GetCountryLawByCountry} = require('./../services/CountryLaw')
router.get(CountryLawdefaultPath, async (req, res) => {
	GetAllCountryLaw(req, res);
});

router.get(CountryLawSecondaryPath, async (req, res) => {
	GetCountryLawById(req, res);
})
router.get(CountryLawByCompanyPath, async (req, res) => {
	GetCountryLawByCountry(req, res);
})
router.post(CountryLawdefaultPath, async (req, res) => {
	InsertCountryLaw(req, res);
})
router.put(CountryLawSecondaryPath, async (req, res) => {
	UpdateCountryLaw(req, res);
})
router.delete(CountryLawSecondaryPath, async (req, res) => {
	DeleteCountryLaw(req, res);
})
module.exports = router;
