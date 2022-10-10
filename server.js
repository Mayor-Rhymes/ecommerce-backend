require('dotenv').config();

const mongoose = require('mongoose');

const express = require('express');




const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


const {connectDB} = require('./config/db.js');
const {errorHandler} = require('./middleware/errorMiddleware');


connectDB();




const port = process.env.PORT || 5000;


const itemRoute = require('./routes/item');
const userRoute = require('./routes/user');


app.use('/api/v1/items', itemRoute);
app.use('/api/v1/users', userRoute);


app.use(errorHandler);



mongoose.connection.once('open', () => {


    console.log("Connected to MongoDB");
    app.listen(port, () => {

        console.log(`Listening on port ${port}`);
    })
})

mongoose.connection.on("error", (err) => {

   console.log(err);

})

