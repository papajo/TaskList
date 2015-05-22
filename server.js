var express = require('express');
var bodyParser = require('body-parser');
var DataModel = require('./db/schemas/datamodel');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var mysecret = require('./secret');

var app = express();
app.use(bodyParser.json());
app.use(require('./authtransform'));

app.post('/api/register', function(req, res, next) {
	var user = new DataModel.User();
	user.username = req.body.username;
	user.booklist = [];
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		user.password = hash;
		user.save(function(err, user) {
			if(err) { return (next(err)); }
			res.sendStatus(200);
		});
	});
});

app.post('/api/login', function(req, res, next) {
	DataModel.User.findOne({username: { $in: [req.auth.username] } })
	.select('password').select('username')
	.exec(function(err, user) {
		if (err) { return next(err); }
		if (!user) { return res.sendStatus(401); }
		bcrypt.compare(req.body.password, user.password, function(err, valid) 
	    {
	    	if (err) { return nex(err); }
	    	if (!valid) { return res.sendStatus(401); }
	    	var token = jwt.encode({
	    		username: user.username }, mysecret.secret);
	    	res.send(200).send(token);
	    	});
		});
});	

app.get('/api/user', function(req, res, next) {
	if (!req.auth) {
		return res.sendStatus(401);
	}
	DataModel.User.findOne({username: { $in: [req.auth.username] } },
	function (err, user) {
		if(err) { return next(err); }
		user.booklist = re.body.booklist;
		user.save(function(err, user) {
			if (err) { return(next(err)); }
			res.status(200).json(user);
		})
		
	});
});


app.listen(8080, function() {
	console.log('Server listening on... ' + 8080)
});