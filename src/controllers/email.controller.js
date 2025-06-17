import nodemailer from 'nodemailer';
import config from '../config/config.js';
import __dirname from '../utils.js';
import crypto from 'crypto';
import studentsModel from '../services/dao/mongo/models/students.js';
// Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmailAccount,
        pass: config.gmailAppPassword
    }
})

// verificar conexion con gmail
transporter.verify(function (err, success) {
    if (err) {
        console.log(err);
    } else {
        console.log('Server SMTP is ready to take our message');
    }
})



const mailOptions = {
    from: `Coder Test ${config.gmailAccount}`,
    to: config.gmailAccount,
    subject: "Correo de prueba",
    html: "<div><h1>Esto es un Test de envio de correos con Nodemailer!</h1></div>",
    attachments: []
}

// sendEmail
export const sendEmail = (req, res) => {
    try {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(error);
                return res.status(400).send({ message: "Error", payload: error });
            }

            console.log(`Message sent: %s`, info.messageId);
            res.send({ status: "Success", payload: info })
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }
}



const mailOptionsWithAttachments = {
    from: `Test ${config.gmailAccount}`,
    to: config.gmailAccount,
    subject: "Correo de prueba",
    html: `<div>
                <h1>Esto es un Test de envio de correos con Nodemailer!</h1>
                <p>Ahora usando imagenes: </p>
                <img src="cid:meme"/>
            </div>`,
    attachments: [
        {
            filename: 'Meme de programacion',
            path: __dirname + "/public/images/meme.png",
            cid: 'meme'
        }
    ]
}

// sendEmailWithAttachments
export const sendEmailWithAttachments = (req, res) => {
    try {
        transporter.sendMail(mailOptionsWithAttachments, (err, info) => {
            if (err) {
                console.log(error);
                return res.status(400).send({ message: "Error", payload: error });
            }

            console.log(`Message sent: %s`, info.messageId);
            res.send({ status: "Success", payload: info })
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }
}

export async function requestPasswordReset(req, res) {
    const { email } = req.body;

    try {
        const user = await studentsModel.findOne({ email });
        if (!user) return res.status(404).send({ message: "Usuario no encontrado." });

        // Crear token seguro
        const token = crypto.randomBytes(32).toString('hex');

        // Guardar token y expiración (1 hora)
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora en ms

        await user.save();

        // Configurar transporte nodemailer 
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: config.gmailAccount,
                pass: config.gmailAppPassword,
            },
        });

        // Enlace para resetear 
        const resetUrl = `http://localhost:9090/reset-password/${token}`;

        // Email
        const mailOptions = {
            to: user.email,
            from: config.gmailAccount,
            subject: 'Recuperación de contraseña',
            html: `<p>Haz clic en el botón para restablecer tu contraseña:</p>
            <a href="${resetUrl}">Restablecer contraseña</a>
            <p>El enlace expira en 1 hora.</p>`,
        };

        await transporter.sendMail(mailOptions);

        res.send({ message: "Email de recuperación enviado." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al solicitar recuperación de contraseña." });
    }
}