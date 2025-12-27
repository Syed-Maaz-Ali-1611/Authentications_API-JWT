import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
//routes
app.use("/api/auth" , authRoutes)

export default app;