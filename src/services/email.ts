import nodemailer, { Transporter } from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';

class EmailService {
  private transporter: Transporter
  constructor() { this.initialize() }
  
  private async initialize(): Promise<void> {
    this.transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 25,
      auth: {
        user: "e446a99ad117b7",
        pass: "df2eaf950dcce9"
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
