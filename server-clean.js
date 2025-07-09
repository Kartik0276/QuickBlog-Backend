import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is working!', status: 'success' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Clean server running at http://localhost:${PORT}`);
});
