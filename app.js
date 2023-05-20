require('dotenv').config();
const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const connectDB=require('./server/config/db');
const session=require('express-session');
const passport=require('passport');
const MongoStore=require('connect-mongo');


const app=express();
const port=5000 || process.env.PORT;


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
//connect Database
connectDB();
//STatic Files
app.use(express.static('public'));

//Templating ENgine
app.use(expressLayouts);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

//routes
app.use('/',require('./server/routes/auth'));
app.use('/',require('./server/routes/index'));
app.use('/',require('./server/routes/dashboard'));


app.listen(port, ()=>{
    console.log(`App Listening on port ${port}`);
});