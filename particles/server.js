var util = require("util"),
    io = require("socket.io"),
    express = require("express"),
    app = express();

app.get('/', function(req,res) {
  res.sendfile('./index.html');
});
app.use(express.static('./'));
socket = io.listen(app.listen(3000));


