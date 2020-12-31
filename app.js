const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.use(express.static("public"));

app.post("/", function(req, res) {
    var firstName = req.body.inputFirstName;
    var lastName = req.body.inputLastName;
    var email = req.body.inputEmail;
    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }

    var jsonData = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/99ade4043b";

    const option = {
        method: "POST",
        auth: "gam92:df2eec6517b370c4f2e45fda6679663f-us7"
    };
    console.log(res.statusCode);
    const request = https.request(url, option, function(response) {
        if (request.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));

        });
    });

    request.write(jsonData);
    request.end();

    app.post("/failure", function(req, res) {
        res.redirect("/");
    })

    console.log("Full Name is " + firstName + " " + lastName + ", email: " + email);
});



app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000");
});

// API key
// df2eec6517b370c4f2e45fda6679663f-us7

// Audience unique id
// 99ade4043b