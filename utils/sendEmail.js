// const nodemailer = require('nodemailer')

// async function sendEmail(mailSubject, recipientArr, mailBody) {

//     let transporter = nodemailer.createTransport({
//         host: 'smtp.yandex.ru',
//         port: 465,
//         secure: true,
//         auth: {
//             user: 'egor594bed@yandex.ru',
//             pass: 'pass',
//         },
//     })

//     let result = await transporter.sendMail({
//         from: '"Hobby-hall" <egor594bed@yandex.ru>',
//         to: recipientArr,
//         subject: mailSubject,
//         text: 'This message was sent from Node js server.',
//         html: mailBody,
//     })
// }

// module.exports = sendEmail