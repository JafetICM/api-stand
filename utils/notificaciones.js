const nodemailer = require('nodemailer');
const twilio = require('twilio');

const transporter = nodemailer.createTransport({
  service: 'gmail', // o el servicio SMTP que uses
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

async function enviarCorreoRegistro(email, nombre) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Gracias por registrarte',
    text: `Hola ${nombre}, gracias por registrarte en nuestro stand.`,
  };
  await transporter.sendMail(mailOptions);
}

async function enviarSmsRegistro(telefono, nombre) {
  await client.messages.create({
    body: `Hola ${nombre}, gracias por registrarte en nuestro stand.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: telefono,
  });
}

module.exports = { enviarCorreoRegistro, enviarSmsRegistro };
