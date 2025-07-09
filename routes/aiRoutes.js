import express from 'express';
import { generateBlogContent } from '../controllers/aiController.js';
import auth from '../middleware/auth.js';

const aiRouter = express.Router();

// AI content generation endpoint (protected route)
aiRouter.post('/generate-content', auth, generateBlogContent);

export default aiRouter;
