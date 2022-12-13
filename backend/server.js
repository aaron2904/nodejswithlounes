const http = require("http"),
      cors = require('cors'),
      express = require('express'),
      dotenv = require('dotenv'),
      path = require('path'),
      Sequelize = require('./app/config/db'),
      passport = require('passport'),
      passportConfig = require('./app/config/passport');

dotenv.config( { path: path.resolve(__dirname, '.env')})

const app = express()

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
}))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

require('./app/routes/index')(app)

passport.use(passportConfig.localStrategy)
passport.use(passportConfig.JwtStrategy)

app.get('/', (req, res) => {
    res.send(`Server running at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
})

app.use((req, res) => {
    res.status(404)
    res.send('Not found')
})

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, (err) => {
    if(err){
        console.log('Error in server setup')
    }
    else{ 
        console.log(`Server running at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`) 
    }
})
