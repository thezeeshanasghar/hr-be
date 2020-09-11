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


// var express=require('express');
// var app=express();
// var fs=require('fs');
// var multer = require('multer');
// var upload = multer({ dest: 'uploads/' });
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.raw()); 
// app.use(bodyParser.text()); 
// app.use(bodyParser.urlencoded({
//     extended: true
//  }));

  



// app.use(express.static('public'));


//  app.post('/file_upload', upload.single('file') , function (req, res) {
//      console.log('request',req );
//     console.log('request',req.file.filename);
//      var file = __dirname + "/" + req.file.filename;
//      fs.readFile( req.file.path, function (err, data) {
//        fs.writeFile(file, data, function (err) {
//           if( err ) {
//              console.log( err );
//              } else {
//                 response = {
//                    message:'File uploaded successfully',
//                    filename:req.file.filename
//                 };
//              }
          
//           console.log( response );
//           res.end( JSON.stringify(response) );
//        });
//     });
//  })

// app.get('/search',function(req,res){
//     console.log(req.query);
//     res.end( JSON.stringify( 'search called' ) );

// })

// var server = app.listen(8081, function () {
//     var host = server.address().address
//     var port = server.address().port
    
//     console.log("Example app listening at ", host, port)
//  })