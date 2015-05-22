var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/books', function() {
	console.log('mongodb connected to books');
});

module.exports = mongoose;
