const Observer = (() => {
	let _mes = {};
	return {
		regist(type, fn) {
			if (typeof _mes[type] === 'undefined') {
				_mes[type] = [fn]
			} else {
				_mes[type].push(fn)
			}
		},
		fire(type, args = {}) {
			if (!_mes[type]) {
				return;
			}
			let e = {
					type: type,
					args: args
				},
				i = 0,
				len = _mes[type].length;
			for (; i < len; i++) {
				_mes[type][i].call(this, e);
			}
		},
		remove(type, fn) {
			if (_messages[type] instanceof Array) {
				let i = _messages[type].length - 1;
				for (; i >= 0; i--) {
					_mes[type][i] === fn && _mes[type].splice(i, 1)
				}
			}
		}
	}
})();

export Observer