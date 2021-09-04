require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');


// Import Routes
const UserRoutes = require('./routes/user');
const QuoteRoutes = require('./routes/quote');

// Set Port
const PORT = process.env.PORT || 3000;

mongoose.set('useFindAndModify', false);
// connect to MongoDB
mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// handle mongo events
// This event is fired when the connection is successfully connected.
mongoose.connection.on('connected', function(){
  console.log('Connected successfully to database');
})


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/users', UserRoutes);
app.use('/api/quotes', QuoteRoutes);


app.listen(PORT, function(){
    console.log(`listening to Port ${PORT}`);
})