const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.use(express.static("public"));

// app.post("/", function(req, res) {
//     var firstName = req.body.inputFirstName;
//     var lastName = req.body.inputLastName;
//     var email = req.body.inputEmail;
// })


app.listen(3000, function() {
    console.log("Server is running on port 3000");
});