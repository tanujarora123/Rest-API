const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./Routes/mem');
const connectionString = require('./config/keys').Mongo_URI;

const app = express();

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(3000, console.log('Server Running')))
    .catch((err) => console.log(err));

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.send('Hello!!');
});
