require('dotenv').config()

let express = require('express')
let morgan = require('morgan')
let helmet = require('helmet')
let cors = require('cors')
let routes = require('./routes')

let app = express()
require('./database')

//all the middlewares
app.use(helmet())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', routes)

//error handler
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({
        msg: "There was some internal server error. Try again after sometime.",
        result: false
    })
})

//404 route
app.all("*", (req, res) => {
    res.status(404).send({
        msg: "No route matched to the given route. Please check and try again",
        result: false
    })
})

let PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server started successfully on port ${PORT}`))