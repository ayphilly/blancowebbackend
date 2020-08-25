var mongoose = require('mongoose');
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require('gridfs-stream');
const dotenv = require('dotenv')

// var URL = process.env.URL || 'mongodb://127.0.0.1/CRUD_DB';
// var URL = "mongodb+srv://blancoweb:blancoweb@blancocluster.gcvo1.mongodb.net/Blanco?retryWrites=true&w=majority";
var URL = "mongodb+srv://blancoweb:blancoweb@blancocluster.gcvo1.mongodb.net/Blanco?retryWrites=true&w=majority";
// var URL = process.env.URL

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://blancoweb:<password>@blancocluster.gcvo1.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify',false);



mongoose.connect(URL, {
    useNewUrlParser : true,
    useUnifiedTopology: true
});


var conn =   mongoose.connection;

conn.on('error', () => {
    console.error('error connecting to db')
});

// db.on('open', ()=> {
//     console.log('connection to db successful')
// });

let gfs;
conn.once("open", () => {
    //init stream
    console.log('connection to db successful')
    gfs = Grid(conn.db, mongoose.mongo);  
    gfs.collection('uploads');
})
