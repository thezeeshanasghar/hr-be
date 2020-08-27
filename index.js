var express = require('express');
var routes = require('./config/routing')
var bodyParser = require("body-parser");
var app = express();


const cors = require('cors');
app.use(cors());
app.options('*', cors());

app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.text());

routes(app);

const PORT = process.env.PORT || 5000


app.listen(PORT, function () {

	console.log('Server is running..');
});