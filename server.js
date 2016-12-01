'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
var MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true}))

var url = 'mongodb://localhost:27017/devconfessions';
MongoClient.connect(url, function(err, db) {
	console.log(err);
	
	// show confessions
	app.get('/confession', (req, res) => {
		db.collection('confessions').aggregate([{'$sample': {'size': 1 }}], function(err, item) {
			if (err) {
				return res.status(500).json({
					error: err.message
				});
			}
			res.json(item);
		});
	});

	// add confession
	app.post('/confession', (req, res) => {
		console.log(req.body);
		db.collection('confessions').insert({
			'confession' : req.body.confession,
			'status' : 'pending'
		}, function (err) {
			if (err) {
				return res.status(500).json({
					error: err.message
				});
			}
			res.redirect('/');
		})
	})
});

app.listen(4000, function() {
  console.log('listening on 4000')
})

// Display index
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
