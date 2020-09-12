var exceltojson = require("xlsx-to-json-lc");
const { message } = require('../constant/variables');
var fs = require('fs');
var multer = require('multer');
var path = require("path");

const { poolPromise } = require('../config/db');
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
				return err;
			} else {
				SaveRecord(result, req.body.Type);
			}
			res.send(result.length.toString());
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

const SaveRecord = async (result, Type) => {

	//Send To DB
	var query = "";

	var obj = result;
	for (var i = 0; i < obj.length; i++) {

		switch (Type) {
			case 'Bank':
				query = `
							declare @Count int = 0;
							   select @Count=COUNT(*) from [dbo].[Bank] where [BranchCode] = '`+ obj[i].branchcode + `'
							   if(@Count = 0)
							   begin
									   INSERT INTO [dbo].[Bank]
									   (BankName, Address, BranchCode)
									   VALUES
									   ('`+ obj[i].bankname + `','` + obj[i].address + `','` + obj[i].branchcode + `');
							   end
							   else
							   begin 
									   UPDATE  [dbo].[Bank]
									   SET
									   BankName = '`+ obj[i].bankname + `',
									   Address = '`+ obj[i].address + `'
									   WHERE
									   BranchCode = '`+ obj[i].branchcode + `';
									   
		   
							   end
							   `;
				break;
			default:

				break;

		}
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					return res.status(500).json(err)
				}
				else {
					var response = profileset.recordset;

				}

			});
	}
}
module.exports = { BulkUpload, fileUpload };
