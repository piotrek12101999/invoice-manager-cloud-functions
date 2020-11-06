import * as functions from 'firebase-functions';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    secureConnection: false,
    port: 587,
    tls: {
      ciphers: 'SSLv3'
    },
    auth: {
      user: functions.config().mail_service.user,
      pass: functions.config().mail_service.pass
    }
} as SMTPTransport.Options);