import nodemailer, { Transporter } from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';

class EmailService {
  private transporter: Transporter
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
  
  async sendEmail({ to, from, subject, text, html }: Options): Promise<void> {
    await this.transporter.sendMail({ to, from, subject, text, html })

    return
  }

}


export default new EmailService()
