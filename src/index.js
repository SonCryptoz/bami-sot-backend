const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();

const app = express();

const db = require('./config/database');
const route = require('./routes');
const uploadRoute = require('./routes/uploadRouter'); 

db.connect();

app.get("/", (req, res) => {
    return res.send("Hello Suka");
});

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Static folder để có thể truy cập file được upload
app.use('/uploads', express.static(path.join(__dirname, '../src/uploads')));

// Routes init
route(app);
app.use(uploadRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Server listening on port " + port);
});