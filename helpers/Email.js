var mailer = require('nodemailer');
var fs = require('fs');

const SendEmail= async (to)=>{
    mailer.SMTP = {
        host: 'hrsolutionhouse.com', 
        port:587,
        use_authentication: true, 
        user: 'employee.payslips@hrsolutionhouse.com', 
        pass: 'n7xjAw4r&A4dNdjz'
    };

    fs.readFile("./../PaySlip.pdf",  function (err, data) {

     mailer.send_mail({       
            sender: 'employee.payslips@hrsolutionhouse.com',
            to: "naeemabbasa25@gmail.com",
            subject: 'Payslip!',
            body: 'PaySlip of Month',
            attachments: [{'filename': 'PaySlip.pdf', 'content': data}]
        }), function(err, success) {
            if (err) {
                // Handle error
            }
    
        }
    });


}
module.exports=SendEmail;