$(function () {
    // 设置页面标题
    $("title").html(share.title);
    $.post('//tikitiki.top/wx/sdk/', {
        url: location.href.split('#')[0]
    }, function (res) {
        if (res.status == 1) {
            // 先注入配置
            setConfig(res.result)
            // 设置分享内容
            setShare()
        }
        // 阅读量
        statistics()
    })

    function setConfig(res) {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.appId, // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature, // 必填，签名
            jsApiList: [
                'updateAppMessageShareData',
                'updateTimelineShareData',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'onVoicePlayEnd',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'translateVoice',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
            ] // 必填，需要使用的JS接口列表
        });
    }
})
let share = {
    title: '五线谱练习', // 分享标题
    desc: '答题识谱', // 分享描述
    link: 'stave-question', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    params: '', // 地址栏后面的参数
    project: 'TikiTiki', // 项目
    imgUrl: '', // 分享图标 默认不填，使用link路径下的title.jpg
}
function setShare(rt) {
    wx.ready(function () {
        var protocol = window.location.protocol
        var data = {
            title: share.title, // 分享标题
            desc: share.desc, // 分享描述
            link: share.params ? protocol + '//tikitiki.top/tools/' + share.link + '/index.html?' + share.params : protocol + '//tikitiki.top/tools/' + share.link + '/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: share.imgUrl ? share.imgUrl : protocol + '//tikitiki.top/tools/' + share.link + '/img/title.jpg', // 分享图标
            complete: function (r) {
                // 设置成功
                if (rt) {
                    rt(r)
                }
            },
            success: function () {
                // 分享成功
                statistics('share')
            }
        }
        wx.checkJsApi({
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function (res) {
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                var checkResult = res.checkResult
                if (checkResult.onMenuShareAppMessage && checkResult.onMenuShareTimeline) {
                    // 分享给朋友
                    wx.onMenuShareAppMessage(data)
                    //分享给朋友圈
                    wx.onMenuShareTimeline(data)
                } else {
                    // 分享给朋友
                    wx.updateAppMessageShareData(data)
                    //分享给朋友圈
                    wx.updateTimelineShareData(data)
                }
            }
        });
    });
}

function statistics(type = 'view', rt) {
    $.post('//tikitiki.top/wx/sdk/statistics.php', {
        type: type,
        url: share.link,
        title: share.title,
        project: share.project,
    }, function (res) {
        if (rt) {
            rt(res)
        }
        // console.log(res)
    })
}