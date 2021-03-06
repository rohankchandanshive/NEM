if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true});

const db = mongoose.connection;

db.on('error', error => console.log('Mongoose connection error',error))
db.once('open', () => console.log('Mongoose connected'))
const routerIndex = require('./routes/index') 

app.get('/', routerIndex);


app.listen(process.env.PORT || 3000 , ()=>{
    console.log('listening on port 3000');
})