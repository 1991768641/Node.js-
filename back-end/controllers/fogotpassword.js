const nodemailer = require("nodemailer");
/* function fogotpassword(){ */
    const smtpTransport = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: '1991768641@qq.com',
            pass: 'dj.7500866' //注：此处为授权码，并非邮箱密码
        }
    });
/*     return smtpTransport; */
/* } */
smtpTransport.sendMail({
    from: '2522347041@qq.com', //发件人邮箱
    to: '1991768641@qq.com', //收件人邮箱，多个邮箱地址间用','隔开
    subject: 'hello', //邮件主题
    html: '<b>狗币</b>'
}, function (err, res) {
    console.log(err, res);
});
/* 
module.exports={
    fogotpassword
} */