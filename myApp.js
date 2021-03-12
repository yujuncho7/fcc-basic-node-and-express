const bodyParser = require('body-parser');
var express = require('express');
var app = express();

// MIDDLEWARE
app.use(function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});
app.use("/public", express.static(__dirname + "/public"));
app.use('/name', bodyParser.urlencoded({extended: false}));

// ROUTES
app.get("/", (req, res) => {
    const absPath = __dirname + "/views/index.html";
    res.sendFile(absPath);
});

app.get('/json', function(req, res) {
    res.json({
        "message": process.env.MESSAGE_STYLE == "uppercase" ? "HELLO JSON" : "Hello JSON"
    });
});

app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({ "time": req.time });
});

app.get('/:word/echo', function(req, res) {
    res.json({ "echo": req.params.word });
});

app.route('/name').get(function(req, res) {
    res.json({ "name": `${req.query.first} ${req.query.last}` });
}).post(function(req, res) {
    res.json({ "name": `${req.body.first} ${req.body.last}` });
});































 module.exports = app;
