import config from "../config/config.js";
import twilio from 'twilio';


// Connet
const twilioClient = twilio(config.twilioAccountSID, config.twilioAuthToken)

const twilioData = {
    body: "Esto es un mensaje de pruaba usando Twilio desde NODEJS",
    from: config.twilioSmsNumber, // numero de US que me genera Twilio
    to: config.twilioToSmsMyPhoneNumber
}


export const sendSMS = async (req, res) => {
    try {
        console.log('Enviando SMS using Twilio Account');
        console.log(twilioClient);

        // enviar mensaje
        const result = await twilioClient.messages.create(twilioData)
        res.send({ Status: 'Success', Payload: result })

    } catch (error) {
        console.log("Error al enviar mensaje: ", error);
        res.status(500).send({ error: error })
    }
}