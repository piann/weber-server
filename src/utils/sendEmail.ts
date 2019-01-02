import Mailgun from "mailgun-js";

const mailgunClient = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY || "",
    domain: "sandboxb07abcbffdb1448db8127e7d54a87ec8.mailgun.org"
});

const sendEmail = (to: string, subject:string, html:string) => {
    const emailData = {
        from: "pokemail21@gmail.com",
        to,
        subject,
        html
    }
    return mailgunClient.messages().send(emailData);
}

export const sendVerificationEmail = (to:string, fullName: string, key: string) =>{
    const emailSubject = `Hello ${fullName}, please verify your email`;
    const emailBody = `Verify your email by clicking <a href="http://webertest.dev/verification/${key}/">here</a>`;
    return sendEmail(to, emailSubject, emailBody);
}