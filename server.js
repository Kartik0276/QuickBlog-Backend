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
const allowedOrigins = [
  'http://localhost:5173',
  'https://quick-blog-frontend-qm0gr8l7x-kartik-maitys-projects.vercel.app',
  'https://quick-blog-frontend-qm0gr8l7x-kartik-maitys-projects.vercel.app/',
  // Add more domains as needed
];
app.use(cors({
  origin: function (origin, callback) {
    console.log('CORS request from origin:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
