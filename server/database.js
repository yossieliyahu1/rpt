

// step 1 - require mongoose
var mongoose = require('mongoose');

// step 2 - connect to the database
// mongoose.connect('mongodb://localhost/[the name of the database]'
<<<<<<< HEAD
mongoose.connect('mongodb://localhost/reports'); // mongo-vertical-report-1.doronaviguy.cont.tutum.io:32773
=======
mongoose.connect('mongodb://204.145.74.4:27017/reports');
>>>>>>> 1d55bf55d2aa49737095fca81fbddf15b2c8e64b

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log("DB is now connected.");
});
