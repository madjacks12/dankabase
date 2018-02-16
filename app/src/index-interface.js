import 'bootstrap/dist/css/bootstrap.min.css';
import { flavorDropdown } from './api_calls/dropdown.flavors.js';
import { effectsDropdown } from './api_calls/dropdown.effects.js';
import { flavorQuery } from './api_calls/query.flavors.js';
import { filterAll } from './api_calls/filter.all.js';

$(document).ready(function () { // jQuery Flavor dropdown
	let flavors = flavorDropdown();
	let effects = effectsDropdown();
	let filter = filterAll();
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
		$("#table").append(`<tr><th>Name</th><th>Race</th><th>Flavor</th><th>Positive Effects</th><th>Used For</th><th>More Info</th></tr>`);
		let userFlavor = $('#flavor-choice option:selected').text();
		let userPositiveEffect = $('#effect-choice option:selected').text();
		let userMedicalEffect = $('#type-choice option:selected').text();


		//let queryFlavor = flavorQuery(`${flavor}`);
		filter.then(function (response) {
			let i = 0;
			let body = JSON.parse(response);

			Object.keys(body).forEach(function (key) {

					let name = key;
					let race = body[key].race;
					let flavor = body[key].flavors.toString().replace(/,/g, ', ');
					let positive = body[key].effects.positive.toString().replace(/,/g, ', ');
					let medical = body[key].effects.medical.toString().replace(/,/g, ', ');
					let removeSymbols = `${name}`.replace(/[^(a-zA-Z)\d\s-]/g, "");
					let parseName = removeSymbols.replace(/\s/g, '-').toLowerCase();
					let leaflyUrl = `https://www.leafly.com/${race}/${parseName}`;

					if ((flavor.includes(userFlavor) && positive.includes(userPositiveEffect) && medical.includes(userMedicalEffect))) {

						$('#table').append(`<tr>
												<td>${name}</td>
												<td>${race}</td>
												<td>${flavor}</td>
												<td>${positive}</td>
												<td>${medical}</td>
												<td><a href=${leaflyUrl}><button class=btn btn-success> Learn More </button></a></td>
												</tr>`);
					} else {
						$('#error').empty().append(`<h4>Please enter select an option in each box.</h4>`);
					}
				},
				function (error) {
					$('.showErrors').text(`There was an error processing your request: ${error.message}`);
				})
		}); //End of the document.ready function
	});
});
