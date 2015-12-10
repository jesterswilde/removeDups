var mongoose = require('mongoose'); 

var dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost/removeDups';
mongoose.connect(dbURI);
var db = mongoose.connection;


var entrySchema = new mongoose.Schema({
	theCollection: {type: String, index: true},
	name: {type: String}, 
	index: {type: Number}
});
entrySchema.index({theCollection: 1, name: 1}, {unique: true});
entryModel = mongoose.model('Entry', entrySchema); 

var findMaxID = function(collection, cb){
	console.log('looking up max'); 
	entryModel
		.findOne({ theCollection: collection })
		.sort('-index')  // give me the max
		.exec(cb);
};


exports.entry = entryModel; 
exports.findMax = findMaxID;

/*
Member
  .findOne({ country_id: 10 })
  .sort('-score')  // give me the max
  .exec(function (err, member) {

    // your callback code

  });
  */