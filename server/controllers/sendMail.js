const nodemailer = require("nodemailer");

const sendEmail = async(req, res) => {
    const ipAddress = req.ip;
    console.log(ipAddress);
    let testAccount = await nodemailer.createTestAccount();
let transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    // host: "gmail",
    port: 587,
    auth: {
        user: 'meda.dietrich@ethereal.email',
        pass: 'sfFACc74dJEpARHEa2'
    },
});

let info = await transporter.sendMail({
    from: '"abhishek 👻" <abhiiit1234@gmail.com>', // sender address
    to: "at9188@srmist.edu.in", // list of receivers
    subject: "reporting the image", // Subject line
    text: `the image is inappropriate found on ip address ${ipAddress}`, // plain text body
    html: `<b>the image is inappropriaten ${ipAddress}</b>`, // html body
  });
    res.send('Email sent successfully');};

module.exports = sendEmail;