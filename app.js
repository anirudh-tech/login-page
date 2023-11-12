const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/users.js')


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("views"));


const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismykey",
    saveUninitialized:false,
    cookie: { maxAge: oneDay },
    resave:false 
}));
  
app.use((req,res,next)=>{    
    res.setHeader('Cache-Control','no-store');
    next()
}) 
app.use("/",userRouter);

app.set('view engine','ejs')  
app.use((req,res,next)=>{
    res.status(404).send('<h1>404 error!</h1>')
}) 

  

app.listen(3000); 

module.exports = app
