import { Router } from 'express';
import {  loginUser, registerUser } from '../controllers/authController.js';

const router = Router();

// Route untuk login
router.post('/login', loginUser);

// Route untuk register
router.post('/register', registerUser);

export default router;
