const {
	message
} = require('../constant/variables');
const {
	sql,
	poolPromise
} = require('../config/db');
const {
	MAX
} = require('mssql');
var excel = require('excel4node');
var dateFormat = require('dateformat');
var path = require('path');
var mime = require('mime');
var fs = require('fs');
const {
	pageOrder
} = require('excel4node/distribution/lib/types');
const PDFDocument = require('pdfkit');
const Email = require("../helpers/Email")
var nodemailer = require('nodemailer');
var PaymentDetail=require("../models/PaymentDetail")
function Report(response) {
	console.log(response);

	return "/" + Path;
}

const GetPaymentDetails = async (req, res) => {
	try {
		console.log(res);
		var query =`
		SELECT [myuser].[PaymentDetail].*,pay.Description,CONCAT([dbo].[Employees].FirstName,' ',[dbo].[Employees].LastName) As Name FROM [myuser].[PaymentDetail]
INNER JOIN [dbo].[PayElement] pay ON pay.Id=[myuser].[PaymentDetail].PayElementId
INNER JOIN [dbo].[Employees] ON [dbo].[Employees].Id=[myuser].[PaymentDetail].EmployeeId 
WHERE PayRollCode='`+req.params.GroupName+`' AND [myuser].[PaymentDetail].EmployeeId='`+req.params.EmployeeId+`'

Select [myuser].[TaxationDetail].*,law.Detail from [myuser].[TaxationDetail]
INNER JOIN [dbo].[CountryLaws] law On law.Id=[myuser].[TaxationDetail].LawId
where GroupCode='`+req.params.GroupName+`'AND EmployeeId='`+req.params.EmployeeId+`'
		`
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					res.status(500)
					res.send(message.error)
					return "error";
				}
				else {
					var response =PaymentDetail(profileset.recordsets) ;
					
					res.send(response);
					return ;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}

const PdfCreater = async function (resp) {
	var Entitlement = 0,
		Deduction = 0;
	var EntitlementList = [];
	var DeductionList = [];
	for (var i = 0; i < resp.length; i++) {
		if (resp[i].amount > 0) {
			Entitlement += resp[i].amount;
			EntitlementList.push(resp[i])
		} else {
			Deduction += resp[i].amount;
			DeductionList.push(resp[i]);
		}
	}

	// Create a document
	const doc = new PDFDocument();

	// Pipe its output somewhere, like to a file or HTTP response
	// See below for browser usage
	doc.pipe(fs.createWriteStream('PaySlip.pdf'));


	doc
		.fillColor('black')
		.text('EMPLOYEE PAYSLIP', 250, 5)


	doc.rect(5, 90, 150, 100).fillAndStroke('#ddd', '#000');
	doc.fill('#000').stroke();
	doc.fontSize(10);
	doc.text("Employer", 8, 100, {
		lineBreak: false
	});
	doc.text("Employer Address", 8, 120, {
		lineBreak: false
	});
	doc.text("Country", 8, 140, {
		lineBreak: false
	});
	doc.text("Pay Period", 8, 160, {
		lineBreak: false
	});

	doc.rect(150, 90, 200, 100).fillAndStroke('#FFFFFF', '#000');
	doc.fill('#000').stroke();
	doc.fontSize(8);
	doc.text(resp[0].CompanyName, 158, 100, {
		lineBreak: false
	});
	doc.text(resp[0].Address, 158, 120, {
		lineBreak: false
	});
	doc.text(resp[0].Country, 158, 140, {
		lineBreak: false
	});
	doc.text(resp[0].Paidon, 158, 160, {
		lineBreak: false
	});

	//******************************************************* */
	doc.rect(5, 200, 120, 60).fillAndStroke('#ddd', '#000');
	doc.fill('#000').stroke();
	doc.fontSize(10);
	doc.text("Employee Name", 8, 210, {
		lineBreak: false
	});
	doc.text("Client Empl. ID ", 8, 230, {
		lineBreak: false
	});


	doc.rect(120, 200, 200, 60).fillAndStroke('#FFFFFF', '#000');
	doc.fill('#000').stroke();
	doc.fontSize(8);
	doc.text(resp[0].EmployeeName, 158, 210, {
		lineBreak: false
	});
	doc.text(resp[0].EmployeeCode, 158, 230, {
		lineBreak: false
	});

	doc.rect(320, 200, 120, 60).fillAndStroke('#ddd', '#000');
	doc.fill('#000').stroke();
	doc.fontSize(10);
	doc.text("Email ID", 325, 210, {
		lineBreak: false
	});
	doc.text("Hire Date", 325, 230, {
		lineBreak: false
	});
	// doc.text("Client Empl. ID ", 325, 250, {lineBreak: false} );


	doc.rect(400, 200, 200, 60).fillAndStroke('#FFFFFF', '#000');
	doc.fill('#000').stroke();
	doc.fontSize(8);
	doc.text(resp[0].Email, 405, 210, {
		lineBreak: false
	});
	doc.text(resp[0].HireDate, 405, 230, {
		lineBreak: false
	});
	// doc.text("Employer Address", 405, 250, {lineBreak: false} );

	/**************************************************************/
	doc.rect(5, 280, 600, 30).fillAndStroke('#ddd', '#000');
	doc.fill('#000').stroke();
	doc.fontSize(10);
	doc.text('Summary', 250, 285)

	/***************/

	doc.rect(5, 310, 600, 30).fillAndStroke('#ddd', '#000');
	doc.fill('#000').stroke();
	doc.fontSize(10);
	doc.text('Pay Currency', 5, 330)
	doc.text('Entitlements', 105, 330)
	doc.text('Deductions', 205, 330)
	doc.text('Net Pay', 305, 330)
	doc.text('Bank Account/Currency', 405, 330)

	doc.rect(5, 340, 600, 30).fillAndStroke('#FFFFFF', '#000');
	doc.fill('#000').stroke();
	doc.fontSize(10);
	doc.text(resp[0].AccCurrency, 5, 355)
	doc.text(Entitlement, 105, 355)
	doc.text(Deduction, 205, 355)
	doc.text(resp[0].Payables, 305, 355)
	doc.text(resp[0].IBAN, 405, 355)
	/*********************/
	doc.rect(5, 390, 600, 30).fillAndStroke('#ddd', '#000');
	doc.fill('#000').stroke();
	doc.fontSize(10);
	doc.text('Details', 250, 390)

	doc.rect(5, 410, 600, 30).fillAndStroke('#ddd', '#000');
	doc.fill('#000').stroke();
	doc.fontSize(10);
	doc.text('Entitlements', 8, 430)
	doc.text('Amount', 150, 430)
	doc.text('Currency', 190, 430)
	doc.text('Deductions', 280, 430)
	doc.text('Amount', 430, 430)
	doc.text('Currency', 470, 430)

	doc.fontSize(10);


	for (var i = 0; i < EntitlementList.length; i++) {
		// doc.rect(5, 410, 600, 30).fillAndStroke('#FFFFFF', '#000');
		// doc.fill('#000').stroke();

		doc.text(EntitlementList[i].Description, 8, 440 + ((i + 1) * 30))
		doc.text(EntitlementList[i].amount, 150, 440 + ((i + 1) * 30))
		doc.text(EntitlementList[i].AccCurrency, 190, 440 + ((i + 1) * 30))

	}

	for (var i = 0; i < DeductionList.length; i++) {
		doc.text(DeductionList[i].Description, 280, 440 + ((i + 1) * 30))
		doc.text(DeductionList[i].amount, 430, 440 + ((i + 1) * 30))
		doc.text(DeductionList[i].AccCurrency, 470, 440 + ((i + 1) * 30))
	}


	/**************************************************************/
	doc.rect(5, 440 + (30 * 6), 600, 30).fillAndStroke('#ddd', '#000');
	doc.fill('#000').stroke();
	doc.fontSize(10);
	doc.text('Banking Details', 250, 440 + (30 * 6))

	/***************/

	doc.rect(5, 440 + (30 * 7), 600, 30).fillAndStroke('#ddd', '#000');
	doc.fill('#000').stroke();
	doc.fontSize(10);
	doc.text('Bank Name', 5, 445 + (30 * 7))
	doc.text('Beneficiary Name', 105, 445 + (30 * 7))
	doc.text('Acc. Number', 205, 445 + (30 * 7))
	doc.text('Account Currency', 305, 445 + (30 * 7))
	// doc.text('Bank Account/Currency', 405, 445+(30*7))

	doc.rect(5, 440 + (30 * 8), 600, 30).fillAndStroke('#FFFFFF', '#000');
	doc.fill('#000').stroke();
	doc.fontSize(10);
	doc.text(resp[i].BankName, 5, 445 + (30 * 8))
	doc.text(resp[i].EmployeeName, 105, 445 + (30 * 8))
	doc.text(resp[i].IBAN, 205, 445 + (30 * 8))
	doc.text(resp[i].AccCurrency, 345, 445 + (30 * 8))
	// doc.text('Bank Account/Currency', 405, 445+(30*8))
	/*********************/

	// Finalize PDF file
	doc.end();

}

const download = async (req, res) => {
	var file = path.join(".", "./") + '/public/' + req.params.Path;
	console.log(file);
	var filename = path.basename(file);
	var mimetype = mime.lookup(file);

	res.setHeader('Content-disposition', 'attachment; filename=' + filename);
	res.setHeader('Content-type', mimetype);

	var filestream = fs.createReadStream(file);
	filestream.pipe(res);
}
const GeneratePaySlip = async (req, res) => {

	try {

		var query = `
		select Salary.EmployeeId,
Salary.Payables,
Salary.Taxdeduction,
FORMAT(Salary.Paidon,'MMM-yyyy') AS Paidon,
PAYMENT.amount,
PAYMENT.PayElementId,Salary.CompanyId,COMPANY.CompanyName,COMPANY.Address,PAYELE.Description,
 CONCAT(EMP.FirstName,' ',EMP.LastName) AS EmployeeName,EMP.EmployeeCode,EMP.Email,FORMAT(EMP.HireDate,'dd/MMM/yyyy') AS HireDate,
 ACC.IBAN,BANK.BankName,
 (SELECT Name FROM [myuser].[LookupItems] WHERE Id=ACC.CurrencyCode) AS AccCurrency,
 (SELECT Name FROM [myuser].[LookupItems] WHERE Id=COMPANYACC.CurrencyId) AS CompanyAccCurrency,
 (SELECT Name FROM [myuser].[LookupItems] WHERE Id=COMPANY.CountryCode) AS Country
from [myuser].[SalaryPayRoll] Salary
INNER JOIN
[myuser].[PaymentDetail] PAYMENT ON PAYMENT.PayRollCode=Salary.PayGroup AND PAYMENT.EmployeeId=Salary.EmployeeId
LEFT JOIN
[dbo].[Company] COMPANY ON COMPANY.Id=Salary.CompanyId
LEFT JOIN  [dbo].[PayElement] PAYELE ON PAYELE.Id=PAYMENT.PayElementId
LEFT JOIN
[dbo].[Employees] EMP ON EMP.Id=Salary.EmployeeId
LEFT JOIN [dbo].[EmployeeBankAccount] ACC ON ACC.EmployeeId=EMP.Id
LEFT JOIN [dbo].[Bank] BANK ON BANK.Id=ACC.BankId
LEFT JOIN [dbo].[CompanyBankAccounts] COMPANYACC ON COMPANYACC.CompanyId=COMPANY.Id
WHERE Salary.Id='` + req.params.Id + `'
		`
		console.log(query)
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, async function (err, profileset) {
				if (err) {
					res.status(500)
					res.send(message.error)
					return "error";
				} else {
					await PdfCreater(profileset.recordset);


					let transporter = nodemailer.createTransport({
						host: "webmail.hrsolutionhouse.com",
						port: 25,
						secure: false, // true for 465, false for other ports

						auth: {
							user: 'employee.payslips@hrsolutionhouse.com',
							pass: 'n7xjAw4r&A4dNdjz'
						},
						tls: {
							rejectUnauthorized: false
						}
					});


					// fs.readFile("./PaySlip.pdf",  function (err, data) {
				await transporter.sendMail({
						from: 'employee.payslips@hrsolutionhouse.com',
						to: profileset.recordset[0].Email,
						subject: 'Payslip!',
						text: 'PaySlip of Month '+ profileset.recordset[0].Paidon,
						attachments: [{
							'filename': 'PaySlip.pdf',
							path: "./PaySlip.pdf"
						}]
					}).catch(e => {
						console.log(e);
						res.status(500)
						res.send(e)
						return "error";
					})

					res.status(200)
					res.send();
					return "error";
					// });

				}
			});
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}

}

