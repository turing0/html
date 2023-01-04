window.onload = function () {
	// createNote("treble", [trebleArr[23], trebleArr[3], trebleArr[8], trebleArr[15]])
	// createNote("bass", [bassArr[0]])
}
const scale = ["C", "D", "E", "F", "G", "A", 'B']
const scaleNum = ["1", "2", "3", "4", "5", "6", '7']
const trebleArr = createTreble()
const bassArr = createBass()
// 创建
function createNote(pitch, note) {
	// 清空原有
	$('#boo').html('');
	let VF = Vex.Flow;

	// Create an SVG renderer and attach it to the DIV element named "boo".
	let renderer = new VF.Renderer(document.getElementById("boo"), VF.Renderer.Backends.SVG);

	// Configure the rendering context.
	renderer.resize(340, 170);
	let context = renderer.getContext();
	context.setFont("Arial", 10, "").setBackgroundFillStyle("#eee");

	// Create a stave of width 400 at position 10, 40 on the canvas.
	let stave = new VF.Stave(10, 18, 320);

	// Add a clef and time signature.
	stave.addClef(pitch).addTimeSignature('4/4');


	// Connect it to the rendering context and draw!
	stave.setContext(context).draw();
	// Helper function to justify and draw a 4/4 voice
	VF.Formatter.FormatAndDraw(context, stave, note.map(v => new VF.StaveNote(v)));

	$('#boo2').html('');
	let renderer2 = new VF.Renderer(document.getElementById("boo2"), VF.Renderer.Backends.SVG);
	renderer2.resize(500, 500);
	let context2 = renderer2.getContext();
	context2.setFont("Arial", 10, "").setBackgroundFillStyle("#eee");
	let stave2 = new VF.Stave(10, 18, 400);
	stave2.addClef(pitch).addTimeSignature('4/4');
	stave2.setContext(context2).draw();

	var notes = [
	  // A quarter-note C.
	  new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "q" }),

	  new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "q" }),
	  new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "q" }),

	  // A quarter-note D.
	  new VF.StaveNote({clef: "treble", keys: ["db/4"], duration: "q" }),
	    	// .addAccidental(0, new VF.Accidental("b")),

	  // A quarter-note rest. Note that the key (b/4) specifies the vertical
	  // position of the rest.
	  // new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),

	  // A C-Major chord.
	  // new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
	];
	// // Create a voice in 4/4 and add the notes from above
	// var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
	// voice.addTickables(notes);
	// // Format and justify the notes to 350 pixels (50 pixels left for key and time signatures).
	// var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 350);

	// // Render voice
	// voice.draw(context2, stave2);

	VF.Formatter.FormatAndDraw(context2, stave2, notes);

	// let vf = new Vex.Flow.Factory({renderer: {elementId: 'boo2', height: 700}});
	// let score = vf.EasyScore();
	// let system = vf.System();
	// 	system.addStave({
	//   voices: [
	//     score.voice(score.notes('C#5/q, B4, A4, G#4')),
	//     // score.voice(score.notes('C#5/q, B4, A4, G#4', {stem: 'up'})),
	//     // score.voice(score.notes('C#4/h, C#4', {stem: 'down'}))
	//   ]
	// }).addClef('treble').addTimeSignature('4/4');

	// system.addStave({
	//   voices: [
	//     score.voice(score.notes('C#3/q, B2, A2/8, B2, C#3, D3', {clef: 'bass', stem: 'up'})),
	//     score.voice(score.notes('C#2/h, C#2', {clef: 'bass', stem: 'down'}))
	//   ]
	// }).addClef('bass').addTimeSignature('4/4');

	// system.addConnector();
	// vf.draw();

}
// 创建高音 C3 - B6  24个音
function createTreble(duration = "q") {
	let arr = [], start = 3;
	for (let index = 4; index < 28; index++) {
		// console.log(scale[index % 7])
		if (index % 7 == 0) {
			start++
		}
		arr.push(
			{
				clef: "treble",
				keys: [scale[index % 7] + "/" + start],
				duration: duration,
				stem_direction: index > 12 ? -1 : 1,
				group: start,
				scale:scale[index % 7],
				scaleNum:scaleNum[index % 7],
			}
		)
	}
	// console.log(arr)
	return arr
}
// 创建低音 A0 - F4  27个音
function createBass(duration = "q") {
	let arr = [], start = 0;
	for (let index = 5; index < 32; index++) {
		// console.log(scale[index % 7])
		if (index % 7 == 0) {
			start++
		}
		arr.push(
			{
				clef: "bass",
				keys: [scale[index % 7] + "/" + start],
				duration: duration,
				stem_direction: index > 21 ? -1 : 1,
				group: start,
				scale:scale[index % 7],
				scaleNum:scaleNum[index % 7],
			}
		)
	}
	// console.log(arr)
	return arr
}
// 随机数
function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randClef() {
	return rand(0, 1)? 'treble' : 'bass';
}

let range = {'from':3, 'to':16};
// const rangeSlider = $(".vocal-range").ionRangeSlider({
// 	type: "double",
// 	from: 3,
// 	to: 16,
// 	values: trebleArr.map(v => v.keys[0]),
// 	grid: false,
// 	onStart(t) { setRange(t) },
// 	onFinish(t) { setRange(t) },
// 	onUpdate(t) { setRange(t) },
// }).data("ionRangeSlider");
// // 设置range
// function setRange(t) {
// 	// console.log(t)
// 	range = { from: t.from, to: t.to }
// 	randNote(range)
// }
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
function hidePop() {
	$("#RightPop").hide();
	$("#FailPop").hide();
}

let UserAnsArray = [];

document.addEventListener( 'mousedown', ev => {
	// console.log(ev.originalTarget);

	if ( ev.target.tagName == 'TONE-PIANO' && ev.originalTarget.innerText) {
		// console.log(ev.target.tagName);
		// console.log(ev.originalTarget);
		console.log(ev.originalTarget.innerText, range);
		
		if(UserAnsArray.length<3) {
			UserAnsArray.push(ev.originalTarget.innerText);
			// console.log(UserAnsArray);
		}
		else {
			UserAnsArray.push(ev.originalTarget.innerText);
			console.log(UserAnsArray);

			// 获取答案
			let ans = $('div[data-ok="true"]').children('div');
			ans = Array.from(ans);
			ans = ans.map(v => {return v.innerText.substr(1, 3).replace('/', '')});

			// if(ev.originalTarget.innerText == ans[0]) {
			if(arraysEqual(ans, UserAnsArray)) {	// 回答正确
				$("#RightPop").show();
				console.log('Right!');
				setTimeout(() => {
						hidePop()
					}, 1500);
				setTimeout(() => {
						randNote(range)
					}, 500);

				// randNote(range);
			}
			else {
				$("#FailPop").show();
				console.log('Failed, please retry!');
				setTimeout(() => {
						hidePop()
					}, 1500);
				
			}
			$("#tagNum").text(parseInt($("#tagNum").text())+4);
			UserAnsArray = [];
		}

		// console.log(areaArr);
		
    // console.log( 'note #' + ev.path[3].getAttribute( 'note' ) )
    // console.log( 'octave ', ev.path[7].getAttribute( 'octave' ) )
  }
  else if (ev.target.htmlFor == 'treble' || ev.target.htmlFor == 'bass') {
  	
  	if (ev.target.htmlFor == 'treble') {
  		range = {'from':3, 'to':16};
  	}
  	else {
  		range = {'from':9, 'to':22};
  	}
  	// console.log(ev.target.htmlFor, range);
  	
  }
    
} )