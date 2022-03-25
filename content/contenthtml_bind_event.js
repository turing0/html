var port = chrome.runtime.connect();

function load_button() {
    // $(".w1000 .s_link").append('<a id="about" style="cursor: pointer;">关于我们</a>'),
    // 判断登陆
    var urlid="";
    var moreflag="false";
    var bookmarkflag="false";
    if(localStorage["login_stat"]=="false"){
        $("#more img").attr('src', 'images/unlogin.svg');
        $("#marklist").hide();
         port.postMessage({
            action:"STAR_No"
        },"*");
    }else if(localStorage["login_stat"]=="true"){
        $("#more img").attr('src', 'images/user.svg');
        port.postMessage({
            action:{
                action:"STAR",
                loginStat:"true"
            }
        },"*");
        $("#marklist").show();
    }
    //打开设置
    $("#content_config").on("click",
    function() {
        port.postMessage({
            action: "CONFIG"
        },
        "*")
    });
    //点击LOGO
    $("#logo_id").on("click",
    function() {
        port.postMessage({
            action: "LOGO"
        },
        "*")
    });
    // 点击书签
    $("#bookmarks").on("click", function () {
        port.postMessage({
            action: "BOOKMARK",
            bookmarkflag: bookmarkflag
        }, "*");
        bookmarkflag=!bookmarkflag;
    });
    //点击vip
     $("#become_vip").on("click", function () {
        port.postMessage({
            action: "BECOMEVIP",
        }, "*");
    });
    // MORE
    $("#more").on("click",function(){
        // $("#more").css({"background-image":"url('images/ssj.png')"})
        port.postMessage({
            action: "MORE_IN",
            moreflag:moreflag
        },"*");
        moreflag=!moreflag;
    });
        $("#login").on("click",function(){
        port.postMessage({
            action: "LOGIN"
        },"*")
    });
     $("#more").on("mouseout",function(){
        port.postMessage({
            action: "MORE_OUT"
        },"*")
    });
     // 问号
    $("#words-box").on("mouseover", function () {
        port.postMessage({
            action: "SHOW_TIPS"
        },"*")
    });
    $("#words-box").on("mouseout", function () {
        port.postMessage({
            action: "HIDE_TIPS"
        },"*")
    });
    //FAQ
    $("#faq_id").on("click",
    function() {
        port.postMessage({
            action: "FAQ"
        },
        "*")
    });
    // 添加收藏，未登录弹出登录
    $("#collect").on("click",collect_css)
    function collect_css(){
        if(localStorage["login_stat"]=="false"){
            port.postMessage({
                action: "CREAT_LOGIN"
            },"*")

        }else if(localStorage["login_stat"]=="true"){
            if(urlid==""){
                $(this).find("img").attr("src","images/collected.jpg")
                port.postMessage({
                    action: "COLLECT"
                },"*")               
            }else{
               
               $(this).find("img").attr("src","images/collect.jpg");
               port.postMessage({
                   action:{
                       action:"REMOVE_loginNo",
                       markId:urlid
                   }
               },"*");
                urlid="";
            }

        }
    }
    // 书签
     $("#marklist").on("click",
    function() {
        port.postMessage({
            action: "MARKLIST"
        },
        "*")
    });
    //点击人工翻译
    $("#person_trans_id").on("click",
    function() {
        port.postMessage({
            action: "PERSON_TRANS"
        },
        "*")
    });
    // 点击文档翻译
    $("#doc_trans_id").on("click",
        function () {
            port.postMessage({
                    action: "DOC_TRANS"
                },
                "*")
        });

    $("#about").on("click",
    function() {
        port.postMessage({
            action: "ABOUT"
        },
        "*")
    });
    $("#minimize").on("click",minimize);
    function minimize(){
        $("#plugLogo").parent().hide()
        $("#plugLogo").show();
         $("#minimize").hide();
        $('#minimize').attr({"margin-left":"100px"})
        $("#plugLogo").parent().addClass("br");
        // $("#minimize").addClass("br");
        setTimeout(function(){
             $("#plugLogo").parent().show(100)
        },200)
         port.postMessage({
            action: "MINIMIZE"
        },"*")


    }
    $("#plugLogo").on("click",function(){
        $("#plugLogo").parent().hide()
        setTimeout(function(){
            $("#plugLogo").parent().show()
        },100)
        port.postMessage({
            action: "PLUGLOGO"
        },"*");
        $("#plugLogo").parent().removeClass("br");
        $("#minimize").removeClass("br");
          $("#plugLogo").hide();
        $("#minimize").show()
    });
    $("#sourceLang").change(function() {
        port.postMessage({
            action: "YEEKIT_RESET_LANGUAGE",
            sourceLang: $("#sourceLang").val(),
            targetLang: $("#targetLang").val(),
            //是否在此基础上接着翻译   1接着翻译0正常翻译
            isContinueTrans: ($("#sourceLang").css("display") == "none")?1:0
        },
        "*")
    }),
    $("#targetLang").change(function() { 		
		port.postMessage({
			action: "YEEKIT_RESET_LANGUAGE",
			sourceLang: $("#sourceLang").val(),
			targetLang: $("#targetLang").val(),
			//是否在此基础上接着翻译   1接着翻译0正常翻译
			isContinueTrans: ($("#sourceLang").css("display") == "none")?1:0
		},
		"*");
    	
    }),
    $("#rgTrans").on("click",
    function() {
        port.postMessage({
            action: "RGTRANS_COUNT"
        },
        "*")
    });
    var t = window.addEventListener ? "addEventListener": "attachEvent",
    n = window[t],
    a = "attachEvent" == t ? "onmessage": "message";
    n(a,
    function(t) {
        if ("CONTINUE_TRANS" == t.data.action) continue_trans(t.data);
        else if("HAS_NO"==t.data.action) {
              $("#collect").find("img").attr("src","images/collected.jpg"); 
              urlid=t.data.urlid;

        }
        else if("more_hide"==t.data.action) {
            moreflag="false"
        }
        else if ("YEEKIT_CHANGE_LOGIN_STATUS" == t.data.action) {
            if (t.data.login == true) {
                $("#more img").attr('src', 'images/user.svg');
            } else {
                $("#more img").attr('src', 'images/unlogin.svg');
            }
        }
        else if("autoTranslate"== t.data.action) {translate_content();minimize();}
        else if ("REMOVESTAR"==t.data.action) {$("#collect").find("img").attr("src","images/collect.jpg");urlid=""}
        else if ("SHOW_MARK" == t.data.action) $("#marklist").show();
        else if ("HIDE_MARK" == t.data.action) {$("#marklist").hide(); $("#collect").find("img").attr("src","images/collect.jpg");}
        else if ("51" == t.data.action) progressBar(t.data.index);
        else if ("YEEKIT_UPDATE_LEFT_CHARS" == t.data.action) updateCharsLeft(t.data.chars);
        else if ("YEEKIT_UPDATE_VIP_INFO" == t.data.action) updateVipInfo(t.data);
        else if ("YEEKIT_CHANGE_PROGRESSBAR" == t.data.action) progressBar(t.data.index);
        else if ("YEEKIT_HIDE_PROGRESSBAR" == t.data.action) content_callback_hide_progress_bar();
        else if ("YEEKIT_SET_LANGUAGE" == t.data.action) {
            var sourceLang = "",targetLang = "";
            sourceLang = t.data.sourceLang.indexOf("-") > -1 ? t.data.sourceLang.split("-")[0].toLowerCase() : t.data.sourceLang.toLowerCase();
            targetLang = t.data.targetLang.indexOf("-") > -1 ? t.data.targetLang.split("-")[0].toLowerCase() : t.data.targetLang.toLowerCase();
            
            //document.getElementById("sourceLang").value = n;
            //document.getElementById("targetLang").value = a;
            
            var languageTypeList = t.data.languageTypeList;
            //源语言列表初始化
            
            $("#sourceLang").empty();
            //1.默认第一个被选中的语种
            $.each(languageTypeList,function(langCode,langName){
                if(sourceLang == langCode){
                    $("#sourceLang").append('<option value="'+sourceLang+'" >'+languageTypeList[sourceLang]+'</option>');
                }
            });
            //2.剩下的语种
            $.each(languageTypeList,function(langCode,langName){
                if(sourceLang != langCode){
                    $("#sourceLang").append('<option value="'+langCode+'" >'+langName+'</option>');
                }
            });
            
            //目标语言列表初始化
            $("#targetLang").empty();
            //1.默认第一个被选中的语种
            $.each(languageTypeList,function(langCode,langName){
                if(targetLang == langCode){
                    $("#targetLang").append('<option value="'+targetLang+'" >'+languageTypeList[targetLang]+'</option>');
                }
            });
            //2.剩下的语种
            $.each(languageTypeList,function(langCode,langName){
                if(targetLang != langCode){
                    $("#targetLang").append('<option value="'+langCode+'" >'+langName+'</option>');
                }
            });


        } else "YEEKIT_LOAD_SOURCE_BUTTON" == t.data.action ? (show_source_advice()) : "YEEKIT_LOAD_TARGET_BUTTON" == t.data.action ? (show_target_advice(t.data.flag)) : "YEEKIT_TRANSLATION_FAILED" == t.data.action ? ($("#msgContent").html("<span class='fl'>网络好像不给力啊，翻译未成功</span><div class='fl sl_btn'><button id='trans_btn2'>重新开始</button></div>"), $("#msgContent #trans_btn2").on("click",
        function() {
            $("#msgContent").html("<span class='fl'>翻译进度</span><div class='fl ss_bar'><div class='fl ssb_been' id='progressbar'><img src='images/spic.gif' /></div></div><div id='trans_div' class='fl sl_btn'><button id='trans_btn'>翻译</button></div>"),
            // console.log("chongxin kaisshi restart"),
            port.postMessage({
                action: "YEEKIT_TRANSLATE",
                sourceLang: $("#sourceLang").val(),
                targetLang: $("#targetLang").val()
            },
            "*")
        })) : "YEEKIT_NOT_SUPPORT" == t.data.action ? $("#msgContent").html("<span class='fl'>暂不支持该语言对翻译,如需其他语言翻译请重新打开插件</span>") : "YEEKIT_AUTO_PLUGIN" == t.data.action ? ($("#msgContent #sour_spn").html("当前浏览的是"), $("#msgContent #tar_spn").html("网页，是否翻译为"), $("#msgContent #is_trans").html("?"), $("#msgContent #no_trans_btn").show(), $("#msgContent #trans_div").html('<button id="trans_btn">翻译</button>'), $("#msgContent #show_button").html('<button id="block_non" >不再提示</button>'), $("#no_trans_btn").on("click",
        function() {
            port.postMessage({
                action: "YEEKIT_REMOVE_PLUGIN"
            },
            "*")
        }), $("#trans_btn").on("click",
        function() {
            $("#sourceLang").val() == $("#targetLang").val() ? ($("#msgContent").html("<span class='fl'>源语言与目标语言相同</span><div class='fl sl_btn'><button id='trans_btn3'>重新加载</button></div>"), $("#trans_btn3").on("click",
            function() {
                port.postMessage({
                    action: "RELOAD_PLUGIN"
                },
                "*")
            })) : (port.postMessage({
                action: "YEEKIT_TRANSLATE",
                sourceLang: $("#sourceLang").val(),
                targetLang: $("#targetLang").val()
            },
            "*"), $("#msgContent").addClass("s_speed"), $("#msgContent").html("<span class='fl'>翻译进度</span><div class='fl ss_bar'><div class='fl ssb_been' id='progressbar'><img src='images/spic.gif' /></div></div><div id='trans_div' class='fl sl_btn'><button id='trans_btn'>翻译</button></div>"), console.log("relase the click"), $("#trans_btn").unbind("click"))
        }), $("#block_non").on("click",
        function() {
            port.postMessage({
                action: "YEEKIT_NEVER_REMIND"
            },
            "*")
        })) : "YEEKIT_SHOW_PLUGIN" == t.data.action && (show_bar(t.data.is_auto));

        "stop" == t.data.select_translation_flag ? (stop_word()) : "start" == t.data.select_translation_flag && (start_word());
        "close" == t.data.dual_language_flag ? close_dual_language() : "open" == t.data.dual_language_flag && open_dual_language();
    },
    !1),
    $("#closePlu").on(
    	"click",
    	function() {
        	port.postMessage({
            action: "YEEKIT_REMOVE_PLUGIN"
        },
        "*"
        );
    });
}
function show_bar(isAuto){
	$("#msgContent").show();
    if(isAuto){
        show_bar_auto();
    }else{
        show_bar_no_auto();
    }
}

