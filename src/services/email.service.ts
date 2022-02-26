import nodemailer from 'nodemailer';
import { log } from '../shared/helpers/logger';

export const sendEmail = async (file: any, fileName: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
      },
    });
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: process.env.USER_EMAIL,
      subject: fileName,
      attachments: [
        {
          filename: fileName,
          content: file,
        },
      ],
    };

    return await transporter
      .sendMail(mailOptions)
      .then(() => log.info('Email has been sent successfully.'))
      .catch((error) => log.error(error));
  } catch (error) {
    log.error(error);
    return error;
  }
};
