import express from 'express';
import {
  register,
  login,
  updateProfile,
  deleteUser,
  changePassword,
  getUserById
} from '../controllers/auth.controller.js';
import  authMiddleware  from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (authenticated users)
router.put('/profile', authMiddleware, updateProfile);
router.delete('/user/:id', authMiddleware, deleteUser);
router.put('/change-password', authMiddleware, changePassword);
router.get('/users/:id', authMiddleware, getUserById);
export default router;  
