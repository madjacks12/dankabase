import 'bootstrap/dist/css/bootstrap.min.css';
const apiKey = require('./../../.env').apiKey;

$(document).ready(function () {
	//flavorDropdown Promise API
	let flavorDropdown = new Promise(function (resolve, reject) {
		let request = new XMLHttpRequest();
		let url = `http://strainapi.evanbusse.com/${apiKey}/searchdata/flavors`;
		request.onload = function () {
			if (this.status === 200) {
				resolve(request.response);
				console.log("request.response" + request.response);
			} else {
				reject(Error(request.statusText));
				console.log("request.statusText" + request.statusText);
			}
		}
		request.open("GET", url, true);
		request.send();
		console.log("request");
	});
	//effectsDropdown Promise API
	let effectsDropdown = new Promise(function (resolve, reject) {
		let request = new XMLHttpRequest();
		let url = `http://strainapi.evanbusse.com/${apiKey}/searchdata/effects`;
		request.onload = function () {
			if (this.status === 200) {
				resolve(request.response);
				console.log("request.response" + request.response);
			} else {
				reject(Error(request.statusText));
				console.log("request.statusText" + request.statusText);
			}
		}
		request.open("GET", url, true);
		request.send();
		console.log("request");
	});
	// jQuery Flavor dropdown
	flavorDropdown.then(function (response) {
		let body = JSON.parse(response);
		let i = 0;
		for (i = 0; i < body.length; i++) {
			$('#flavor-choice').append("<option value=" + `${body[i]}` + ">" + `${body[i]}` + "</option>");
		}
	}, function (error) {
		$('.showErrors').text(`There was an error processing your request: ${error.message}`);
	});
	// jQuery Effects dropdown
	effectsDropdown.then(function (response) {
		let body = JSON.parse(response);
		let i = 0;
		for (i = 0; i < body.length; i++) {
			if (body[i].type == "positive") {
				$('#effect-choice').append("<option value=" + `${body[i].effect}` + ">" + `${body[i].effect}` + "</option>");
			}
		}
	}, function (error) {
		$('.showErrors').text(`There was an error processing your request: ${error.message}`);
	});
	// jQuery Type dropdown
	effectsDropdown.then(function (response) {
		let body = JSON.parse(response);
		let i = 0;
		for (i = 0; i < body.length; i++) {
			if (body[i].type == "medical") {
				$('#type-choice').append("<option value=" + `${body[i].effect}` + ">" + `${body[i].effect}` + "</option>");
			}
		}
	}, function (error) {
		$('.showErrors').text(`There was an error processing your request: ${error.message}`);
	});

	//Strain Query
	$('.strain-query').submit(function (event) {
		event.preventDefault();
		$("#table").empty();
		$("#table").append("<tr><th>Name</th><th>Race</th><th>Flavor</th><th>More Info</th></tr>");
		let flavor = $('#flavor-choice option:selected').text()
		console.log(flavor);


		let strainQuery = new Promise(function (resolve, reject) {
			let request = new XMLHttpRequest();
			let url = `http://strainapi.evanbusse.com/${apiKey}/strains/search/flavor/` + `${flavor}`;
			request.onload = function () {
				if (this.status === 200) {
					resolve(request.response);
					console.log("request.response" + request.response);
				} else {
					reject(Error(request.statusText));
					console.log("request.statusText" + request.statusText);
				}
			}
			request.open("GET", url, true);
			request.send();
			console.log("request");
		});

		strainQuery.then(function (response) {
				let i = 0;
				let body = JSON.parse(response);
				for (i = 0; i < body.length; i++) {
					let removeSymbols = body[i].name.replace(/[^(a-zA-Z)\d\s-]/g, "");
					let parseName = removeSymbols.replace(/\s/g, '-').toLowerCase();
					let leaflyUrl = `https://www.leafly.com/` + `${body[i].race}` + `/` + parseName;
					$('#table').append('<tr><td>' + `${body[i].name}` + '</td><td>' + `${body[i].race}` + '</td><td>' + `${body[i].flavor}` + '</td><td>' + "<a href=" + leaflyUrl + "><button class=btn btn-success> Learn More </button></a>" + '</td></tr>');
				}
			},
			function (error) {
				$('.showErrors').text(`There was an error processing your request: ${error.message}`);
			});
	}); //End of the FormId form submit event
}); //End of the document.ready function
