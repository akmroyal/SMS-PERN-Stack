const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const router = require('./routes/routes.js');


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);


// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})



