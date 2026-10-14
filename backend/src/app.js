import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import apiRoutes from './routes/index.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Enable CORS
app.use(cors({
  origin: [config.clientUrl, 'http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SkillBridge Volunteer Mentorship API',
    documentation: '/api/health',
    version: '1.0.0'
  });
});

// Mount API routes
app.use('/api', apiRoutes);

// Catch 404 and forward to error handler
app.use(notFoundHandler);

// Central error handler
app.use(errorHandler);

export default app;

