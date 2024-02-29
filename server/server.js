const express = require('express');
const app = express();
const PORT = 3000;

const sendEmail = require('./controllers/sendMail.js');
app.get('/email', sendEmail);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
