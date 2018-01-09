// TODO: move to process.env
const SENDGRID_API_KEY='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';


// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

const send = (msg) => {
    return sgMail.send(msg);
}

const forgotPassword = (email, hashToken) => {
    return sgMail.send({
        to: email,
        from: 'phamkhacquyen1996@gmail.com',
        subject: 'Reset password request - Kcoin Wallet',
        text: `Click here to reset password: http://localhost:3000/forgotpassword?token=${hashToken}`,
        html: `Click here to reset password: <a href="http://localhost:3000/forgotpassword?token=${hashToken}">http://localhost:3000/forgetpassword?token=${hashToken}</a>`,
  });
}

const activeAccount = (email, hashToken) => {
    return sgMail.send({
        to: email,
        from: 'phamkhacquyen1996@gmail.com',
        subject: 'Active Kcoin Wallet',
        text: `Click here to activate your account: http://localhost:3000/activeAccount?token=${hashToken}`,
        html: `Click here to activate your account: <a href="http://localhost:3000/activeAccount?token=${hashToken}">http://localhost:3000/activeAccount?token=${hashToken}</a>`
    });   
}



exports.send = send;
exports.forgotPassword = forgotPassword;
exports.activeAccount = activeAccount;
