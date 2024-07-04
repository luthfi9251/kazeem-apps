const nodemailer = require("nodemailer");

export async function sendMail(subject, toEmail, otpText) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: "mail.kazeem.cloud",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "contact-us@kazeem.cloud",
                pass: "V*7B07f6I238",
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let mailOptions = {
            from: '"Kazeem Contact us Form" <contact-us@kazeem.cloud>',
            to: toEmail,
            subject: subject,
            text: otpText,
        };

        transporter
            .sendMail(mailOptions)
            .then((res) => resolve())
            .catch((err) => reject(err));
    });
}
