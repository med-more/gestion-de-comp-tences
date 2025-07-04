const express = require('express');
const connectDB = require('./config/db');
const competenceRoutes = require('./routes/competenceRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();
connectDB();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/api/competences', competenceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));