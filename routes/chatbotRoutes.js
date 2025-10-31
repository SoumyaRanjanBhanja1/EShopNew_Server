import express from 'express';
import { chatWithBot } from '../controllers/chatbotController.js';

const router = express.Router();
router.post('/chat', chatWithBot);

export default router;