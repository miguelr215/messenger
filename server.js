var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// using index.html to create the static html structure
app.use(express.static(__dirname));
// use body-parser so express can parse json for responses
app.use(bodyParser.json());
// use body-parser so posts from browser to back-end can be read
app.use(bodyParser.urlencoded({extended: false}));

// create placeholder array message list
var messages = [
    {name: "Ken", message: "Hi"},
    {name: "Barby", message: "Hee hee.. hi"}
];

// create a GET endpoint to get the messages
app.get('/messages', (req, res) => {
    res.send(messages);
});

// create a POST endpoint to post the messages
app.post('/messages', (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body);  // notifies all clients of new message
    res.sendStatus(200);
});

// socket connection event to notify when new user connects
io.on('connection', (socket) => {
    console.log('user connected');
});

// var server = app.listen(3000, () => {
//     console.log('server is listening on port', server.address().port);
// });
var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port);
});
