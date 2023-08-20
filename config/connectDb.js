const mongoose = require('mongoose');
const colors = require('colors');


const connectDb = async () => {

    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`server running on ${mongoose.connection.host}`.bgCyan);

    }catch(error){
        console.log(`${error}`.bgRed);
    }

}


module.exports = connectDb;





// import mongodb from 'mongodb';
// const mongodb = require('mongodb');

// const MongoClient = mongodb.MongoClient;

// // const uri = "mongodb+srv://mdhrahman532:HabiburrahmanMongodb123@@cluster0.n6rsvv3.mongodb.net/?retryWrites=true&w=majority";
// const uri = "mongodb+srv://mdhrahman532:HabiburrahmanMongodb123%40@cluster0.n6rsvv3.mongodb.net/expenseApp?ssl=true&authSource=admin&w=majority";


// const client = new MongoClient(uri, { useNewUrlParser: true });

// client.connect(err => {
//   const collection = client.db("expenseApp").collection("users");
//   // perform actions on the collection object
//   client.close();
// });

// module.exports = client;