import nodemailer, { Transporter } from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';
import pug from 'pug';
import path from 'path';
import { PLEASE_CONFIRM_EMAIL, PLEASE_READ_BELOW } from '../constants';
import { EmailOptions } from '../types/email';

class EmailService {
  private transporter: Transporter;
  constructor(public sender: string) {
    this.sender = sender;
    this.initialize();
  }
  private async initialize(): Promise<void> {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    return;
  }

  async sendEmail({ to, subject, text, html }: Options): Promise<void> {
    return await this.transporter.sendMail({
      to,
      from: this.sender,
      subject,
      text,
      html,
    });
  }

  async sendConfirmationEmail({ to, confirmUrl }: EmailOptions): Promise<void> {
    const templatePath = path.resolve('src', 'views', 'confirmEmail.pug');
    const html = pug.renderFile(templatePath, { confirmUrl });

    return await this.sendEmail({
      to,
      text: PLEASE_CONFIRM_EMAIL,
      html,
    });
  }

  async sendForgotPassEmail({ to, confirmUrl }: EmailOptions): Promise<void> {
    const templatePath = path.resolve('src', 'views', 'forgotPassword.pug');
    const html = pug.renderFile(templatePath, { confirmUrl });

    return await this.sendEmail({
      to,
      subject: 'Reset your password',
      text: PLEASE_READ_BELOW,
      html,
    });
  }
}

export default new EmailService(process.env.EMAIL_SENDER);
