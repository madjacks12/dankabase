import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function () {
	//flavorDropdown Promise API
	let flavorDropdown = new Promise(function (resolve, reject) {
		let request = new XMLHttpRequest();
		let url = `http://strainapi.evanbusse.com/ptkY9A6/searchdata/flavors`;
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
		// $('.flavors').text(`${response}`);
	}, function (error) {
		$('.showErrors').text(`There was an error processing your request: ${error.message}`);
	});
	//Strain Query
	$('.strain-query').submit(function (event) {
		event.preventDefault();
		$("#table").empty();
		$("#table").append("<tr><th>Name</th><th>Race</th><th>Flavor</th></tr>");
		let flavor = $('#flavor-choice option:selected').text()
		console.log(flavor);


		let strainQuery = new Promise(function (resolve, reject) {
			let request = new XMLHttpRequest();
			let url = `http://strainapi.evanbusse.com/ptkY9A6/strains/search/flavor/` + `${flavor}`;
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
			let body = JSON.parse(response);
			let i = 0;
			for (i = 0; i < body.length; i++) {
				$('#table').append('<tr><td>' + `${body[i].name}` + '</td><td>' + `${body[i].race}` + '</td><td>' + `${body[i].flavor}` + '</td></tr>');
			}
		}, function (error) {
			$('.showErrors').text(`There was an error processing your request: ${error.message}`);
		});
	}); //End of the FormId form submit event
}); //End of the document.ready function
