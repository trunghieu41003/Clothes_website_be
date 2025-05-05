const nodemailer = require('nodemailer');

// Cấu hình Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Bạn có thể thay đổi dịch vụ nếu cần
    auth: {
        user: process.env.EMAIL_USER, // Đảm bảo rằng EMAIL_USER có trong .env
        pass: process.env.EMAIL_PASS, // Đảm bảo rằng EMAIL_PASS có trong .env
    },
});

// Hàm gửi email
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Lỗi khi gửi email:', error);
        throw new Error(error.message); // This will send the error back to the controller
    }
};

module.exports = sendEmail;