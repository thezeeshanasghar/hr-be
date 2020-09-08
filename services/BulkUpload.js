var exceltojson = require("xlsx-to-json-lc");
const { message } = require('../constant/variables');

const BulkUpload = async (req, res) => {
	try {
		// var response = xlsxConvert();
		exceltojson({
			input:  "D://Multikart.xlsx",
			output: "output.json",
			// sheet: "Sheet1",  // specific sheetname inside excel file (if you have multiple sheets)
			lowerCaseHeaders:true
		  }, function(err, result) {
			if(err) {
				return err;
			} else {
				
				res.send(result);
			}
		  });
		return ;
	} catch (err) {
		res.status(500)
		res.send(message.error)
	
	}
}
module.exports = { BulkUpload };