/**
 * 手动弹出功能条 - 样式控制
 */
function show_bar_no_auto(){
    // 登陆显示书签
    show_mark_bar();
    $("#show_button").show();
    $("#tar_spn").empty().append('<img src="images/zhuanhua.png">');
    $("#sour_spn").css("display","none");
//  $("#msgContent").css("padding-left", "40px");  //为箭头时调用
	// $("#person_trans_id").css("margin-left", "150px");

    $("#show_button").on("click",translate_content);
}

// 点击翻译按钮
function translate_content() {
    port.postMessage({
        action: "YEEKIT_TRANSLATE",
        sourceLang: $("#sourceLang").val(),
        targetLang: $("#targetLang").val()
    }, "*"),
        $("#translating_id").show();

    //progressbar
    $("#show_button").hide();
}

// 登陆显示书签
function show_mark_bar() {
    if (localStorage["login_stat"] == "false") {
        $("#marklist").hide();
    } else if (localStorage["login_stat"] == "true") {
        $("#marklist").show();

    }
}

/**
 * 自动弹出功能条 - 样式控制
 */
function show_bar_auto(){
    $("#show_button").show();
    $("#tar_spn").empty().append('网页，是否翻译为');
    $("#sour_spn").text("当前为").css("display","inline-block");
    $("#show_button").on("click",translate_content);
}

