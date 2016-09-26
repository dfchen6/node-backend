var mongoose = require('mongoose'),
	assert = require('assert');

var Dishes = require('./models/dishes')

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
	console.log("Connected correctly to the server");

	Dishes.create({
		"name": "Kung Pao Chicken",
      	"image": "images/kpChicken.png",
      	"category": "mains",
      	"label": "Hot",
      	"price": "$1,200.55",
      	"description": "A unique . . .",
      	"comments": [
        	{
          		"rating": 5,
          		"comment": "Fantastic!",
          		"author": "Donald Trump"
        	},
        	{
          		"rating": 4,
          		"comment": "Above average",
          		"author": "Hilary Clinton"
        	}
      	]
	}, function (err, dish) {
		if (err) throw err;
		console.log('A new dish created!');
		console.log(dish);

		var id = dish._id;

		// query for all dishes and update description
		setTimeout(function() {
			Dishes.findByIdAndUpdate(id, {
				$set: {
					description: "Updated description"
				}
			}, {
				new: true
			})
			.exec(function (err, dish) {
				if (err) throw err;
				console.log('Description of dish updated!');
				console.log(dish);
				db.collection('dishes').drop(function () {
					db.close();
				});
			});
		}, 3000);
	});
});
