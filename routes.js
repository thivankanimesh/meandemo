var express = require('express')
var router = express.Router()
const mongoose = require('mongoose')

// Mongo DB Connection 
mongoose.connect('mongodb://localhost/testdb')
var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('We are connected!!!')
})

// Schemas
var userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    age: Number
})
var User = mongoose.model('user', userSchema)

// Middlewares
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

// Routers
router.get('/', function (req, res) {
    res.sendFile(__dirname+'/public/index.html')
})

router.get('/adduser', function (req, res) {

    var obj = {
        "fname": req.query.fname,
        "lname": req.query.lname,
        "age": req.query.age
    }

    var user = new User(obj)

    user.save(function (error) {
        if (error) {
            console.log(error)
        }
        console.log("User saved")

    })

    res.redirect('/')
})

router.get('/getuser', function (res, req) {

   function name(){
    User.findOne({'fname':req.query.fname},function(err,person){
        if(err) return handleError(err);
        return person.fname;
    })
   }

    res.send(name())

    req.redirect("/")
})

module.exports = router