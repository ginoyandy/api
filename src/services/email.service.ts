import nodemailer from 'nodemailer';
import { log } from '../shared/helpers/logger';
import fs from 'fs';

export const sendEmail = async (fileName: string, file?: any) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 25,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
      },
    });
    const mailOptions = {
      from: `HQ Asociados <${process.env.USER_EMAIL}>`,
      to: process.env.DBX_EMAIL,
      subject: 'Hola, te acercamos tu nuevo archivo.',
      html: 'En este email encontraras tu nuevo archivo! <br>Saludos',
      text: 'En este email encontraras tu nuevo archivo! <br>Saludos',
      attachments: [
        {
          filename: fileName,
          content: (file) ? file : fs.createReadStream(`temp/${fileName}`)
        },
      ],
    };

    return await transporter
      .sendMail(mailOptions)
      .then(() => log.info('Email has been sent successfully.'))
      .catch((error) => log.error(error));
  } catch (error) {
    log.error(error);
    throw Error(error);
  }
};
