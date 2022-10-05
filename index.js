const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const routes = require('./routes/routes');
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error',(error)=>{
    console.log(error);
});
database.once('connected',()=>{
    console.log('database connected');
})
const app = express();
//TEST

const corsOption = {
    origin: ['https://testtechniqye-100.herokuapp.com','http://localhost:3000'],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
};
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"),
    res.header("Access-Control-Allow-Origin", "https://testtechniqye-100.herokuapp.com"),

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
    next()
  });
  app.use(cors(corsOption));

app.use(express.json());
app.use('/api', routes);
const PORT = process.env.PORT ||5000;

app.listen(PORT, () => {
    console.log(`Server Started at ${5000}`)
})