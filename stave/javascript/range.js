$(function () {
	let range = {}
	const rangeSlider = $(".vocal-range").ionRangeSlider({
		type: "double",
		from: 3,
		to: 16,
		values: trebleArr.map(v => v.keys[0]),
		grid: false,
		onStart(t) { setRange(t) },
		onFinish(t) { setRange(t) },
		onUpdate(t) { setRange(t) },
	}).data("ionRangeSlider");
	// 设置range
	function setRange(t) {
		// console.log(t)
		range = { from: t.from, to: t.to }
		randNote(range)
	}
	// 切换音区
	$('input[type="radio"]').change(function () {
		if ($(this).val() == "bass") {
			rangeSlider.update({
				from: 9,
				to: 22,
				values: bassArr.map(v => v.keys[0]),
			});

		} else {
			rangeSlider.update({
				from: 3,
				to: 16,
				values: trebleArr.map(v => v.keys[0]),
			});
		}
	})
	// 选择答案
	let questionLook = false
	$('.question').on('click', '.item', function () {
		if (questionLook) return
		questionLook = true
		if ($(this).data("ok")) {
			console.log('123',range);

			$(this).addClass('ok')
			setTimeout(() => {
				randNote(range)
				questionLook = false
			}, 500);
		} else {
			$(this).addClass('err')
			questionLook = false
		}
	})
})
function randNote(t) {
	// console.log('----', t);
	function createRandVal() {
		let arr = [
			// [1,2,3,4],
			// [2,2,3,4],
			// [1,2,3,4],
			// [6,2,3,4],
			[rand(t.from, t.to), rand(t.from, t.to), rand(t.from, t.to), rand(t.from, t.to)],
			[rand(t.from, t.to), rand(t.from, t.to), rand(t.from, t.to), rand(t.from, t.to)],
			[rand(t.from, t.to), rand(t.from, t.to), rand(t.from, t.to), rand(t.from, t.to)],
			[rand(t.from, t.to), rand(t.from, t.to), rand(t.from, t.to), rand(t.from, t.to)],
		]
		if (t.from != t.to) {
			if (new Set(arr.map(v => v.toString())).size < arr.length) {
				// console.log('重复')
				return createRandVal()
			} else {
				// console.log('无重复');
				return arr
			}
		} else {
			return arr
		}

	}
	// 生成随机区间
	let randVal = createRandVal()
	let select = rand(0, 3)
	// console.log(randVal, select)
	let area = $('input[type="radio"]:checked').val(), areaArr = []
	if (area == 'bass') {
		areaArr = bassArr
	} else {
		areaArr = trebleArr
	}
	createNote(area, [areaArr[randVal[select][0]], areaArr[randVal[select][1]], areaArr[randVal[select][2]], areaArr[randVal[select][3]]])
	// 生成答案
	let html = ''
	randVal.forEach((v, i) => {
		// console.log(v)
		let data = '', tp = ''
		v.forEach((v2, i2) => {
			data += areaArr[v[i2]].keys[0]
			tp += `<div class="item-i">${areaArr[v[i2]].scaleNum}<span>${areaArr[v[i2]].keys[0]}</span></div>`
			// tp += `<div class="item-i">${areaArr[v[i2]].keys[0]}<span>${areaArr[v[i2]].scaleNum}</span></div>`
		})
		html += `<div class="item" data-ok="${i == select ? true : false}">` + tp + '</div>'
		// console.log(html)
	})
	$('.question').html(html)
	let ans = [areaArr[randVal[select][0]], areaArr[randVal[select][1]], areaArr[randVal[select][2]], areaArr[randVal[select][3]]];
	ans = ans.map(obj => {return obj.keys[0].replace('/', '')});
	// console.log(ans);
	return ans;
}