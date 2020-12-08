var exceltojson = require("xlsx-to-json-lc");
// var exceltojson= require("xls-to-json");
const { message } = require('../constant/variables');
var fs = require('fs');
var multer = require('multer');
var path = require("path");

const { poolPromise,sql } = require('../config/db');
const { type } = require("os");
const BulkUpload = async (req, res) => {
	try {
		// var response = xlsxConvert();
		exceltojson({
			input: req.body.Path,
			output: "output.json",
			// sheet: "Sheet1",  // specific sheetname inside excel file (if you have multiple sheets)
			lowerCaseHeaders: true
		}, function (err, result) {
			if (err) {
				res.status(500)
				res.send(err)
				return;
			} else {
				//SaveRecord(result, req.body.Type,req.body.Company);
			}
			res.send(result);
			res.status(200);
			return;
		});
		return;
	} catch (err) {
		res.status(500)
		res.send(err)
		return;
	}
}

const fileUpload = async (req, res) => {
	var date = Date.now();
	var FilePath = "";
	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'public')
		},
		filename: function (req, file, cb) {
			FilePath = date + '-' + file.originalname;
			cb(null, date + '-' + file.originalname)
		}
	})
	var upload = multer({ storage: storage }).single('file')
	upload(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err)
		} else if (err) {
			return res.status(500).json(err)
		}
		return res.status(200).send(path.resolve('./public/' + FilePath))

	})
}


const PostBulkUpload = async (req, res) => {
	console.log(req.body);
	try {
		const pool = await poolPromise
		const result = await pool.request()
			.input("CompanyId", sql.BIGINT, req.body.Company)
			.input("Type", sql.VARCHAR(500), req.body.Type)
			.input("Data", sql.Text, req.body.Data)
			
			.execute("[dbo].[BulkUpload]").then(function (recordSet) {
			
					var response = recordSet;
					res.send(response);
					return;
				
				//  return ;
			})
	} catch (err) {
		res.status(400).json({ message: err.message })
		res.send(err.message)
		// return "error";
	}
}
module.exports = { BulkUpload, fileUpload,PostBulkUpload };
