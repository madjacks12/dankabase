const apiKey = require('./../../../.env').apiKey;

export let flavorQuery = function (flavor) {
	return new Promise(function (resolve, reject) {
		let request = new XMLHttpRequest();
		let url = `http://strainapi.evanbusse.com/${apiKey}/strains/search/flavor/${flavor}`;
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
	}); //End of the FormId form submit event
};
