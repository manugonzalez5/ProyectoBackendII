import { Router } from "express";
import { sendEmail, sendEmailWithAttachments, requestPasswordReset } from '../controllers/email.controller.js';


const router = Router();

router.get("/", sendEmail);
router.get("/attachments", sendEmailWithAttachments);
router.post("/reset-password", requestPasswordReset);

export default router;