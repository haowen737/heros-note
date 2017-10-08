const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.yeah.net',
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'haowen_server@yeah.net', // generated ethereal user
        pass: 'zhw45226802'  // generated ethereal password
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Cogman" <haowen_server@yeah.net>', // sender address
    to: 'haowen737@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});
