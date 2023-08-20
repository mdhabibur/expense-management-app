//packages
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");
const path = require("path");

const userModel = require("./models/userModel");

//config dotenv package
dotenv.config();

//database call
connectDb();

/*

MongoDb cluster-0 credentials:
user name:mdhrahman532
pass:HabiburrahmanMongodb123@
My IP Address : 103.94.134.48/32

*/

const app = express();

//middle wares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// routes
// app.get('/', (req,res) => {
//     res.send('<h1>Hello2 from server(backend)</h1>');
// });

//setting routes
//'users' endpoint/routes
// app.use('/users',require('./routes/userRoute'));

app.use("/users", require("./routes/userRoute"));

//transactions routes
// app.use('/transactions', require('./routes/transactionRoute'));
app.use("/transactions", require("./routes/transactionRoute"));

//static files (for server)
//server will read the necessary files to run the website
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

/*


****** for setting the route not like this (/user) [means for not giving forward slice before user] we are getting error
********

app.use('/users/register', async (req, res) => {
    try{
       const newUser = new userModel(req.body);
       await newUser.save();

       res.status(201).json({
        success:true,
        newUser,
       });

    }catch(error){
        res.status(400).json({
            success:false,
            error,
        });

    }


}

)



*/

//port
const PORT = 8080 || process.env.PORT;

//listening server
app.listen(PORT, () => {
	console.log(`server running on port${PORT}`);
});
