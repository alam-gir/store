import nodemailer from "nodemailer";

const user = process.env.GMAIL
const pass = process.env.GMAIL_APP_PASS
export const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user,
        pass
    },
    from: user 
})
