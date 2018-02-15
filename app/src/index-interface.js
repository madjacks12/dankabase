import 'bootstrap/dist/css/bootstrap.min.css';
import { flavorDropdown } from './api_calls/dropdown.flavors.js';
import { effectsDropdown } from './api_calls/dropdown.effects.js';

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
			}
		}
	}, function (error) {
		$('.showErrors').text(`There was an error processing your request: ${error.message}`);
	});

}); //End of the document.ready function
