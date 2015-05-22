var jwt = require('jwt-simple');
var mysecret = require('./secret');

module.exports = function(req, res, next) {
	if (req.headers['x-auth'])  {
		req.auth = jwt.decode(req.headers['x-auth'], mysecret.secret);
	}
	next();
}