/**
 * 更新进度
 */
function progressBar(t) {
    // console.log("[progressBar1] "+t);
	$("#percent_id").text(t);
}

/**
 * 更新剩余翻译字符数
 */
function updateCharsLeft(chars) {
    // console.log("[updateCharsLeft] "+chars);
    $("#chars_left").text(chars);
}

/**
 * 获取用户是否为VIP用户
 * @param data
 */
function updateVipInfo(data) {
    var isVip = data.isVip;
    var dueTime = data.dueTime;
    if (isVip == "true") {
        $("#become_vip").hide();
    } else {
        $("#become_vip").show();
    }
}

/**
 * content的callback
 * 接受来自content的消息，更新按钮状态，更新字符统计等
 */
function content_callback_hide_progress_bar() {
    // progressbar
    $("#translating_id").hide();

    // translate btn
    $("#show_button").show();
}

/**
 * 继续翻译
 */
function continue_trans(param){
	//源语言和目标语言相同时,不执行翻译动作百分比刷新
	if($("#sourceLang").val() == $("#targetLang").val()){
		$("#translating_id").hide();
	}else{		
		//改变样式:翻译中
		$("#percent_id").text(1);
		$("#translating_id").show();
	}

}

var show_source_target_advice_flag = true;//查看译文，查看原文状态标识位
/**
 * content通知：翻译完毕,改变样式,可查看原文
 */
