'use server'
import nodemailer from 'nodemailer'

// TODO: Setup node mailer register and get env keys

export const onMailer = (email: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
    },
  })

  // send message to business owner when ai goes of track or gets confused
  const mailOptions = {
    to: email,
    subject: 'Realtime Support',
    text: 'One of your customers on Dives AI, just switched to realtime mode, please attend to your customer.',
  }
// send mail to business owner
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}
