const express = require('express')
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const config = require('./config')

const contactRoutes = require("./routes/contacts");

mongoose.connect("mongodb://localhost/contacts");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(cors())

app.use("/contacts", contactRoutes);

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})
