import axios from 'axios'
import urls from './apiURL'


// axios.defaults.baseURL = 'http://47.100.63.34:3000';
axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.timeout = 2500;

function requestFactory(obj = {}) {
	if (obj.method === 'get' || !obj.hasOwnProperty('method')) {
		return function(params) {
			return new Promise(function(resolve, reject) {
				axios({
					url: obj.url,
					method: 'get',
					params: params
				}).then(res => {
					// console.log('aaaaaaaa', res.data);
					resolve(res)
				}).catch(e => {
					reject(e)
				})
			})
		}
	} else if (obj.method === 'post') {
		return function(data = {}) {
			return new Promise(function(resolve, reject) {
				axios({
					url: obj.url,
					method: 'post',
					data: data
				}).then(res => {
					resolve(res.data)
				}).catch(e => {
					reject(e)
				})
			})
		}
	}
}

let request = {},
	length = urls.length,
	i = 0

for (; i < length; i++) {
	request[urls[i].name] = requestFactory(urls[i])
}


export default request