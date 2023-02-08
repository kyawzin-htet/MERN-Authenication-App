const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

require('dotenv').config();


exports.registerMail = async(req, res) =>{

    const {username, userEmail, text, subject} = req.body;

    let config = {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Mailgen",
            link: "https://mailgen.js/"
        }
    })

    let response ={
        body: {
            name: username,
            intro: text || "Register successful",
            outro : 'Need help or Question?'
        }
    }

    let mail = MailGenerator.generate(response);

    let message ={
        from : process.env.EMAIL,
        to: userEmail,
        subject: subject || "Your Registration is Success",
        html: mail
    }

    transporter.sendMail(message).then(() =>{
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch( error => {
        return res.status(500).json({error})
    })
}