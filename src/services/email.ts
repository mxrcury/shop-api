import nodemailer, { Transporter } from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';
import pug from 'pug'
import path from 'path'
class EmailService {
  private transporter: Transporter
  public sender:string = 'Dmytro Honchar <mxrcury6@protonmail.com>'
  constructor() { this.initialize() }

  private async initialize(): Promise<void> {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
    return
  }

  async sendEmail({ to, subject, text, html }: Options): Promise<void> {
    return await this.transporter.sendMail({ to, from: this.sender, subject, text, html })
  }

  async sendConfirmationEmail(to: string, confirmUrl: string): Promise<void> {
    const templatePath = path.resolve('src', 'views', 'confirmEmail.pug')
    const html = pug.renderFile(templatePath, { confirmUrl })

    this.sendEmail({
      to,
      text: 'Please confirm your email!',
      html
    })
  }

  async sendForgotPassEmail(to:string, confirmUrl:string): Promise<void> {
    const templatePath = path.resolve('src', 'views', 'forgotPassword.pug')
    const html = pug.renderFile(templatePath, { confirmUrl })

    return this.sendEmail({
      to,
      subject: 'Reset your password',
      text: 'Please read below for resetting your password',
      html,
  });
  }
}


export default new EmailService()
