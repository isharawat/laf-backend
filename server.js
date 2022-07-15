var express = require('express')
const app = express()
require("dotenv").config({path: '../.env'});
const cors =require('cors')
// const port = 5000
const port = process.env.PORT || 5000;
const cookie_parser=require("cookie-parser")
const mongoose =require('mongoose')
const routes = require('./routes/auth')
const category = require('./routes/category')
const passport = require('passport');
var path = require('path');
app.use(cors())


// app.use('/public',express.static('./uploads'))
app.enable("trust proxy")
// app.use(fileUpload())
// app.use(cors())//avoid inter port communication error
app.use(cors({
    origin:"https://lfs-project.herokuapp.com",
    credentials: true
}));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(cookie_parser())

app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(`mongodb+srv://isha_03:<password>@cluster0.kytibw0.mongodb.net/lsf?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
})

mongoose.connection.on('connected',()=>{
    console.log('Database connected !')
})

app.use('/',routes)
app.use('/',category)


app.listen(port,()=> console.log(`Listening to port ${port} !!`))