function show_source_advice(){
    //显示查看原文样式
    $("#show_source_button").text("查看原文").show();
    show_source_target_advice_flag = true;
    $("#translating_id").hide();
    $("#sour_spn").css("display","none");
    $("#sourceLang").hide();
    $("#targetLang").show();
    $("#tar_spn").text("已翻译为").show();
    $("#msgContent").css("padding-left", "40px");  //当为"已翻译为"时调用
    $("#tar_spn").css("margin-right", "6px");   //当为"已翻译为"时调用
    $("#person_trans_id").css("margin-left","152px");  //当为"已翻译为"时调用
    

    //样式切换完毕后,对已翻译为的语言下拉列表绑定点击事件
    //因为在上面中select元素已绑定change事件，这里就不绑定了

    $("#show_source_button").one("click",
        function() {
            if(!show_source_target_advice_flag){
                
            }else{
                port.postMessage({
                action: "YEEKIT_SUFFER_SOURCE"
                },
                "*");
                //点击查看原文后,更改标识位为不可用
                show_source_target_advice_flag = false;
            }
            
        }
    );
}

/**
 * content通知：翻译完毕，改变样式，可查看译文
 */
function show_target_advice(flag){

    if(flag == 0){
        show_source_target_advice_flag = true;
        $("#show_source_button").text("查看译文").show();
    }else{
        //通知转换页面完毕,继续进行翻译
        port.postMessage({
            action: "YEEKIT_TRANSLATE",
            flag:flag,
            sourceLang: $("#sourceLang").val(),
            targetLang: $("#targetLang").val()
        },
        "*");
    }
    
    $("#show_source_button").one("click",
        function() {
            if(!show_source_target_advice_flag){
                
            }else{
                port.postMessage({
                action: "YEEKIT_SUFFER_TARGET",
                flag:flag
                },
                "*");
                //点击查看译文后,更改标识位为不可用
                show_source_target_advice_flag = false;
            }
            
        }
    );
}

