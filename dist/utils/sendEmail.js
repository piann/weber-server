"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mailgun_js_1 = __importDefault(require("mailgun-js"));
var mailgunClient = new mailgun_js_1.default({
    apiKey: process.env.MAILGUN_API_KEY || "",
    domain: "sandboxb07abcbffdb1448db8127e7d54a87ec8.mailgun.org"
});
var sendEmail = function (to, subject, html) {
    var emailData = {
        from: "pokemail21@gmail.com",
        to: to,
        subject: subject,
        html: html
    };
    return mailgunClient.messages().send(emailData);
};
exports.sendVerificationEmail = function (to, fullName, key) {
    var emailSubject = "Hello " + fullName + ", please verify your email";
    var emailBody = "Verify your email by clicking <a href=\"http://webertest.dev/verification/" + key + "/\">here</a>";
    return sendEmail(to, emailSubject, emailBody);
};
//# sourceMappingURL=sendEmail.js.map