const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
// connectDB(); // Will be called in server.js

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security headers
// Security headers
app.use(helmet({
  contentSecurityPolicy: false,
}));

// Enable CORS
app.use(cors());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Route files
const auth = require('./routes/auth');
const tasks = require('./routes/tasks');

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/tasks', tasks);

// Error handler
app.use(errorHandler);

module.exports = app;
