const apiKey = require('./../../../.env').apiKey;

export let flavorDropdown = function () {
	return new Promise(function (resolve, reject) {
		let request = new XMLHttpRequest();
		let url = `http://strainapi.evanbusse.com/${apiKey}/searchdata/flavors`;
		request.onload = function () {
			if (this.status === 200) {
				resolve(request.response);
			} else {
				reject(Error(request.statusText));
			}
		}
		request.open("GET", url, true);
		request.send();
	});
};