/**
 * 取消划词
 */
function stop_word(){
    $("#op_select_word").text("划词");
    $("#checkbox_select_word").attr("checked", true);
    $("#checkbox_select_word").one("click",
        function() {
            port.postMessage({
                action: "YEEKIT_SELECT_TRANSLATION_OFF"
            },
            "*")
        }
    );
}

/**
 * 开启划词
 */
function start_word(){
    $("#op_select_word").text("划词");
    $("#checkbox_select_word").attr("checked", false);
    $("#checkbox_select_word").one("click",
        function() {
            port.postMessage({
                action: "YEEKIT_SELECT_TRANSLATION_ON"
            },
            "*")
        }
    );
}

// 显示双语
function open_dual_language() {
    $("#op_show_dual_language").text("双语");
    $("#dual_language_checkbox").attr("checked", false);
    $("#dual_language_checkbox").one("click",
        function() {
            port.postMessage({
                    action: "YEEKIT_DUAL_LANGUAGE_ON"
                },
                "*")
        }
    );
}
// 关闭双语
function close_dual_language() {
    $("#op_show_dual_language").text("双语");
    $("#dual_language_checkbox").attr("checked", true);
    $("#dual_language_checkbox").one("click",
        function() {
            port.postMessage({
                    action: "YEEKIT_DUAL_LANGUAGE_OFF"
                },
                "*")
        }
    );
}

function baiduCount() {
    var t = document.getElementById("baiduJs");
    if (!t) {
        var n = document.createElement("script");
        n.id = "baiduJs",
        n.type = "text/javascript",
        n.charset = "utf-8",
        //n.src = "https://translateport.yeekit.com:8443/statics/statistic.js",
            n.src = "https://hm.baidu.com/hm.js?1c3d509968686313878938d24ddb464e",
        document.body.appendChild(n)
    }
}

load_button();
