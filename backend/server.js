const express=require('express');
const mongoose = require('mongoose');
const cors= require('cors');
require('dotenv').config();

const app=express();
const PORT= 5000;

//Middleware
app.use(express.json);
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, {}) 
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.log(err);
    });

   
app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});