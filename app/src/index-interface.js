import 'bootstrap/dist/css/bootstrap.min.css';
// const apiKey = require('./../../.env').apiKey;
// const flavorDropdown = require('./api_calls/dropdown.flavor.js');
import { flavorDropdown } from './api_calls/dropdown.flavors.js';

$(document).ready(function () { // jQuery Flavor dropdown
	let flavors = flavorDropdown();

	flavors.then(function (response) {
		let body = JSON.parse(response);
		let i = 0;
		for (i = 0; i < body.length; i++) {
			$('#flavor-choice').append(`<option value=${body[i]}>${body[i]}</option>`);
		}
	}, function (error) {
		$('.showErrors').text(`There was an error processing your request: ${error.message}`);
	});
}); //End of the document.ready function
