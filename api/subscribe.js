const nodemailer = require("nodemailer");
require('dotenv').config();

// We initiate the SMTP Transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_SECURE === 'true' ? true : false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: process.env.SMTP_VERIFY === 'true' ? true : false,
    },
  });

  
// Function that sends new subscribers to email
async function sendEmail(enteredEmail) {
    return transporter.sendMail({
                from: process.env.SMTP_FROM, // sender address
                to: process.env.SMTP_TO, // email of receivers
                subject: "Nueva subscripcion", // Subject line
                text: "Nuevo usuario " + enteredEmail, // plain text body
                html: "<b> Se registro un nuevo usuario " + enteredEmail + "</b>", // html body
            });
}

// Route Handler
export default async function handler(req, res) {
    const { email } = req.body;
    const minLen = 10;
    if (email.length > minLen) {
        try {
            let info = await sendEmail(email);
            return res.status(200).send({message: `Message sent ${info.messageId}.`});
        } catch (error) {
            return res.status(500).send({message: error});
        }
    } else {
        return res.status(200).send({message: `${email} length is less than ${minLen}`});
    }
}