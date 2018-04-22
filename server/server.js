var express = require('express')
var bodyParser = require('body-parser')
var router2 = express.Router();
var router3 = express.Router();

var app = express();

app.use(require('nwb/express')(express, options = {
  reload: false
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./mail.js')(router2);
require('./mailandnotification.js')(router3);

app.use('/message-rest-ui/api',router2);
app.use('/inbox-rest-ui/api',router3);

app.set("port", process.env.PORT || 3001);

app.listen(3001, function(err) {
  if (err) {
    console.error('error starting server:')
    console.error(err.stack)
    process.exit(1)
  }
  console.log('server listening at http://localhost:3001')
})
