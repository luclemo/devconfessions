/*
-------------------- TODO --------------------
1. Fix nextConfession() to cycle through each confession on click
	 1.1 should start all over when it gets to the end
*/ 


function displayLatestConfession() {
	superagent
		.get('/confession')
		.end(function (err, res) {
			if (err) {
				return console.log(err, 'error!');
			}
			console.log(res.body);
			const textArray = res.body;
			const latestConfession = textArray[textArray.length - 1];
			document.getElementById('conf').innerText = latestConfession;
		})
}

// Get next confession on click
document.getElementById('nextConfession').onclick = function() {
	superagent
			.get('/confession')
			.end(function (err, res) {
				if (err) {
					return console.log(err, 'error!');
				}
				const textArray = res.body;
				nextConfession(textArray);
	})
}

function nextConfession(array) {
	var i = 0;
	if (i == array.length) { i = 0; }
	i = i++;
	console.log(array[i]);
}


// Get random item without repeating
function randomNoRepeats(array) {
  var copy = array.slice(0);
  if (copy.length < 1) {
  	copy = array.slice(0);
  }
  var index = Math.floor(Math.random() * copy.length);
  var item = copy[index];
  copy.splice(index, 1);
  return item;
}


displayLatestConfession();

