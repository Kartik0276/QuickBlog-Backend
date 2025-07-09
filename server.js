import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import aiRouter from './routes/aiRoutes.js';

const app = express();

// Connect to database with error handling
try {
  await connectDb();
  console.log('✅ Database connected successfully');
} catch (error) {
  console.error('❌ Database connection failed:', error);
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.send('Server is working!');
});

// API Routes
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);
app.use('/api/ai', aiRouter);

// Global error handler
app.use((error, req, res, next) => {
  console.error('❌ Server Error:', error);
  res.status(500).json({
    success: false,
    message: error.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
