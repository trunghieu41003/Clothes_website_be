const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const YAML = require('yaml');
const swaggerUi = require('swagger-ui-express');

// Swagger config
const file = fs.readFileSync(path.resolve('swagger_api_doc.yaml'), 'utf8');
const swaggerDocument = YAML.parse(file);

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/users', require('./routes/user.route'));
app.use('/api/products', require('./routes/product.route'));
app.use('/api/categories', require('./routes/category.route'));
app.use('/api/orders', require('./routes/order.route'));
app.use('/api/quotes', require('./routes/quote.route'));
app.use('/api/posts', require('./routes/post.route'));

// 404 fallback
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found.' });
});

// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
