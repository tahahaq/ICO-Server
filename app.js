let express = require("express"),
    methodOverride = require("method-override"),
    app = express(),
    constants = require('./utils/constant'),
    utilsFunctions = require('./utils/functions'),
    cors = require('cors'),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

let emailRoutes = require("./routes/email");
let userRoutes = require("./routes/user");


// App Config

mongoose.connect("mongodb://eric:qweasd123@ds127545.mlab.com:27545/ico-buildabilty");

app.use(bodyParser.json({extended: true}));
app.use(cors());
app.use(methodOverride("_method"));


app.use('/email', emailRoutes);
app.use('/user', userRoutes);



const port = process.env.PORT || 4000;
app.listen(port);

console.log(`Buildabilty Server listening on ${port}`);

module.exports.app = app;