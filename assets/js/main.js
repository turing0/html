var iUp = (function () {
	var t = 0,
		d = 150,
		clean = function () {
			t = 0;
		},
		up = function (e) {
			setTimeout(function () {
				$(e).addClass("up")
			}, t);
			t += d;
		},
		down = function (e) {
			$(e).removeClass("up");
		},
		toggle = function (e) {
			setTimeout(function () {
				$(e).toggleClass("up")
			}, t);
			t += d;
		};
	return {
		clean: clean,
		up: up,
		down: down,
		toggle: toggle
	}
})();

function showQuote(quote, author, intervalTime=50, elementId='description') {
	$('#author').text(author);
	$(`#${elementId}`).html('');
  let i = 0;
  let j = 0;

  let intervalId = setInterval(function() {
    if (i < quote.length) {
      $(`#${elementId}`).html($(`#${elementId}`).html() + quote.substring(i, i + 1));
      i++;
    } else {
      clearInterval(intervalId);
    }
  }, intervalTime);
}

function getRandomQuote(probability=0.65, language='en') {
  // 生成一个 [0, 1) 之间的随机数
  const random = Math.random();

  // 如果生成的随机数小于概率值，则获取英语名言
	// https://github.com/tlcheah2/stoic-quote-lambda-public-api
  if (language === 'en' && random < probability) {
    // fetch('https://quote-garden.onrender.com/api/v3/quotes/random')
    // fetch('https://stoic.tekloon.net/stoic-quote')
    fetch('https://api.allorigins.win/get?url=' + 
			encodeURIComponent('https://stoic.tekloon.net/stoic-quote')
		)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
				data = JSON.parse(data.contents).data
				// console.log('data', data)
        // $('#description').html(data.data[0].quoteText + "<br/> - <strong>" + data.data[0].quoteAuthor + "</strong>")
        showQuote(data.quote, data.author)
      })
      .catch(function(error) {
        console.error(error);
      });
  } 
  // 否则获取中文名言
  else {
    fetch('https://v1.hitokoto.cn')
      .then(function(res) {
        return res.json();
      })
      .then(function(e) {
        // $('#description').html(e.hitokoto + "<br/> -「<strong>" + e.from + "</strong>」")
        showQuote(e.hitokoto, e.from, 100)
      })
      .catch(function(err) {
        console.error(err);
      });
  }
}

$(document).ready(function () {
	// // 获取一言数据
	// fetch('https://v1.hitokoto.cn').then(function (res) {
	// 	return res.json();
	// }).then(function (e) {
	// 	$('#description').html(e.hitokoto + "<br/> -「<strong>" + e.from + "</strong>」")
	// }).catch(function (err) {
	// 	console.error(err);
	// })
	getRandomQuote();

	// var url = 'https://query.yahooapis.com/v1/public/yql' + 
    // '?q=' + encodeURIComponent('select * from json where url=@url') +
    // '&url=' + encodeURIComponent('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8') +
	// '&format=json&callback=?';

	/**
	 * 获取Bing壁纸
	 * 
	 */
	// var $panel = $('#panel');

	// var url = 'https://bird.ioliu.cn/v1/?url=https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8';
	// var imgUrls = JSON.parse(sessionStorage.getItem("imgUrls"));
	// var index = sessionStorage.getItem("index");
	// if(imgUrls == null){
	// 	imgUrls = new Array();
	// 	index = 0;		
	// 	$.get(url,function (result) {
	// 		images = result.images;
	// 		for (let i = 0; i < images.length; i++) {
	// 			const item = images[i];
	// 			imgUrls.push(item.url);
	// 		}
	// 		var imgUrl = imgUrls[index];
	// 		var url = "https://www.bing.com"+imgUrl;
	// 		$panel.css("background", "url('"+url+"') center center no-repeat #666");
	// 		$panel.css("background-size", "cover");
	// 		sessionStorage.setItem("imgUrls",JSON.stringify(imgUrls));
	// 		sessionStorage.setItem("index",index);
	// 		});
	// }else{
	// 	if(index == 7)
	// 		index = 0;
	// 	else
	// 		index++;
	// 	var imgUrl = imgUrls[index];
	// 	var url = "https://www.bing.com"+imgUrl;
	// 	$panel.css("background", "url('"+url+"') center center no-repeat #666");
	// 	$panel.css("background-size", "cover");
	// 	sessionStorage.setItem("index",index);
	// }

	// https://github.com/flow2000/bing-wallpaper-api?tab=readme-ov-file
	// https://bing.img.run/api.html
	var url = "https://api.bimg.cc/random?w=1920&h=1080&mkt=zh-CN"
	// $panel.css("background", "url('"+url+"') center center no-repeat #666");
	if ($('#panel')) {
		var $panel = $('#panel');
		$panel.css("background", `url('${url}') center center no-repeat #666`);
		$panel.css("background-size", "cover");
	}

	$(".iUp").each(function (i, e) {
		iUp.up(e);
	});

	$(".js-avatar")[0].onload = function () {
		$(".js-avatar").addClass("show");
	}
});

$('.btn-mobile-menu__icon').click(function() {
    if ($('.navigation-wrapper').css('display') == "block") {
      $('.navigation-wrapper').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $('.navigation-wrapper').toggleClass('visible animated bounceOutUp');
        $('.navigation-wrapper').off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
      });
      $('.navigation-wrapper').toggleClass('animated bounceInDown animated bounceOutUp');

    } else {
      $('.navigation-wrapper').toggleClass('visible animated bounceInDown');
    }
    $('.btn-mobile-menu__icon').toggleClass('social iconfont icon-list social iconfont icon-angleup animated fadeIn');
});
