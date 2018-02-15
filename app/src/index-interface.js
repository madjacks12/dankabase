import 'bootstrap/dist/css/bootstrap.min.css';
import { flavorDropdown } from './api_calls/dropdown.flavors.js';
import { effectsDropdown } from './api_calls/dropdown.effects.js';
import { flavorQuery } from './api_calls/query.flavors.js';

$(document).ready(function () { // jQuery Flavor dropdown
	let flavors = flavorDropdown();
	let effects = effectsDropdown();

	// jQuery flavors dropdown
	flavors.then(function (response) {
		let body = JSON.parse(response);
		let i = 0;
		for (i = 0; i < body.length; i++) {
			$('#flavor-choice').append(`<option value=${body[i]}>${body[i]}</option>`);
		}
	}, function (error) {
		$('.showErrors').text(`There was an error processing your request: ${error.message}`);
	});
	// jQuery Effects dropdown
	effects.then(function (response) {
		let body = JSON.parse(response);
		let i = 0;
		for (i = 0; i < body.length; i++) {
			if (body[i].type == "positive") {
				$('#effect-choice').append(`<option value=${body[i].effect}>${body[i].effect}</option>`);
			} else if (body[i].type == "medical") {
				$('#type-choice').append(`<option value=${body[i].effect}>${body[i].effect}</option>`);
			}
		}
	}, function (error) {
		$('.showErrors').text(`There was an error processing your request: ${error.message}`);
	});

	/* * * * * * * * * * * FORM SUBMIT * * * * * * * * * * */
	$('.strain-query').submit(function (event) {
		event.preventDefault();
		$("#table").empty();
		$("#table").append(`<tr><th>Name</th><th>Race</th><th>Flavor</th><th>More Info</th></tr>`);
		let flavor = $('#flavor-choice option:selected').text()
		let queryFlavor = flavorQuery(`${flavor}`);

		queryFlavor.then(function (response) {
				let i = 0;
				let body = JSON.parse(response);
				for (i = 0; i < body.length; i++) {
					let removeSymbols = body[i].name.replace(/[^(a-zA-Z)\d\s-]/g, "");
					let parseName = removeSymbols.replace(/\s/g, '-').toLowerCase();
					let leaflyUrl = `https://www.leafly.com/${body[i].race}/${parseName}`;
					$('#table').append(`<tr>
							<td>${body[i].name}</td>
							<td>${body[i].race}</td>
							<td>${body[i].flavor}</td>
							<td><a href=${leaflyUrl}><button class=btn btn-success> Learn More </button></a></td>
						</tr>`);
				}
			},
			function (error) {
				$('.showErrors').text(`There was an error processing your request: ${error.message}`);
			});
	});
}); //End of the document.ready function
