var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('./models/User');
var axios = require('axios');
var Block = require('./models/Block');
var WebSocket = require('ws');

var index = require('./routes/index');

var app = express();

// Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/kcoin';
mongoose.connect(mongoDB);

// Get the default connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());

var opts = {};
opts.secretOrKey = require('./jwt-key').privateKey;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  console.log('Jwt Statery check');
  User.findOne({email: jwt_payload.email}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use('/api', index);


app.get('/init', (req, res) => {
  const blockPerPage = 100;
  let numberOfBlock = 1001;

  // remove all records
  Block.remove({}, (err) => {
    if (err)
      console.log("can not remove all block records.");
    else
      console.log("remove all block records.");
  });

  for (var idxTry = 0; idxTry < (numberOfBlock / blockPerPage); idxTry++) {
    axios({method: 'get', url: `https://api.kcoin.club/blocks?limit=${blockPerPage}&offset=${blockPerPage * idxTry}`})
    .then((response) => {
      numberOfBlock = response.headers['x-total-count'];
      
      console.log(response.request.path);


      response.data.map((block) => {
        const mongoBlock = new Block({...block});
  
        mongoBlock.save((err) => {
          if (err)
            console.log("block error: ", block.hash, err);
        });
      });
    })
    .catch((err) => {
      res.send(err);
    })
  }

  res.send({flag: 1, msg: "OK"});
});

const wsServer = new WebSocket("wss://api.kcoin.club");

wsServer.on('open', () => {
  console.log('WebSocket is listening');
});

wsServer.on('close', () => {
  console.log('WebSocket connection closed.');
})

wsServer.on('message', (response) => {
  data = JSON.parse(response);
  console.log('Socket received: ' + data.type);

  if (data.type === 'block') {
    console.log('Received block: ' + data.data.hash);
    const mongoBlock = new Block({...data.data});
  
    mongoBlock.save((err) => {
      if (err)
        console.log("block error: " + data.data.hash, err);
    });
  }
});


const interval = setInterval(() => {
  wsServer.ping('', true, false);
}, 30000);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
