const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "660ccb2b88d670",
        pass: "2a810840c92c77"
    }
  });

module.exports = transport;