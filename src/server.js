const express = require('express')
const app = express()
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const diaryRoutes = require('./routes/diaryRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const YAML = require('yaml');
const path = require('path');
const file = fs.readFileSync(path.resolve('swagger_api_doc.yaml'), 'utf8');
const swaggerDocument = YAML.parse(file);
const cors = require('cors'); // Import cors

app.use(cors());
app.use(express.json());
// Sử dụng routes cho người dùng
app.use('/api/users', userRoutes); // Tất cả các route liên quan đến người dùng sẽ bắt đầu với /users
// Other routes
app.use('/api/diaries', authMiddleware, diaryRoutes);
app.use('/api/exercises', authMiddleware, exerciseRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(process.env.PORT)