let mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://mygstbill:${process.env.DB_PASS}@cluster0.vflma.mongodb.net/mygstbill?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let db = mongoose.connection;

db.on('open', () => {
    console.log("Conncected to the database successfully");
})

db.once('error', () => {
    console.log("There was some error connecting to the database")
})