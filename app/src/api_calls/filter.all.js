const apiKey = require('./../../../.env').apiKey;

export let filterAll = function () {
	return new Promise(function (resolve, reject) {
		let request = new XMLHttpRequest();
		let url = `http://strainapi.evanbusse.com/${apiKey}/strains/search/all`;
		request.onload = function () {
			if (this.status === 200) {
				resolve(request.response);
			} else {
				reject(Error(request.statusText));
			}
		}
		request.open("GET", url, true);
		request.send();
	}); //End of the FormId form submit event
};
