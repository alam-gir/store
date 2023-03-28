import { emailTransporter } from "../nodemailer/nodemailer";

const sendMailThroughNodemailer = async (from, to, subject, text, htmlToSend) => {
  await emailTransporter.sendMail({
    from, //`"customer" <${customer.email}>`, // sender address
    to, //process.env.GMAIL, // list of receivers
    subject, // "" // Subject line
    text: text ? text : null, // "", // plain text body
    html: htmlToSend ? htmlToSend : null // "<b></b>", // html body
  });
};


export {sendMailThroughNodemailer}