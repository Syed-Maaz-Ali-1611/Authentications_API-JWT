import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import app from './src/app.js';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

// Correct GET route for root path
app.get("/", (req, res) => {
  console.log("Root route accessed");
  res.json({ 
    message: "Server is running",
    status: "success",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});