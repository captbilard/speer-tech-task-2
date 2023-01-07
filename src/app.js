const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());



app.use(express.static("static"));


app.get("/", (req, res) => {
  res.json({message:"hello from server"})
});

module.exports = app
