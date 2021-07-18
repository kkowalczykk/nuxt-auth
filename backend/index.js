const express = require("express");
//const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// SET UP EXPRESS
const app = express();
//app.use(cors());
app.use(express.json());

// Set port - if not specified in process.env set 5000
const PORT = process.env.PORT || 5000;

// Listen app on PORT
app.listen(PORT, () => console.log(`The server has started on port:  ${PORT}`));

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, options, (err) => {
    if (err) throw err;
    console.log(`MongoDB connection established.`);
});

app.use('/api/users', require('./routes/usersRouter'));

