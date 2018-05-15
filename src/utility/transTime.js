export default {
	transDuration(dura) {
		let time = dura / 1000
		return `${this.trans(~~(time / 60))}:${this.trans(~~(time % 60))}`
	},
	trans(time) {
		// console.log(time);
		if (time < 10) {
			return `0${time}`
		} else {
			return `${time}`
		}
	},
	formatDate(...args) {
		// console.log('formatDate', args);
		let len = args.length,
			date = new Date(),
			format = '-'
		if (len === 2) {
			date = new Date(args[0])
			format = args[1]
		}
		if (format === '-') {
			return `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0'+ (date.getMonth() + 1)}-${date.getDate() > 10 ? date.getDate() : '0' + date.getDate()}`
		} else if (format === 'ymd') {
			return `${date.getFullYear()}年${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0'+ (date.getMonth() + 1)}月${date.getDate() > 10 ? date.getDate() : '0' + date.getDate()}日`
		}
	}
}