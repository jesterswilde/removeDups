var express = require('express'); 
var morgan = require('morgan'); 
var bodyParer = require('body-parser');
var entryDB = require('./schema.js'); 
var app = express(); 

app.use(morgan('tiny')); 
app.use(bodyParer.urlencoded({extended: false}));

app.post('/api', function(req,res){
	var values = req.body['values[]']; 
	var results = []; 
	var index = 0; 
	entryDB.findMax(req.body.collection, function(err, entry){
		console.log(err,entry); 
		if(entry){
			index = entry.index; 
		}
		for(var i = 0; i < values.length; i++){
			results.push({
				theCollection: req.body.collection,
				name: values[i], 
				index: ++index
			})
			entryDB.entry.create(results); 
		}
		res.sendStatus(202); 
	})
});
app.get('/api/*', function(req,res){
	console.log(req.params[0]);
	entryDB.entry.find({theCollection: req.params[0]}).sort({index:1}).exec(function(err, results){
		res.status(200).send(results); 
	});
});

app.use(express.static(__dirname + '/public'));
app.get('/*',function(req,res){
	console.log(req); 
	res.sendfile(__dirname + '/public/index.html');
});

var port = process.env.port || 3000; 
app.listen(port); 
