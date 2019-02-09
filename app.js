let express = require("express"),
    methodOverride = require("method-override"),
    app = express(),
    constants = require('./utils/constant'),
    utilsFunctions = require('./utils/functions'),
    cors = require('cors'),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

let emailRoutes = require("./routes/email");

// App Config

mongoose.connect("mongodb://eric:qwe123@ds127545.mlab.com:27545/ico-buildabilty");

app.use(bodyParser.json({extended: true}));
app.use(cors());
app.use(methodOverride("_method"));


app.use('/email', emailRoutes);


const port = process.env.PORT || 7001;
app.listen(port);

console.log(`Buildabilty Server listening on ${port}`);

module.exports.app = app;