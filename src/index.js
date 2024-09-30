const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

const db = require('./config/database');
const route = require('./routes');

db.connect();

app.get("/", (req, res) => {
    return res.send("Hello Suka");
});

app.use(bodyParser.json());

// Routes init
route(app);


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Server listening on port " + port);
});