const GetGLReport = async (req, res) => {

	try {

		var query = `
	
		DECLARE @FirstDate DATE,@LastDate DATE;
		select @FirstDate=DATEADD(MONTH, DATEDIFF(MONTH, 0,'` + req.body.Date + `' ), 0) 
		select @LastDate=DATEADD(MONTH, DATEDIFF(MONTH, -1,'` + req.body.Date + `' ), -1)

select distinct PAY.Id, GL.Account AS GLAccount,GL.Description AS GlDescription,
COST.Code AS CostCode,COST.Description AS CostDescription,PAY.Code AS ElementCode,PAY.Description As ElementDescription,

( SELECT  SUM(amount) FROM [myuser].[SalaryPayRoll]  LEFT JOIN 
  [myuser].[PaymentDetail] ON [myuser].[PaymentDetail].PayRollCode= PayGroup  
  AND [myuser].[PaymentDetail].EmployeeId=[myuser].[SalaryPayRoll].EmployeeId
WHERE PayElementId=Detail.PayElementId AND CompanyId='` + req.body.CompanyId + `' AND  Paidon>=@FirstDate AND Paidon <=@LastDate

) AS amount
FROM  [myuser].[SalaryPayRoll] PAYROLL
INNER JOIN
[myuser].[PaymentDetail] Detail ON PayRollCode=PAYROLL.PayGroup
INNER JOIN
 [dbo].[PayElement] PAY ON PAY.Id=Detail.PayElementId
 LEFT JOIN 
[dbo].[PayElementGlAccount] PAYGL ON PAYGL.PayElementId=PAY.Id
LEFT JOIN
[dbo].[GLAccount] GL ON GL.Id=GLAccountId
LEFT JOIN
 [dbo].[CostCenter] COST ON COST.Id=PAYGL.CostCenterId
 WHERE PAYROLL.CompanyId='` + req.body.CompanyId + `' AND PAYROLL.Paidon>=@FirstDate AND PAYROLL.Paidon <=@LastDate

		`
		console.log(query)
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					res.status(500)
					res.send(message.error)
					return "error";
				} else {
					var response = {
						data: profileset.recordset
					};
					console.log(response)
					if (response.data.length == 0) {
						res.status(500)
						res.send("No Record")
						return "error";
					}
					/**********************************************/
					var workbook = new excel.Workbook();
					var worksheet = workbook.addWorksheet('GL Report');

					var style = workbook.createStyle({
						font: {
							color: '#000000',
							size: 14,
							bold: true
						},
						fill: {
							type: 'pattern',
							patternType: 'solid',
							bgColor: '#DAEEF3',
							fgColor: '#DAEEF3'
						},
						alignment: {
							shrinkToFit: true,
							wrapText: true
						},
						border: { // §18.8.4 border (Border)
							left: {
								style: "thin", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
								color: "#080808" // HTML style hex value
							},
							right: {
								style: "thin",
								color: "#080808"
							},
							top: {
								style: "thin",
								color: "#080808"
							},
							bottom: {
								style: "thin",
								color: "#080808"
							}
						}

					});

					var style1 = workbook.createStyle({
						font: {
							color: '#000000',
							size: 12
						},
						fill: {
							type: 'pattern',
							patternType: 'solid',
							bgColor: '#DAEEF3',
							fgColor: '#DAEEF3'
						},
						alignment: {
							shrinkToFit: true,
							wrapText: true
						},
						border: { // §18.8.4 border (Border)
							left: {
								style: "thin", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
								color: "#080808" // HTML style hex value
							},
							right: {
								style: "thin",
								color: "#080808"
							},
							top: {
								style: "thin",
								color: "#080808"
							},
							bottom: {
								style: "thin",
								color: "#080808"
							}
						}

					});

					var datetime = Date.now();
					var Path = 'public/' + datetime + '.xlsx';


					worksheet.column(1).setWidth(30);
					worksheet.column(2).setWidth(30);
					worksheet.column(3).setWidth(30);
					worksheet.column(4).setWidth(30);
					worksheet.column(5).setWidth(30);
					worksheet.column(6).setWidth(30);
					worksheet.column(7).setWidth(30);
					worksheet.column(8).setWidth(30);
					worksheet.column(9).setWidth(30);
					worksheet.column(10).setWidth(30);
					worksheet.column(11).setWidth(30);
					worksheet.column(12).setWidth(30);
					worksheet.column(13).setWidth(30);
					worksheet.column(14).setWidth(30);
					worksheet.column(15).setWidth(30);
					worksheet.column(16).setWidth(30);
					worksheet.column(17).setWidth(30);
					worksheet.column(18).setWidth(30);
					worksheet.column(19).setWidth(30);
					worksheet.column(20).setWidth(30);

					var TOTAL = 0,
						SUB = 0;
					for (var i = 0; i < response.data.length; i++) {
						if (response.data[i].amount > 0) {
							TOTAL += Number(response.data[i].amount)
						} else {
							SUB += (response.data[i].amount)
						}

					}



					worksheet.cell(1, 1).string('GL Account').style(style);
					worksheet.cell(1, 2).string('GL Description').style(style);
					worksheet.cell(1, 3).string('Cost Center Code').style(style);
					worksheet.cell(1, 4).string('Cost Center Description').style(style);
					worksheet.cell(1, 5).string('PayElement Code').style(style);
					worksheet.cell(1, 6).string('PayElement Description').style(style);
					worksheet.cell(1, 7).string('Debit Value').style(style);
					worksheet.cell(1, 8).string('Credit Value').style(style);
					console.log(response.data);
					worksheet.cell(2, 1).string(0).style(style1);
					worksheet.cell(2, 2).string("Total").style(style1);
					worksheet.cell(2, 3).string("General").style(style1);
					worksheet.cell(2, 4).string("General").style(style1);
					worksheet.cell(2, 5).string("").style(style1);
					worksheet.cell(2, 6).string("").style(style1);
					worksheet.cell(2, 7).number(0).style(style1);
					worksheet.cell(2, 8).number(TOTAL + SUB).style(style1);

					for (var i = 0; i < response.data.length; i++) {
						worksheet.cell(i + 3, 1).string(response.data[i].GLAccount).style(style1);
						worksheet.cell(i + 3, 2).string(response.data[i].GlDescription).style(style1);
						worksheet.cell(i + 3, 3).string(response.data[i].CostCode).style(style1);
						worksheet.cell(i + 3, 4).string(response.data[i].CostDescription).style(style1);
						worksheet.cell(i + 3, 5).string(response.data[i].ElementCode).style(style1);
						worksheet.cell(i + 3, 6).string(response.data[i].ElementDescription).style(style1);
						worksheet.cell(i + 3, 7).number(response.data[i].amount > 0 ? response.data[i].amount : 0).style(style1);
						worksheet.cell(i + 3, 8).number(response.data[i].amount < 0 ? (response.data[i].amount * (-1)) : 0).style(style1);
					}
					workbook.write(Path);
					// /***********************************/
					res.send({
						data: response,
						Path: datetime + '.xlsx'
					});

					return;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}

const GetEmployeeReport = async (req, res) => {

	try {

		var query = `
		DECLARE @FirstDate DATE,@LastDate DATE;
		select @FirstDate=DATEADD(MONTH, DATEDIFF(MONTH, 0,'` + req.body.Date + `'), 0) 
		select @LastDate=DATEADD(MONTH, DATEDIFF(MONTH, -1,'` + req.body.Date + `'), -1)
	SELECT * FROM (	SELECT 
	COMPANY.CompanyName,
		COMPANY.Code AS CompanyCode,
		CONCAT(@FirstDate,'/',@LastDate) AS PayCycle,
		(SELECT Name FROM [myuser].[LookupItems] WHERE Id=COMPANY.CountryCode) AS CountryCode,
		(SELECT Name FROM [myuser].[LookupItems] WHERE Id=COMPANYBANK.CurrencyId) AS CompanyCurrency
		,Emp.EmployeeCode,CONCAT(Emp.FirstName,' ',Emp.LastName) AS EmployeeName,FORMAT(Emp.HireDate,'dd/MMM/yyyy') AS HireDate, Bankdetail.IBAN,
		(SELECT Name FROM [myuser].[LookupItems] WHERE Id=Bankdetail.CurrencyCode) AS Currency,
		Bank.BankName,Bank.SwiftCode,Bank.RouteCode,
		(SELECT SUM(Paid) FROM [myuser].[SalaryPayRoll] WHERE EmployeeId=Emp.Id AND Paidon >=@FirstDate AND Paidon <=@LastDate) AS NetSalary
		FROM [dbo].[Employees] Emp
		Left JOIN [dbo].[EmployeeBankAccount] Bankdetail ON Bankdetail.EmployeeId=Emp.Id AND IsPrimary='Y'
		LEFT JOIN [dbo].[Bank] Bank ON Bank.Id=Bankdetail.BankId
		LEFT JOIN [dbo].[Company] COMPANY ON COMPANY.Id=Emp.CompanyId
		LEFT JOIN [dbo].[CompanyBankAccounts] COMPANYBANK ON COMPANYBANK.CompanyId=COMPANY.Id
		WHERE Emp.CompanyId= '` + req.body.CompanyId + `' ) AS  T1 WHERE  NOT NetSalary IS NULL		
		`
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					res.status(500)
					res.send(message.error)
					return "error";
				} else {
					var response = {
						data: profileset.recordset
					};
					console.log(response)
					if (response.data.length == 0) {
						res.status(500)
						res.send("No Record")
						return "error";
					}
					/**********************************************/
					var workbook = new excel.Workbook();
					var worksheet = workbook.addWorksheet('Employee Report');

					var style = workbook.createStyle({
						font: {
							color: '#000000',
							size: 14,
							bold: true
						},
						fill: {
							type: 'pattern',
							patternType: 'solid',
							bgColor: '#DAEEF3',
							fgColor: '#DAEEF3'
						},
						alignment: {
							shrinkToFit: true,
							wrapText: true
						},
						border: { // §18.8.4 border (Border)
							left: {
								style: "thin", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
								color: "#080808" // HTML style hex value
							},
							right: {
								style: "thin",
								color: "#080808"
							},
							top: {
								style: "thin",
								color: "#080808"
							},
							bottom: {
								style: "thin",
								color: "#080808"
							}
						}

					});

					var style1 = workbook.createStyle({
						font: {
							color: '#000000',
							size: 12
						},
						fill: {
							type: 'pattern',
							patternType: 'solid',
							bgColor: '#DAEEF3',
							fgColor: '#DAEEF3'
						},
						alignment: {
							shrinkToFit: true,
							wrapText: true
						},
						border: { // §18.8.4 border (Border)
							left: {
								style: "thin", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
								color: "#080808" // HTML style hex value
							},
							right: {
								style: "thin",
								color: "#080808"
							},
							top: {
								style: "thin",
								color: "#080808"
							},
							bottom: {
								style: "thin",
								color: "#080808"
							}
						}

					});

					var datetime = Date.now();
					var Path = 'public/' + datetime + '.xlsx';


					worksheet.column(1).setWidth(30);
					worksheet.column(2).setWidth(30);
					worksheet.column(3).setWidth(30);
					worksheet.column(4).setWidth(30);
					worksheet.column(5).setWidth(30);
					worksheet.column(6).setWidth(30);
					worksheet.column(7).setWidth(30);
					worksheet.column(8).setWidth(30);
					worksheet.column(9).setWidth(30);
					worksheet.column(10).setWidth(30);
					worksheet.column(11).setWidth(30);
					worksheet.column(12).setWidth(30);
					worksheet.column(13).setWidth(30);
					worksheet.column(14).setWidth(30);
					worksheet.column(15).setWidth(30);
					worksheet.column(16).setWidth(30);
					worksheet.column(17).setWidth(30);
					worksheet.column(18).setWidth(30);
					worksheet.column(19).setWidth(30);
					worksheet.column(20).setWidth(30);

					var TOTAL = 0;
					for (var i = 0; i < response.data.length; i++) {
						TOTAL += Number(response.data[i].NetSalary)
					}

					worksheet.cell(1, 1).string('Country Code').style(style);
					worksheet.cell(1, 2).string(response.data[0].CountryCode).style(style1);
					worksheet.cell(2, 1).string('Company Name').style(style);
					worksheet.cell(2, 2).string(response.data[0].CompanyName).style(style1);
					worksheet.cell(3, 1).string('Entity Id').style(style);
					worksheet.cell(3, 2).string(response.data[0].CompanyCode).style(style1);
					worksheet.cell(4, 1).string('Pay Cycle').style(style);
					worksheet.cell(4, 2).string(response.data[0].PayCycle).style(style1);
					worksheet.cell(6, 1).string('Break Down by Employee').style(style);
					worksheet.cell(8, 1).string('Currency').style(style);
					worksheet.cell(8, 2).string('Amount').style(style);
					worksheet.cell(9, 1).string(response.data[0].CompanyCurrency).style(style1);
					worksheet.cell(9, 2).number(TOTAL).style(style1);


					worksheet.cell(11, 1).string('Employee ID').style(style);
					worksheet.cell(11, 2).string('Employee Alias Name').style(style);
					worksheet.cell(11, 3).string('Hire Date').style(style);
					worksheet.cell(11, 4).string('Bank Account/IBAN').style(style);
					worksheet.cell(11, 5).string('Net Pay').style(style);
					worksheet.cell(11, 6).string('Pay Currency').style(style);
					worksheet.cell(11, 7).string('Bank Name').style(style);
					worksheet.cell(11, 8).string('Bank SWIFT').style(style);
					worksheet.cell(11, 9).string('Routing/Sort Code').style(style);
					console.log(response.data);
					for (var i = 0; i < response.data.length; i++) {
						worksheet.cell(i + 12, 1).string(response.data[i].EmployeeCode).style(style1);
						worksheet.cell(i + 12, 2).string(response.data[i].EmployeeName).style(style1);
						worksheet.cell(i + 12, 3).string(response.data[i].HireDate).style(style1);
						worksheet.cell(i + 12, 4).string(response.data[i].IBAN).style(style1);
						worksheet.cell(i + 12, 5).number(response.data[i].NetSalary != undefined && response.data[i].NetSalary != null && response.data[i].NetSalary != "" ? response.data[i].NetSalary : 0).style(style1);
						worksheet.cell(i + 12, 6).string(response.data[i].Currency).style(style1);
						worksheet.cell(i + 12, 7).string(response.data[i].BankName).style(style1);
						worksheet.cell(i + 12, 8).string(response.data[i].SwiftCode).style(style1);
						worksheet.cell(i + 12, 9).string(response.data[i].RouteCode != undefined && response.data[i].RouteCode != null && response.data[i].RouteCode != "" ? response.data[i].RouteCode.toString() : "").style(style1);
					}
					workbook.write(Path);
					/***********************************/
					res.send({
						data: response,
						Path: datetime + '.xlsx'
					});

					return;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}
const GetEmployeePayrollReport = async (req, res) => {
	try {
		var query = `
		select FirstName,
		format(HireDate,'dd/MM/yyyy') as HireDate,
		(SELECT SUM(value) from  [myuser].[EmployeePayRoll] where EmployeeId=emp.Id) as NetSalary,
		payele.Description as PayElement,value
		from [dbo].[Employees] emp inner join [myuser].[EmployeePayRoll] payroll on payroll.EmployeeId=emp.Id 
		inner join
	   [dbo].[PayElement] payele on payele.Id=payroll.PayelementId
	   order by emp.Id`;
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					res.status(500)
					res.send(message.error)
					return "error";
				} else {
					var response = {
						data: profileset.recordset
					};
					res.send(response);
					return;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}
const GetEmployeeVarrianceReport = async (req, res) => {
	console.log(req.body)
	try {

		var query = `
DECLARE @PayMonth varchar(100)='` + req.body.Date + `'
DECLARE @FirstDate DATE,@LastDate DATE,@PrevFistDate DATE,@prevLastDate DATE,@CompanyName VARCHAR(100);
SELECT @CompanyName=CompanyName FROM dbo.Company WHERE Id='` + req.body.CompanyId + `'
 
SELECT @FirstDate= DATEADD(month, DATEDIFF(month, 0, @PayMonth), 0) 
SELECT @LastDate=EOMONTH(@PayMonth);

select @PrevFistDate=DATEADD(MONTH, DATEDIFF(MONTH, 0, @PayMonth)-1, 0) --First day of previous month
select @prevLastDate=DATEADD(MONTH, DATEDIFF(MONTH, -1, @PayMonth)-1, -1) --Last Day of previous month

CREATE TABLE #CurrentMonth(Id BIGINT IDENTITY(1,1),amount MONEY,payElement BIGINT);
INSERT INTO #CurrentMonth
SELECT isnull(SUM(detail.amount),0) AS amount,detail.PayElementId
FROM  myuser.SalaryPayRoll payroll
INNER JOIN myuser.PaymentDetail detail ON detail.PayRollCode=payroll.PayGroup
WHERE payroll.Paidon>=@FirstDate AND payroll.Paidon<=@LastDate AND payroll.CompanyId='` + req.body.CompanyId + `' GROUP BY detail.PayElementId ;

CREATE TABLE #LastMonth(Id BIGINT IDENTITY(1,1),amount MONEY,payElement BIGINT);
INSERT INTO #LastMonth
SELECT isnull(SUM(detail.amount),0) AS currentMonth,detail.PayElementId
FROM  myuser.SalaryPayRoll payroll
INNER JOIN myuser.PaymentDetail detail ON detail.PayRollCode=payroll.PayGroup
WHERE payroll.Paidon>=@PrevFistDate AND payroll.Paidon<=@prevLastDate AND payroll.CompanyId='` + req.body.CompanyId + `' GROUP BY detail.PayElementId;

SELECT @CompanyName AS company,currentMonth.payElement,lookups.Name as GroupName,currentMonth.amount AS CURRENTMONTH,LastMonth.amount AS LASTMONTH,(currentMonth.amount-LastMonth.amount) AS Varrience,format(@LastDate,'dd-MMM-yyyy') AS LastDate,format(@FirstDate,'dd-MMM-yyyy') AS FirstDate FROM #CurrentMonth currentMonth 
INNER JOIN #LastMonth LastMonth ON currentMonth.payElement=LastMonth.payElement
INNER JOIN  dbo.PayElement ele ON  ele.Id=currentMonth.payElement
INNER JOIN  myuser.LookupItems lookups ON lookups.Id=ele.GroupId;
DROP TABLE #CurrentMonth;
DROP TABLE #LastMonth
`
		console.log(query)
		const pool = await poolPromise
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					res.status(500)
					res.send(message.error)
					return "error";
				} else {

					var response = profileset.recordsets[0];
					console.log(response)
					if (response.length == 0) {
						res.status(500)
						res.send("No Record")
						return false;
					}
					/*************************************/
					var workbook = new excel.Workbook();
					var worksheet = workbook.addWorksheet('Varriance Report');

					var style = workbook.createStyle({
						font: {
							color: '#000000',
							size: 14,
							bold: true
						},
						fill: {
							type: 'pattern',
							patternType: 'solid',
							bgColor: '#DAEEF3',
							fgColor: '#DAEEF3'
						},
						alignment: {
							shrinkToFit: true,
							wrapText: true
						},
						border: { // §18.8.4 border (Border)
							left: {
								style: "thin", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
								color: "#080808" // HTML style hex value
							},
							right: {
								style: "thin",
								color: "#080808"
							},
							top: {
								style: "thin",
								color: "#080808"
							},
							bottom: {
								style: "thin",
								color: "#080808"
							}
						}

					});

					var style1 = workbook.createStyle({
						font: {
							color: '#000000',
							size: 12
						},
						fill: {
							type: 'pattern',
							patternType: 'solid',
							bgColor: '#DAEEF3',
							fgColor: '#DAEEF3'
						},
						alignment: {
							shrinkToFit: true,
							wrapText: true
						},
						border: { // §18.8.4 border (Border)
							left: {
								style: "thin", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
								color: "#080808" // HTML style hex value
							},
							right: {
								style: "thin",
								color: "#080808"
							},
							top: {
								style: "thin",
								color: "#080808"
							},
							bottom: {
								style: "thin",
								color: "#080808"
							}
						}

					});

					var datetime = Date.now();
					var Path = 'public/' + datetime + '.xlsx';


					worksheet.column(1).setWidth(30);
					worksheet.column(2).setWidth(30);
					worksheet.column(3).setWidth(30);
					worksheet.column(4).setWidth(30);
					worksheet.column(5).setWidth(30);
					worksheet.column(6).setWidth(30);
					worksheet.column(7).setWidth(30);
					worksheet.column(8).setWidth(30);
					worksheet.column(9).setWidth(30);
					worksheet.column(10).setWidth(30);
					worksheet.column(11).setWidth(30);
					worksheet.column(12).setWidth(30);
					worksheet.column(13).setWidth(30);
					worksheet.column(14).setWidth(30);
					worksheet.column(15).setWidth(30);
					worksheet.column(16).setWidth(30);
					worksheet.column(17).setWidth(30);
					worksheet.column(18).setWidth(30);
					worksheet.column(19).setWidth(30);
					worksheet.column(20).setWidth(30);

					worksheet.cell(1, 1).string('Company').style(style);
					worksheet.cell(2, 1).string('PayCycle').style(style);

					worksheet.cell(1, 2).string(response[0].company.toString()).style(style1);
					worksheet.cell(2, 2).string(response[0].FirstDate + '/' + response[0].LastDate).style(style1);

					worksheet.cell(4, 1).string('Group Name').style(style);
					worksheet.cell(4, 2).string('Current Month').style(style);
					worksheet.cell(4, 3).string('Last Month').style(style);
					worksheet.cell(4, 4).string('Varrience').style(style);
					worksheet.cell(4, 5).string('%').style(style);
					for (var i = 0; i < response.length; i++) {
						worksheet.cell(i + 5, 1).string(response[i].GroupName.toString()).style(style1);
						worksheet.cell(i + 5, 2).number(response[i].CURRENTMONTH).style(style1);
						worksheet.cell(i + 5, 3).number(response[i].LASTMONTH).style(style1);
						worksheet.cell(i + 5, 4).number(response[i].Varrience).style(style1);
						worksheet.cell(i + 5, 5).number((response[i].CURRENTMONTH == 0 && response[i].LASTMONTH == 0 ? 0 : response[i].LASTMONTH == 0 ? 100 : response[i].CURRENTMONTH == 0 ? -100 : (response[i].Varrience / response[i].LASTMONTH) * 100)).style(style1);
					}
					workbook.write(Path);

					/*************************************/
					res.send({
						data: response,
						Path: datetime + '.xlsx'
					});
					return;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}
const getIndvVarriancereport = async (req, res) => {
	console.log(req.body)
	try {
		var query = `

		DECLARE @PayMonth varchar(100)='` + req.body.Date + `'
		DECLARE @FirstDate DATE,@LastDate DATE,@PrevFistDate DATE,@prevLastDate DATE,@CompanyName VARCHAR(100);
		SELECT @CompanyName=CompanyName FROM dbo.Company WHERE Id='` + req.body.CompanyId + `'
		 
		SELECT @FirstDate= DATEADD(month, DATEDIFF(month, 0, @PayMonth), 0) 
		SELECT @LastDate=EOMONTH(@PayMonth);
		
		select @PrevFistDate=DATEADD(MONTH, DATEDIFF(MONTH, 0, @PayMonth)-1, 0) --First day of previous month
		select @prevLastDate=DATEADD(MONTH, DATEDIFF(MONTH, -1, @PayMonth)-1, -1) --Last Day of previous month
		
		
		
		CREATE TABLE #CurrentMonth(Id BIGINT IDENTITY(1,1),amount MONEY,payElement BIGINT,EmployeeId BIGINT);
		INSERT INTO #CurrentMonth
		SELECT isnull(SUM(detail.amount),0) AS amount,detail.PayElementId,payroll.EmployeeId
		FROM  myuser.SalaryPayRoll payroll
		INNER JOIN myuser.PaymentDetail detail ON detail.PayRollCode=payroll.PayGroup
		WHERE payroll.Paidon>=@FirstDate AND payroll.Paidon<=@LastDate AND payroll.CompanyId='` + req.body.CompanyId + `' GROUP BY detail.PayElementId,payroll.EmployeeId ;
		
		CREATE TABLE #LastMonth(Id BIGINT IDENTITY(1,1),amount MONEY,payElement BIGINT,EmployeeId BIGINT);
		INSERT INTO #LastMonth
		SELECT isnull(SUM(detail.amount),0) AS currentMonth,detail.PayElementId,payroll.EmployeeId
		FROM  myuser.SalaryPayRoll payroll
		INNER JOIN myuser.PaymentDetail detail ON detail.PayRollCode=payroll.PayGroup
		WHERE payroll.Paidon>=@PrevFistDate AND payroll.Paidon<=@prevLastDate AND payroll.CompanyId='` + req.body.CompanyId + `' GROUP BY detail.PayElementId,payroll.EmployeeId;
		
		SELECT @CompanyName AS company,currentMonth.payElement,lookups.Name as GroupName,currentMonth.amount AS CURRENTMONTH,LastMonth.amount AS LASTMONTH,(currentMonth.amount-LastMonth.amount) AS Varrience,format(@LastDate,'dd-MMM-yyyy') AS LastDate,format(@FirstDate,'dd-MMM-yyyy') AS FirstDate,CONCAT(emp.FirstName,' ',emp.LastName ) AS Name FROM #CurrentMonth currentMonth 
		INNER JOIN #LastMonth LastMonth ON currentMonth.payElement=LastMonth.payElement
		INNER JOIN  dbo.PayElement ele ON  ele.Id=currentMonth.payElement
		INNER JOIN  myuser.LookupItems lookups ON lookups.Id=ele.GroupId
		INNER JOIN  dbo.Employees emp ON emp.Id = currentMonth.EmployeeId;
		DROP TABLE #CurrentMonth;
		DROP TABLE #LastMonth
`;
		const pool = await poolPromise
		console.log(query);
		const result = await pool.request()
			.query(query, function (err, profileset) {
				if (err) {
					res.status(500)
					res.send(message.error)
					return "error";
				} else {
					var response = profileset.recordset;
					console.log(response)
					/******************************************/
					if (response.length == 0) {
						res.status(500)
						res.send("No Record")
						return "error";
					}
					var workbook = new excel.Workbook();
					var worksheet = workbook.addWorksheet('Employee Report');

					var style = workbook.createStyle({
						font: {
							color: '#000000',
							size: 14,
							bold: true
						},
						fill: {
							type: 'pattern',
							patternType: 'solid',
							bgColor: '#DAEEF3',
							fgColor: '#DAEEF3'
						},
						alignment: {
							shrinkToFit: true,
							wrapText: true
						},
						border: { // §18.8.4 border (Border)
							left: {
								style: "thin", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
								color: "#080808" // HTML style hex value
							},
							right: {
								style: "thin",
								color: "#080808"
							},
							top: {
								style: "thin",
								color: "#080808"
							},
							bottom: {
								style: "thin",
								color: "#080808"
							}
						}

					});


					var style1 = workbook.createStyle({
						font: {
							color: '#000000',
							size: 12
						},
						fill: {
							type: 'pattern',
							patternType: 'solid',
							bgColor: '#DAEEF3',
							fgColor: '#DAEEF3'
						},
						alignment: {
							shrinkToFit: true,
							wrapText: true
						},
						border: { // §18.8.4 border (Border)
							left: {
								style: "thin", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
								color: "#080808" // HTML style hex value
							},
							right: {
								style: "thin",
								color: "#080808"
							},
							top: {
								style: "thin",
								color: "#080808"
							},
							bottom: {
								style: "thin",
								color: "#080808"
							}
						}

					});
					var datetime = Date.now();
					var Path = 'public/' + datetime + '.xlsx';


					worksheet.column(1).setWidth(30);
					worksheet.column(2).setWidth(30);
					worksheet.column(3).setWidth(30);
					worksheet.column(4).setWidth(30);
					worksheet.column(5).setWidth(30);
					worksheet.column(6).setWidth(30);
					worksheet.column(7).setWidth(30);
					worksheet.column(8).setWidth(30);
					worksheet.column(9).setWidth(30);
					worksheet.column(10).setWidth(30);
					worksheet.column(11).setWidth(30);
					worksheet.column(12).setWidth(30);
					worksheet.column(13).setWidth(30);
					worksheet.column(14).setWidth(30);
					worksheet.column(15).setWidth(30);
					worksheet.column(16).setWidth(30);
					worksheet.column(17).setWidth(30);
					worksheet.column(18).setWidth(30);
					worksheet.column(19).setWidth(30);
					worksheet.column(20).setWidth(30);

					worksheet.cell(1, 1).string('Company').style(style);
					worksheet.cell(2, 1).string('PayCycle').style(style);
					worksheet.cell(1, 2).string(response[0].company.toString()).style(style1);
					worksheet.cell(2, 2).string(response[0].FirstDate + '/' + response[0].LastDate).style(style1);

					worksheet.cell(4, 1).string('Group Name').style(style);
					worksheet.cell(4, 2).string('Employee Name').style(style);
					worksheet.cell(4, 3).string('Current Month').style(style);
					worksheet.cell(4, 4).string('Last Month').style(style);
					worksheet.cell(4, 5).string('Varrience').style(style);
					worksheet.cell(4, 6).string('%').style(style);
					for (var i = 0; i < response.length; i++) {
						worksheet.cell(i + 5, 1).string(response[i].GroupName.toString()).style(style1);
						worksheet.cell(i + 5, 2).string(response[i].Name).style(style1);
						worksheet.cell(i + 5, 3).number(response[i].CURRENTMONTH).style(style1);
						worksheet.cell(i + 5, 4).number(response[i].LASTMONTH).style(style1);
						worksheet.cell(i + 5, 5).number(response[i].Varrience).style(style1);
						worksheet.cell(i + 5, 6).number((response[i].CURRENTMONTH == 0 && response[i].LASTMONTH == 0 ? 0 : response[i].LASTMONTH == 0 ? 100 : response[i].CURRENTMONTH == 0 ? -100 : (response[i].Varrience / response[i].LASTMONTH) * 100)).style(style1);
					}
					workbook.write(Path);

					/*****************************************/

					res.send({
						data: response,
						Path: datetime + '.xlsx'
					});
					return;
				}
			})
	} catch (err) {
		res.status(500)
		res.send(message.error)
		return "error";
	}
}
const GetGTNReport = async (req, res) => {
	try {
		const pool = await poolPromise
		const result = await pool.request()
			.input("CompanyId", sql.VarChar(MAX), req.body.CompanyId)
			.input("Date", sql.Date, req.body.Date)
			.execute("[dbo].[GTNReport]").then(function (data) {
				var response = data.recordset;
				console.log(response);
				if (response.length == 0) {
					res.status(400).json({
						message: "No Record"
					})
					res.send(err.message);
					return false;
				}
				/*************************************/
				var workbook = new excel.Workbook();
				var worksheet = workbook.addWorksheet('G2N Report');

				var style = workbook.createStyle({
					font: {
						color: '#000000',
						size: 14,
						bold: true
					},
					fill: {
						type: 'pattern',
						patternType: 'solid',
						bgColor: '#DAEEF3',
						fgColor: '#DAEEF3',
					},
					alignment: {
						shrinkToFit: true,
						wrapText: true
					},
					border: { // §18.8.4 border (Border)
						left: {
							style: "thin", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
							color: "#080808" // HTML style hex value
						},
						right: {
							style: "thin",
							color: "#080808"
						},
						top: {
							style: "thin",
							color: "#080808"
						},
						bottom: {
							style: "thin",
							color: "#080808"
						}
					}
				});

				var style1 = workbook.createStyle({
					font: {
						color: '#000000',
						size: 12
					},
					fill: {
						type: 'pattern',
						patternType: 'solid',
						bgColor: '#DAEEF3',
						fgColor: '#DAEEF3'
					},
					alignment: {
						shrinkToFit: true,
						wrapText: true
					},
					border: { // §18.8.4 border (Border)
						left: {
							style: "thin", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
							color: "#080808" // HTML style hex value
						},
						right: {
							style: "thin",
							color: "#080808"
						},
						top: {
							style: "thin",
							color: "#080808"
						},
						bottom: {
							style: "thin",
							color: "#080808"
						}
					}

				});

				var datetime = Date.now();
				var Path = 'public/' + datetime + '.xlsx';
				worksheet.cell(1, 1).string('Country Code').style(style);
				worksheet.cell(1, 2).string(response[0].CountryCode).style(style1);
				worksheet.cell(2, 1).string('Company Name').style(style);
				worksheet.cell(2, 2).string(response[0].CompanyName).style(style1);
				worksheet.cell(3, 1).string('Entity Id').style(style);
				worksheet.cell(3, 2).string(response[0].Code).style(style1);
				worksheet.cell(4, 1).string('Pay Cycle').style(style);
				worksheet.cell(4, 2).string(response[0].PayCycle).style(style1);

				var Objects = Object.keys(response[0]);
				for (var x = 5; x < Objects.length; x++) {
					worksheet.cell(9, x - 4).string(Objects[x]).style(style);
				}
				worksheet.column(1).setWidth(30);
				worksheet.column(2).setWidth(30);
				worksheet.column(3).setWidth(30);
				worksheet.column(4).setWidth(30);
				worksheet.column(5).setWidth(30);
				worksheet.column(6).setWidth(30);
				worksheet.column(7).setWidth(30);
				worksheet.column(8).setWidth(30);
				worksheet.column(9).setWidth(30);
				worksheet.column(10).setWidth(30);
				worksheet.column(11).setWidth(30);
				worksheet.column(12).setWidth(30);
				worksheet.column(13).setWidth(30);
				worksheet.column(14).setWidth(30);
				worksheet.column(15).setWidth(30);
				worksheet.column(16).setWidth(30);
				worksheet.column(17).setWidth(30);
				worksheet.column(18).setWidth(30);
				worksheet.column(19).setWidth(30);
				worksheet.column(20).setWidth(30);
				var OUTPUT = [];
				for (var i = 0; i < response.length; i++) {
					var OBJ = {};
					for (var z = 5; z < Objects.length; z++) {
						console.log(response[i][Objects[x]]);
						worksheet.cell(i + 10, z - 4).string(Number.isInteger(response[i][Objects[z]]) ? response[i][Objects[z]].toString() : response[i][Objects[z]]).style(style1);
						OBJ[z] = Number.isInteger(response[i][Objects[z]]) ? response[i][Objects[z]] : 0;

					}
					OUTPUT.push(OBJ);
				}
				const result = OUTPUT.reduce((sums, obj) => Object.keys(obj).reduce((s, k) => {
					k === 'id' || (s[k] = (s[k] || 0) + +obj[k]);

					return s;
				}, sums), {});

				var _style = workbook.createStyle({
					font: {
						color: '#000000',
						size: 14,
						bold: true
					},
				});

				for (var z = 1; z < Objects.length; z++) {

					worksheet.cell(response.length + 10, z + 1).string(result[Object.keys(result)[z]] != undefined && result[Object.keys(result)[z]] != "0" && result[Object.keys(result)[z]] != null ? result[Object.keys(result)[z]].toString() : "").style(_style)
				}

				workbook.write(Path);
				/***********************************/
				res.send({
					data: data,
					Path: datetime + '.xlsx'
				});
			})
	} catch (err) {
		res.status(400).json({
			message: err.message
		})
		res.send(err.message)
		// return "error";
	}
}
module.exports = {
	GetEmployeeReport,
	GetEmployeePayrollReport,
	GetEmployeeVarrianceReport,
	getIndvVarriancereport,
	GetGTNReport,
	download,
	GetGLReport,
	GeneratePaySlip,
	GetPaymentDetails
};