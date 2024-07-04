// index.js

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const emailRoutes = require('./routes/emailRoutes');
const morgan = require('morgan');
const { initializeSocket } = require('./config/socket');

dotenv.config('.env');

const app = express();
const server = http.createServer(app);

const io = initializeSocket(server);

mongoose.connect(process.env.MONGO_URI);

app.use(morgan('tiny'));
app.use(cors({ credentials: true, origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', emailRoutes);

app.all('*', (req, res) => {
    res.json({ message: `${req.url} Not Found'` });
});

const PORT = process.env.PORT || 8081;

server.listen(PORT, () => {
    console.log(`communication Server is running on port http://localhost:${PORT}`);
});
