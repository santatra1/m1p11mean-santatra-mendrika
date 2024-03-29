const fs = require('fs');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');

const sendEmailAsFunction = async (to, subject, templateFileName, content) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'mendrikaitokiuana@gmail.com',
        pass: 'tcpx omfv srwy ilfn',
      },
    });

    const templateFile = fs.readFileSync(`./src/mailTemplate/${templateFileName}.hbs`, 'utf-8');
    const template = handlebars.compile(templateFile);

    const html = template({ ...content });

    const mailOptions = {
      from: 'salonbeaute@gmail.com',
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    return { message: 'E-mail envoyé avec succès.', info };
  } catch (error) {
    console.error(error);
    throw new Error('Erreur lors de l\'envoi de l\'e-mail.');
  }
};

const sendEmail = async (req, res) => {
  try {
    const { to, subject, templateFileName, content } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'mendrikaitokiuana@gmail.com',
        pass: 'tcpx omfv srwy ilfn',
      },
    });

    const templateFile = fs.readFileSync(`./src/mailTemplate/${templateFileName}.hbs`, 'utf-8');
    const template = handlebars.compile(templateFile);

    const html = template({ ...content });

    const mailOptions = {
      from: 'salonbeaute@gmail.com',
      to,
      subject,
      html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur interne du serveur.' });
      } else {
        return res.status(200).json({ message: 'E-mail envoyé avec succès.', info });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

module.exports = { sendEmailAsFunction, sendEmail };