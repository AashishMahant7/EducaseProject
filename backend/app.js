const express = require('express');
const cors = require('cors');
const schoolRoutes = require('./routes/schoolRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/schools', schoolRoutes);
app.use(errorMiddleware);

module.exports = app;
