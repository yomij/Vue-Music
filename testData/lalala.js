var pks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// 循环队列

while (pks.length > 2) { //大于2时循环删除
	var cache = [],
		i = 0,
		j = 0,
		k = 0;

	for (; j < pks.length % 3; j++) { //最后剩余的先缓存 移到最前面
		cache.push(pks.pop())
	}

	for (; i < pks.length; i++) { //筛选 为3的置0
		if (i % 3 == 2) {
			pks.splice(i, 1, 0);
		}
	}

	for (; k < pks.length; k++) { //删除为0的数组项（在这里删除是因为上面删除会引起length变化）
		if (pks[k] == 0) {
			pks.splice(k, 1)
		}
	}

	pks = cache.concat(pks) //组成新的数组
}

if (pks.length == 2) { //等于2 则结果为第二个
	console.log('result =', pks[1])
} else {
	console.log('result =', pks[0]); //等于1 直接输出
}