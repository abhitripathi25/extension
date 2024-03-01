const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 3000;
require('dotenv').config();
const mongoseurl=process.env.MONGO_URL
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const sendEmail = require('./controllers/sendMail.js');
app.get('/email', sendEmail);

// MongoDB connection
mongoose.connect(mongoseurl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Check MongoDB connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define schema for the data
const dataSchema = new mongoose.Schema({
    url: String,
    class: String
});

// Define model for the data
const Data = mongoose.model('Data', dataSchema);

// Route for POST API
// Route for POST API
app.post('/api/data', (req, res) => {
    // Extract URL and class from request body
    const { url, class: classValue } = req.body;

    // Create new data instance
    const newData = new Data({
        url,
        class: classValue
    });

    // Save data to MongoDB
    newData.save()
        .then(() => {
            res.status(201).send('Data saved successfully');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error saving data to database');
        });
});




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});