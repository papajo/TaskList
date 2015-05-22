var db = require('../../db');
var Schema = db.Schema;
var BookSchema = new Schema({
	title: { type: String, required: true },
	category: { type: String, required: true },
	link: { type: String, required: true, default: "http://www.amazon.com" },
	date: { type: Date, required: true , default: Date.now } 
});

var UserSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	booklist: { type: Array(BookSchema), required: false, default: []
       }
});

var DataModel = {
	Book: db.model('Book', BookSchema),
	User: db.model('User', UserSchema)
};

module.exports = DataModel;	

