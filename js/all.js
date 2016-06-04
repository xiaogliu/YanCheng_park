$(function(){
	allPage();
	if($('#home_cont').length!=0){	//首页
		allHome();
		inputTipValue($('#hsearch'));
		homeResize();
		return;
	}
	if($('#socia_cont').length!=0){	//社招首页
		allSocia();
		selectInit();
		inputTipValue($('#hsearch'));
		return;
	}
	if($('#position').length!=0){	//职位搜索列表
		positionInit();
		keywordsHighlight();
		inputTipValue($('#search2'));
		return;
	}
	if($('#position_detail').length!=0){	//职位搜索详细
		positionInit();
		inputTipValue($('#search2'));
		return;
	}
	if($('#news').length!=0){	//招聘新闻动态中心
		newsInit();
		return;
	}
	if($('#newsDetail').length!=0){	//招聘新闻动态中心
		newsDetailInit();
		return;
	}
	if($('#faq').length!=0){	//FAQ
		faqInit();
		changeCode();
		return;
	}
	if($('#workInTencent').length!=0){	//人在腾讯 工作环境
		imgChange();
		return;
	}
	if($('#welfare').length!=0){	//人在腾讯 薪酬福利
		welfareInit();
		return;
	}
	if($('#senior').length!=0){	//高级人才
		seniorInit();
		return;
	}
});
function seniorInit(){
	var buts = $('#seniormenus td');
	var tabs = $('#seniorcont .i');
	buts.each(function(i){
		$(this).click(function(){
			if($(this).hasClass('active'))return;
			buts.removeClass('active');
			$(this).addClass('active');
			
			tabs.removeClass('active');
			tabs.eq(i).addClass('active');
		});
	});
	/*tabs.each(function(){
		var descs = $(this).find('.desc');
		$(this).find('.link').click(function(){
			descs.filter(function(){
				return $(this).css('display')=='block';
			}).not($(this).next()).slideUp();
			$(this).next().slideDown();
		});
	});*/
}
function welfareInit(){
	var itemt = $('#welfares .itemt li');
	var itemc = $('#welfares .itemc .i');
	itemt.each(function(i){
		$(this).click(function(){
			if($(this).hasClass('active'))return;
			itemt.removeClass('active');
			$(this).addClass('active');
			itemc.removeClass('active');
			itemc.eq(i).addClass('active');
			//window.parent.setHeight(window.parent.document.getElementById('ifm'));
		});
	});
}
function faqInit(){
	var url = window.location.href;
	var url_match = url.match(/id=(\d+)/);
	if(url_match){
		var id = url_match[1];
	}else{
		var id = $('#faqbuts a:first').attr('i');
	}
	if(id){
		showFaqById(id);
	}
}
//检查FAQ页面发送反馈表单是否为空，并提交查询
//thetype可能是反馈建议
function submitFaq( thetype ){
	var t = $('#faqtitle');
	var c = $('#faqcont');
	var no = $('#faqcode');
	var applyshow = $('#applyshow');
	var t_val = $.trim(t.val());
	var c_val = $.trim(c.val());
	var no_val= $.trim(no.val());
	applyshow.removeClass('showerr showsuc none').text("");
	
	if( t_val=='' ){ 
		applyshow.addClass('showerr').text("请填写标题！");
    	t.focus();    	
    	return false;
    }
	if( t_val.length>100 ){ 
		applyshow.addClass('showerr').text("标题不能超过100个字符！");
    	t.focus();
    	return false;
    }
	
	if( c_val=='' ){
		applyshow.addClass('showerr').text("请填写内容！");
		c.focus();
		return false;
	}
	if( c_val.length>5000 ){
		applyshow.addClass('showerr').text("内容不能超过5000个汉字！");
    	c.focus();
    	return false;
    }
	
	if( no_val.length<4 ){
		applyshow.addClass('showerr').text("请正确填写验证码！");
    	no.focus();
    	return false;
    }
	var appfaq = $('#appfaq');
	appfaq.attr('disabled',true);
	$.ajax({
		url:'send_feedback.php',
		data:'title='+t_val+'&content='+c_val+'&checkno='+no_val+'&type='+(thetype?thetype:''),
		type:'POST',
		dataType:'text',
		timeout:15000,
		error:function(){
			appfaq.attr('disabled',false);
			applyshow.addClass('showerr').text('连接服务器超时！');
		},
		success:function(response){
			response = $.trim(response);
			if(response=='1'){
				$('#faqform').get(0).reset();
				applyshow.addClass('showsuc').text('您的反馈发送成功！我们会尽快处理。');
			}else if(response=='2'){
				applyshow.addClass('showerr').text("您发送反馈过于频繁，请等待30分钟后重试！");
			}else if(response=='3'){
				no.focus();
				applyshow.addClass('showerr').text("您输入的验证码不正确！");
			}else if(response=='4'){
				applyshow.addClass('showerr').text("您输入的资料有误！");
			}else if(response=='nologin'){
				applyshow.addClass('showerr').text('请先登录');
				var loginfun = function(){
					window.location.href='login.php?url=faq.php';
				};
				setTimeout(loginfun, 1000);
			}else{
				applyshow.addClass('showerr').text("提交异常");
			}
			appfaq.attr('disabled',false);
		}
	});
	return false;
}
function changeCode(){
	$('#code').attr('src','checkno.php?r='+Math.random());
}
function showFaqById(id){
	//faqq faqa
	$('.faqq').removeClass('active');
	$('#faqq'+id).addClass('active');
	
	$('.faqa').addClass('none');
	$('#faqa'+id).removeClass('none');
}
function newsDetailInit(){
	var items = $('#career_list a');
	var buts = $('#types .item');
	var activeItems = null;
	buts.each(function(i){
		$(this).click(function(){
			if($(this).hasClass('active')){return;}
			buts.removeClass('active');
			$(this).addClass('active');
			if(i==0){//特殊的全部
				items.removeClass('none');
				activeItems=items;
			}else{
				items.addClass('none');
				activeItems=items.filter('.type'+(i-1));
			}
			showOddEven(activeItems);
		});
	});
	showOddEven(items);
}
function showOddEven(items){
	items.each(function(j){
		if(j%4<2){
			$(this).removeClass('none odd').addClass('even');
		}else{
			$(this).removeClass('none even').addClass('odd');
		}
	});
}
function newsInit(){
	$('#news .more2').click(function(){
		if($(this).hasClass('more2up')){
			$(this).parents('table:first').find('.trhide').addClass('none');
			$(this).parents('table:first').find('.tr4:first').addClass('noborder');
			$(this).removeClass('more2up');
		}else{
			$(this).parents('table:first').find('.trhide').removeClass('none');
			$(this).parents('table:first').find('.tr4:first').removeClass('noborder');
			$(this).addClass('more2up');
		}
	});
}
//输入框里显示提示内容
function inputTipValue(the){
	the.focus(function(){
		if($(this).val()==$(this).attr('t')){
			$(this).val('').css('color','#444');
		}
	}).blur(function(){
		if($(this).val()==''){
			$(this).val($(this).attr('t')).css('color','#888');;
		}
	});
	the.blur();
}
function getKeywordsRegex(){
	if(typeof(keywords_json)!='object')return '';
	var len = keywords_json.length;
	var regex = '';
	for(var i=0;i<len;i++){
		if(regex!=''){
			regex +='|';
		}
		regex +='(?:'+addslashes(keywords_json[i])+')';
	}
	return regex;
}
function addslashes(str){//return str;
	return str.replace(/([\(\)\[\]\{\}\.\*\?\+\!\^\$\|\\\\])/g,'\\$1');
}
function keywordsHighlight(){
	var title = '';
	var keyregx = getKeywordsRegex();
	if(keyregx=='')return;
	try{
	var regex = new RegExp('('+keyregx+')','ig');
	$('#position .tablelist').find('.even a,.odd a').each(function(){
		title = $(this).text();
		title=title.replace(regex, '<span>$1</span>');
		$(this).html(title);
	});
	}catch(e){
		//alert(e.message);
	}
}
function positionInit(){
	var additems = $('#additems');
	var but = $('#searchrow2 .more2');
	but.click(function(){
		if($(this).hasClass('more2up')){
			additems.addClass('itemnone');
			$(this).removeClass('more2up');
		}else{
			additems.removeClass('itemnone');
			$(this).addClass('more2up');
		}
	});
	if($('#additems .itemhide2').length!=0){
		but.click();//第二行元素激活了
	}
}
function allPage(){
	$('a').focus(function(){
		$(this).blur();
	});
	var topshares=$('#topshares .shares');
	$('#topshares').mouseover(function(){
		topshares.css('display','block');
	}).mouseout(function(){
		topshares.css('display','none');
	});
}
function selectInit(){
	$('.select').hover(
	function(){
		$(this).addClass('selecthover');
		$(this).find('.options:first').css('display','block');
	},
	function(){
		$(this).removeClass('selecthover');
		$(this).find('.options:first').css('display','none');
	}).find('.option').hover(
	function(){
		$(this).addClass('optionhover');
		$(this).text($(this).text());// for ie8..-_-
	},function(){
		$(this).removeClass('optionhover');
		$(this).text($(this).text());// for ie8..-_-
	}).click(function(){
		var pp = $(this).parent().parent();
		pp.find('.val:first').val($(this).attr('val'));
		pp.find('.show:first').text($(this).text());
		pp.find('.options:first').css('display','none');
	});
}
function allSocia(){
	//banner
	var dians = $('#dian2s a');
	var big_img = $('#socia_banner');
	var big_a = $('#big_a');
	dians.mouseover(function(){
		if($(this).hasClass('active'))return;
		if(big_img.queue('fx').length!=0){
			big_img.stop(true);
		}
		dians.removeClass('active');
		var img = $(this).attr('b');
		var link = $(this).attr('l');
		var title = $(this).attr('t');
		var theid = $(this).attr('theid');
		$(this).addClass('active');
		big_img.animate({'opacity':'0.2'},400,function(){
			big_img.css('background-image','url('+img+')').attr('title',title);
			if(link==''){
				big_a.attr('href','javascript:;').attr('onClick',"pgvSendClick({hottag:'HRTENCENT.SOCIA.BANNER.BANNER"+theid+"'});").addClass('cdefault');
			}else{
				big_a.attr('href',link).attr('onClick',"pgvSendClick({hottag:'HRTENCENT.SOCIA.BANNER.BANNER"+theid+"'});").removeClass('cdefault');
			}
			big_img.animate({'opacity':'1'},700);
		});
	}).click(function(e){
		e.stopPropagation();
		e.preventDefault();
		return false;
	});
	
	var stop2 = false;
	big_img.mouseover(function(){
		stop2=true;
	}).mouseout(function(){
		stop2=false;
	});
	
	var item_len = dians.length;
	var marquee2 = autoSwitchSociaBanner();
	MyMar2 = setInterval(marquee2,5000);
	function autoSwitchSociaBanner(){
		return (function(){
			if(stop2)return;
			var next = null;
			var activeed = false;
			$('#dian2s a').each(function(i){
				if(activeed){
					next = $(this);return false;
				}
				if($(this).hasClass('active')){
					activeed = true;
				}
			});
			if(!next){
				next = $('#dian2s a').eq(0);
			}
			next.mouseover();
			stop2 = false;
		});
	}
}
function imgChange(){
	$('.imgchang').each(function(){
		var dians = $(this).find('.dian2s a');
		var big_img = $(this).find('.bigimg');
		dians.mouseover(function(){
			if($(this).hasClass('active'))return;
			if(big_img.queue('fx').length!=0){
				big_img.stop(true);
			}
			dians.removeClass('active');
			var img = $(this).attr('b');
			$(this).addClass('active');
			big_img.animate({'opacity':'0.2'},400,function(){
				big_img.css('background-image','url('+img+')');
				big_img.animate({'opacity':'1'},700);
			});
		}).click(function(e){
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
	});
}
function homeForm(){
	$('#hworkplace').each(function(){
		var theele = $('#'+$(this).attr('idname'));
		var as = $(this).find('a'); 
		as.click(function(){
			theele.val($(this).attr('ids'));
			as.removeClass('active');
			$(this).addClass('active');
		});
	});
	$('#hzhiwei').each(function(){
		var theele = $('#'+$(this).attr('idname'));
		var as = $(this).find('a'); 
		as.click(function(){
			theele.val($(this).attr('ids'));
			as.removeClass('active');
			$(this).addClass('active');
		});
	});
}
function allHome(){
	changeImages(5);	//左右
	//homeForm();
	//点击小图
	var allimg = $('#small_imgs .img');
	var big_img = $('#big_img');
	var big_a = $('#big_a');
	var small_next = $('#small_next');
	var stop2 = false;
	allimg.mouseover(function(){
		if($(this).hasClass('active'))return;
		allimg.removeClass('active');
		$(this).addClass('active');
		var img = $(this).attr('b');
		var link = $(this).attr('l');
		var theid = $(this).attr('theid');
		if(big_img.queue('fx').length!=0){
			big_img.stop(true);
		}
		big_img.animate({'opacity':'0.2'},400,function(){
			big_img.css('background-image','url('+img+')');
			if(link==''){
				big_a.attr('href','javascript:;').attr('onClick',"pgvSendClick({hottag:'HRTENCENT.HOME.BANNER.BANNER"+theid+"'});").addClass('cdefault');
			}else{
				big_a.attr('href',link).attr('onClick',"pgvSendClick({hottag:'HRTENCENT.HOME.BANNER.BANNER"+theid+"'});").removeClass('cdefault');
			}
			big_img.animate({'opacity':'1'},700);
		});
	});
	$('#home_banner').mouseover(function(){
		stop2=true;
	}).mouseout(function(){
		stop2=false;
	});
	
	var marquee2 = autoSwitchHomeBanner(allimg);
	MyMar2 = setInterval(marquee2,6000);
	function autoSwitchHomeBanner(allimg){
		return (function(){
			if(stop2)return;
			var index = 0;
			$('#small_imgs .img').each(function(i){
				if($(this).hasClass('active')){
					index = i;return false;
				}
			});
			if(index>=4){
				small_next.click();
			}
			var next = $('#small_imgs .img.active:first').parent().next().find('.img');
			if(next.length==0){
				next = allimg.eq(0);
			}
			next.mouseover();
			stop2 = false;
		});
	}
	
	//最新动态
	var dians = $('#dians a');
	var members=$('#hnewsitems a');
	var memberitems=$('#hnewsitems');
	var MyMar = MyMar2= null;
	var stop = false;
	dians.mouseover(function(e){
		if($(this).hasClass('active'))return;
		if(memberitems.queue('fx').length!=0){
			memberitems.stop(true);
		}
		dians.removeClass('active');
		$(this).addClass('active');
		var num = $(this).attr('num');
		memberitems.animate({'opacity':0.1},400,function(){
			members.css('display','block').slice(0,num).css('display','none');
			memberitems.animate({'opacity':1},500,function(){
				//$(this).attr('style','padding:0;');
			});
		});
	});
	$('#hnews').mouseover(function(){
		stop = true;
	}).mouseout(function(){
		stop = false;
	});
	
	var marquee = autoSwitchNews(dians);
	MyMar = setInterval(marquee,3500);
	function autoSwitchNews(dians){
		return (function(){
			if(stop)return;
			var next = dians.filter('.active').next();
			if(!next.hasClass('dian')){
				next = dians.eq(0);
			}
			next.mouseover();
			stop = false;
		});
	}
	
}
//左右点击图片
function changeImages(allowl) {
	var itemall = $('#small_imgs .item');
	iteml = itemall.length;
	if (iteml <= allowl) {// 少于最大显示数
		$('#small_pre,#small_next').css('background', 'none');
		return;
	}
	iteml = ((iteml - allowl) > allowl) ? allowl : (iteml - allowl);
	imagesSwitch33('#small_pre', '#small_next', itemall, 900, iteml);
}
/*
 * 图片切换33不自动 iteml = jQuery(this).find('.smallitem').length; iteml =
 * ((iteml-allowl)>allowl)?allow:(iteml-allowl);
 * imagesSwitch33(pre,next,jQuery(this).find('.smallitem'),900,iteml);
 */
function imagesSwitch33(left, right, items, movetime, num) {
	movetime = (parseInt(movetime)) ? movetime : 400;
	items.parent().css({
		position : 'relative',
		overflow : 'hidden'
	});
	items.parent().wrapInner('<div></div>');
	items.parent().css('position', 'absolute');
	items.parent().css('left', '0');
	var offw = items.eq(0).outerWidth(true);
	var allw = items.outerWidth(true) * (items.length);
	var movew = offw * num;
	items.parent().width(allw + 'px');
	var len = items.length;
	var isclick = false;

	jQuery(left).click(function() {
		if (items.parent().queue('fx').length != 0)
			return;
		isclick = true;
		items.parent().prepend(items.parent().children().slice(len - num, len));
		items.parent().css('left', '-' + movew + 'px');
		items.parent().animate({
			left : '+=' + movew + 'px'
		}, movetime, function() {
			items.parent().css('left', 0);
		});
	});
	jQuery(right).click(function() {
		if (items.parent().queue('fx').length != 0)
			return;
		isclick = true;
		items.parent().animate({
			left : '-=' + movew + 'px'
		}, movetime, function() {
			items.parent().append(items.parent().children().slice(0, num));
			items.parent().css('left', 0);
		});
	});
}
//申请职位
function applyPosition(id,isColl){
	var applyshow = $('#applyshow');
	var apppos = $('#apppos');
	apppos.attr('disabled',true);
	applyshow.removeClass('showerr none').addClass('showsuc').text('正在提交...');
	var app ='';var show = '申请';
	if(isColl){
		app = '&isColl=1';
		show = '收藏';
	}
	$.ajax({
		url:'apply_post.php',
		data:'id='+id+app,
		type:'POST',
		dataType:'text',
		timeout:15000,
		error:function(){
			apppos.attr('disabled',false);
			applyshow.removeClass('showsuc').addClass('showerr').text('连接服务器超时！');
		},
		success:function(text){
			text = $.trim(text);
			if(text=='1'){
				applyshow.removeClass('showerr').addClass('showsuc').text(show+'该职位成功');
			}else if(text=='2'){
				applyshow.removeClass('showsuc').addClass('showerr').text('您已经'+show+'过该职位了');
			}else if(text=='-1'){
				applyshow.removeClass('showsuc').addClass('showerr').text('请先登录');
				var loginfun = function(){
					window.location.href='login.php?url='+encodeURIComponent('position_detail.php?id='+id);
				};
				setTimeout(loginfun, 1000);
			}else{
				applyshow.removeClass('showsuc').addClass('showerr').text(show+'异常');
			}
			apppos.attr('disabled',false);
		}
	});
}
//用户中心申请职位
function applyPosition2(id){
	$.ajax({
		url:'apply_post.php',
		data:'id='+id,
		type:'POST',
		dataType:'text',
		timeout:15000,
		error:function(){
			alert('连接服务器超时！');
		},
		success:function(text){
			text = $.trim(text);
			if(text=='1'){
				alert('申请该职位成功');
			}else if(text=='2'){
				alert('您已经申请过该职位了');
			}else if(text=='-1'){
				alert('请先登录');
				window.location.href='login.php?url='+encodeURIComponent('apply_collection.php');
			}else{
				alert('申请异常');
			}
		}
	});
}
function gologin(){
	window.location.href='login.php';
}
function setHeight(obj)
{
	obj.height=0;
	var fdh;
	if (obj.Document)
	{
		if (obj.Document.documentElement)
		{
			fdh=Math.max(obj.Document.body.scrollHeight,obj.Document.documentElement.scrollHeight);
	  }
	  else
	  {
	  	fdh=obj.Document.body.scrollHeight;
	  }
  }
  else
  {
  	fdh=obj.contentDocument.body.offsetHeight;
	}	
	obj.height=(fdh>300?fdh:300);
}
function showHomeVideo(vid){//564,460
	//$('#tenvideo_flash_players').remove();
	var html = '<div id="homevideo1"><div id="homevideo2" onmouseover="$(\'#closebut\').css(\'display\',\'block\');" onmouseout="$(\'#closebut\').css(\'display\',\'none\');"><a id="closebut" herf="javascript:;" style="display:none;"></a>'+getVideoHtml(vid)+'</div></div>';
	jQuery(html).setLightBox({layoverBg:'#000',layoverOpa:'0.5',alertdivBg:'#fff',alertdivWidth:'726',alertdivHeight:'417',sureBut:'#download',closeBut:'#closebut',layerdivClick:false,canNotDrag:true});
	
	//定义视频对象
	var video = new tvp.VideoInfo();
	//向视频对象传入视频vid
	video.setVid(vid); //传入视频vid
	//设置播放器对象
	var player = new tvp.Player(720, 411); //宽、高，单位像素
	//设置播放器初始化时加载的视频
	player.setCurVideo(video);
	//设置播放器皮肤使用mini版本
	player.addParam("flashskin","http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf");
	//设置loading动画使用mini版本
	player.addParam("loadingswf","http://imgcache.qq.com/minivideo_v1/vd/res/skins/web_small_loading.swf");
	player.addParam("autoplay",1);
	player.addParam("wmode",'Opaque');
	//输出播放器
	player.write("mod_player");
}
function getVideoHtml(vid){
	return '<div id="mod_player"></div>';
	var html = '<object width="720" height="411" align="middle" id="flashplayer" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codeBase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=10,0,0,0" >'+ 
					'<PARAM NAME="FlashVars" VALUE="version=20110407&amp;vid='+vid+'&amp;autoplay=1&amp;list=0&amp;loadingswf=http://imgcache.qq.com/minivideo_v1/vd/res/skins/web_small_loading.swf&amp;skin=http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf&amp;">'+ 
					'<PARAM NAME="Movie" VALUE="http://static.video.qq.com/TencentPlayer.swf">'+
					'<PARAM NAME="Src" VALUE="http://static.video.qq.com/TencentPlayer.swf">'+
					'<PARAM NAME="WMode" VALUE="Opaque">'+
					'<PARAM NAME="Quality" VALUE="High">'+
					'<PARAM NAME="AllowScriptAccess" VALUE="always">'+
					'<PARAM NAME="AllowNetworking" VALUE="all">'+
					'<PARAM NAME="AllowFullScreen" VALUE="true">'+
					'<embed width="720" height="411" align="middle" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" bgcolor="#000000" id="flashplayer" name="_playerswf" quality="high" src="http://static.video.qq.com/TencentPlayer.swf" flashvars="version=20110407&amp;vid='+vid+'&amp;autoplay=1&amp;list=2&amp;loadingswf=http://imgcache.qq.com/minivideo_v1/vd/res/skins/web_small_loading.swf&amp;skin=http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf&amp;" wmode="Opaque">'+ 
				'</object>';
	return html;
}
function homeResize(){
	var layoverdiv,alertdiv,mtop,clientH,stop;
	$(window).resize(function(){
		layoverdiv = $('body > .layoverdiv:first');
		if(layoverdiv.length==0)return;
		alertdiv = $('body > .alertdiv:first');
		//layoverdiv.width($('body').outerWidth(true));
		mtop = -(alertdiv.outerHeight()/2);
		clientH = document.documentElement.clientHeight;
		stop = clientH/2+(document.documentElement.scrollTop==0?document.body.scrollTop:document.documentElement.scrollTop);
		if(stop+mtop<0){
		stop = 20;
		mtop = 0;
		}
		alertdiv.css('top',stop+'px').css('margin-top',mtop+'px');
	});
}
//弹出插件
jQuery.fn.setLightBox=function(options){
var layoverBg=options.layoverBg?options.layoverBg:'#fff';
var layoverOpa=options.layoverOpa?options.layoverOpa:'0.5';
var alertdivWidth=options.alertdivWidth?options.alertdivWidth:'auto';
var alertdivHeight=options.alertdivHeight?options.alertdivHeight:'auto';
var alertdivBg=options.alertdivBg?options.alertdivBg:'#fff';
var closebut=options.closeBut;
var layerdiv,alertdiv;var isfirst=true;
if(jQuery('.layoverdiv').length==0){
layerdiv=jQuery('<div class="layoverdiv" style="position:absolute;width:100%;height:100%;z-index:9998;left:0;top:0;display:none;"></div>');
alertdiv=jQuery('<div class="alertdiv" style="overflow:auto;position:absolute;top:50%;left:50%;display:none;z-index:9999;"></div>');
jQuery('body').append(alertdiv).append(layerdiv);
}else{
isfirst=false;
layerdiv=jQuery('.layoverdiv');
if(options.multil){
off=jQuery('.alertdiv').length*3+50+'%';
alertdiv=jQuery('<div class="alertdiv alertmultil" style="overflow:auto;position:absolute;top:'+off+';left:'+off+';display:none;z-index:9999;"></div>');
jQuery('body').append(alertdiv);
}else{
jQuery('.alertmultil').remove();
alertdiv=jQuery('.alertdiv');
}
}
layerdiv.css('background',layoverBg);
//layerdiv.width(jQuery('body').outerWidth(true));
layerdiv.height(jQuery('body').outerHeight(true)>document.documentElement.scrollHeight?jQuery('body').outerHeight(true):document.documentElement.scrollHeight);
alertdiv.css({'width':alertdivWidth,'height':alertdivHeight}).html('').append(jQuery(this));
if(!options.multil){
layerdiv.css('opacity','0').css('display','block').fadeTo(500,layoverOpa);
}
alertdiv.fadeIn(600,function(){
layerdiv.height(jQuery('body').outerHeight(true)>document.documentElement.scrollHeight?jQuery('body').outerHeight(true):document.documentElement.scrollHeight);
});
if(!options.canNotDrag){
var dragbodys=options.dragbody?alertdiv.find(options.dragbody):alertdiv;
if(alertdiv.find('img').length!=0){
if(options.closeBut||options.multil){
dragbodys.drag({dragbody: alertdiv,opacity: '0.8',preventEvent:true});
}else{
dragbodys.drag({dragbody: alertdiv,opacity: '0.8',preventEvent:true,mouseupFn:function(){if(!draged){$.ml.closeLightBox();}}});
}
}else{
if(options.closeBut||options.multil){
dragbodys.drag({dragbody: alertdiv,opacity: '0.8'});
}else{
dragbodys.drag({dragbody: alertdiv,opacity: '0.8',mouseupFn:function(){if(!draged){$.ml.closeLightBox();}}});
}
}
}
var mtop = -(alertdiv.outerHeight()/2);
var clientH = document.documentElement.clientHeight;
var clientW = document.documentElement.clientWidth;
var stop = clientH/2+(document.documentElement.scrollTop==0?document.body.scrollTop:document.documentElement.scrollTop);
if(stop+mtop<0){
stop = 20;
mtop = 0;
}
var inwindow_padding = 15;
alertdiv.css('top',stop+'px');
alertdiv.css({'margin-left':'-'+(alertdiv.outerWidth()/2+'px'),'margin-top':mtop+'px'});
jQuery(this).add(jQuery(this).find('img')).load(function(){
if(options.inWindow){
if(($(this).height())>clientH){
$(this).height(clientH-inwindow_padding*2);
}
if((false&&$(this).width())>clientH){
$(this).width(clientW-inwindow_padding*2);
}
}
stop = clientH/2+(document.documentElement.scrollTop==0?document.body.scrollTop:document.documentElement.scrollTop);
mtop = -(alertdiv.outerHeight()/2);
if(stop+mtop<0){
stop = 20;
mtop = 0;
alertdiv.css('top',stop+'px');
}
alertdiv.css('top',stop+'px');
alertdiv.css({'margin-left':'-'+(alertdiv.outerWidth()/2+'px'),'margin-top':mtop+'px'});
});
//}
if(!options.layerdivClick&&!options.multil){
layerdiv.unbind('click').click(function(){
$.ml.closeLightBox();
});
}
if(closebut!=undefined){
alertdiv.find(closebut).unbind('click').click(function(){
if(options.closeSelf){
$.ml.hideLightBox();
}else if(options.multil){
alertdiv.remove();
}else{
$.ml.closeLightBox();
}
});
}
if(options.sureBut!=undefined){
alertdiv.find(options.sureBut).unbind('click').click(function(){
$(this).attr('disabled',true);
if(options.closeSelf){
$.ml.hideLightBox();
}
if(typeof(options.sureFn)=='function'&&options.sureFn($(this),options.suerPara)===false){
$(this).attr('disabled',false);
return;
}
$(this).attr('disabled',false);
if(!options.closeSelf){
if(options.multil){
alertdiv.remove();
}else{
$.ml.closeLightBox();
}
}
});
}
if(options.closeSelfBut!=undefined){
alertdiv.find(options.closeSelfBut).unbind('click').click(function(){
alertdiv.remove();
});
}
};
$.ml = {closeLightBox:function(options){
$('#mod_player > *').remove();//首页，ＩＥ在关闭是可能还在播放视频
//$('body:first').append('<div id="tenvideo_flash_players"><div id="tenvideo_flash_player_0" class="none"></div></div>');//首页，IE会报找不到对象

$('.alertdiv,.layoverdiv').remove();
},hideLightBox:function(options){
$('#mod_player > *').remove();
//$('body:first').append('<div id="tenvideo_flash_player_0" class="none"></div>');

$('.alertdiv,.layoverdiv').remove();//.css('display','none');
}
};
function shareto(sign,pos){
var f= encodeURIComponent('http://hr.tencent.com/');
if(pos=='top'){
	var thet = '想加入吗？请登录hr.tencent.com，查看腾讯最新招聘动态。' 
	var t = encodeURIComponent(thet);
	var u = encodeURIComponent('http://hr.tencent.com/');
	var c = encodeURIComponent(t+'\n'+u);
}else if(pos=='news'){
	var thet = $('#newstitle').text();
	var t = encodeURIComponent(thet);
	var u = encodeURIComponent(window.location.href);
	var c = encodeURIComponent(thet+'\n'+u);
}else{
	pos = 'position';
	var sharet = $('#sharetitle').text();
	var shareu = window.location.href;
	var sharec = '推荐腾讯职位——'+sharet;
	if(sign=='kaixin001'||sign=='renren'){
		var t= encodeURIComponent(sharet);
		var c= encodeURIComponent(sharec+'\n'+shareu);
		var u= encodeURIComponent(shareu);
	}else{
		var t= encodeURIComponent(sharec);
		var u= encodeURIComponent(shareu);
	}
}

if(typeof(pgvSendClick)=='function'){
	pgvSendClick({hottag:'HRTENCENT.BSHARE.'+pos.toUpperCase()+'.'+sign.toUpperCase()});//点击流记录
}

if(sign=='sinat'){//y
	window.open('http://v.t.sina.com.cn/share/share.php?title='+t+'&url='+u);
}else if(sign=='qqt'){//y
	window.open('http://v.t.qq.com/share/share.php?title='+t+'&url='+u+'&site='+f);
}else if(sign=='kaixin001'){//y
	window.open('http://www.kaixin001.com/repaste/share.php?rtitle='+t+'&rurl='+u+'&ufrom='+f+'&rcontent='+c);
}else if(sign=='renren'){
	window.open('http://share.renren.com/share/buttonshare.do?title='+t+'&link='+u+'&content=');
}else if(sign=='qzone'){
	window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?site='+f+'&url='+u+'&title='+t);
}else if(sign=='pengyou'){
	window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&site='+f+'&url='+u+'&title='+t);
}
}/*  |xGv00|4e27f538e3758afc16a00d19bfc3f642 */