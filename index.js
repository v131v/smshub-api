const rp = require('request-promise');

class SmsHubAPI {

	constructor(token) {
		this.url = 'https://smshub.org/stubs/handler_api.php';
		this.COUNTRY = {
			'RU': 0,
			'UA': 1,
			'KZ': 2
		};
		this.STATUS = {
			'SMS_SENDED': 1,
			'REPEAT': 3,
			'ACCEPT': 6,
			'CANCEL': 8
		};
		this.token = token;
		this.number = '';
		this.id = '';
		this.code = '';
	}

	query(qParams) {
		return rp({
			uri: this.url,
			qs: Object.assign({
				api_key: this.token
			}, qParams)
		}).then(answer => {

			if (answer.match(/(NO|WRONG|BAD|ERROR)/) !== null) {
				return {
					error: answer
				};
			} else {
				return answer;
			}

		});
	}

	getNumberStatus(country, operator) {
		return this.query({
			action: 'getNumberStatus',
			country: country,
			operator: operator
		}).then(answer => JSON.parse(answer));
	}

	getBalance() {
		return this.query({
			action: 'getBalance'
		}).then(answer => {
			return {
				balance: answer.match(/ACCESS_BALANCE:(\d+\.?\d*)/)[1]
			};
		});
	}

	getNumber(service, country, operator) {
		return this.query({
			action: 'getNumber',
			service: service,
			country: country,
			operator: operator
		}).then(answer => {
			this.id = answer.match(/ACCESS_NUMBER:(\d+):\d+/)[1];
			this.number = answer.match(/ACCESS_NUMBER:\d+:(\d+)/)[1];
			return {
				id: this.id,
				number: this,number
			};
		});
	}

	getStatus(id) {
		return this.query({
			action: 'getStatus',
			id: id
		}).then(answer => {
			if (ansewr.match(/\w+:(\d+)/) !== null) {
				this.code = ansewr.match(/\w+:(\d+)/)[1];
				return {
					code: this.code,
					status: answer.replace('STATUS_', '')
				};
			}
			return {
				status: answer.replace('STATUS_', '')
			};
		});
	}

	setStatus(status, id) {
		return this.query({
			action: 'setStatus',
			status: status,
			id: id
		}).then(answer => {
			return {
				status: answer.replace('ACCESS_', '')
			};
		});
	}

};

module.exports = SmsHubAPI;