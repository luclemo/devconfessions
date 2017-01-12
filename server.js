'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const superagent = require('superagent');
const app = express();
	
var MongoClient = require('mongodb').MongoClient;

app.use(express.static( __dirname + '/'))
app.use(bodyParser.urlencoded({extended: true}))

var url = 'mongodb://localhost:27017/devconfessions';
MongoClient.connect(url, function(err, db) {
	if (err) {
	console.log(err);
	}
	
	// get approved confessions
	app.get('/confession', (req, res) => {
		db.collection('confessions').find({status:''}, {confession: 1, _id: 0}).toArray(function(err, items) {
			if (err) {
				return res.status(500).json({
					error: err.message
				});
			}
			// create array of confessions
			let confessionsArray = items.map(function(item) {
				return item.confession;
			});
			res.json(confessionsArray);
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
}); // end MongoClient

app.listen(4000, function() {
  console.log('listening on 4000')
})

// Display index
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
