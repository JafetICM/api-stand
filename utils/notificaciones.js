//utils/notificaciones.js
require('dotenv').config(); // Asegura que las variables de entorno se carguen

const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Mostrar variables para debugging (puedes comentar luego)
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '********' : 'No definido');
console.log('TWILIO_SID:', process.env.TWILIO_SID);
console.log('TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN ? '********' : 'No definido');
console.log('TWILIO_PHONE_NUMBER:', process.env.TWILIO_PHONE_NUMBER);

const transporter = nodemailer.createTransport({
  service: 'gmail', // Cambia si usas otro proveedor SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

async function enviarCorreoRegistro(email, nombre) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Gracias por registrarte',
      text: `Hola ${nombre}, gracias por registrarte en nuestro stand.`,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${email}`);
  } catch (error) {
    console.error('Error enviando email:', error);
  }
}

async function enviarSmsRegistro(telefono, nombre) {
  try {
    await client.messages.create({
      body: `Hola ${nombre}, gracias por registrarte en nuestro stand.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: telefono,
    });
    console.log(`SMS enviado a ${telefono}`);
  } catch (error) {
    console.error('Error enviando SMS:', error);
  }
}

module.exports = { enviarCorreoRegistro, enviarSmsRegistro };
