
/*
 *	sGallery 1.0 - simple gallery with jQuery
 *	made by bujichong 2009-11-25
 *	浣滆€咃細涓嶇緛铏�  2009-11-25
 * http://hi.baidu.com/bujichong/
 *	娆㈣繋浜ゆ祦杞浇锛屼絾璇峰皧閲嶄綔鑰呭姵鍔ㄦ垚鏋滐紝鏍囨槑鎻掍欢鏉ユ簮鍙婁綔鑰�
 */

(function ($) {
$.fn.sGallery = function (o) {
    return  new $sG(this, o);
			//alert('do');
    };

	var settings = {
		thumbObj:null,//棰勮瀵硅薄
		titleObj:null,//鏍囬
		botLast:null,//鎸夐挳涓婁竴涓�
		botNext:null,//鎸夐挳涓嬩竴涓�
		thumbNowClass:'now',//棰勮瀵硅薄褰撳墠鐨刢lass,榛樿涓簄ow
		slideTime:800,//骞虫粦杩囨浮鏃堕棿
		autoChange:true,//鏄惁鑷姩鍒囨崲
		changeTime:5000,//鑷姩鍒囨崲鏃堕棿
		delayTime:100//榧犳爣缁忚繃鏃跺弽搴旂殑寤惰繜鏃堕棿
	};

 $.sGalleryLong = function(e, o) {
    this.options = $.extend({}, settings, o || {});
	var _self = $(e);
	var set = this.options;
	var thumb;
	var size = _self.size();
	var nowIndex = 0; //瀹氫箟鍏ㄥ眬鎸囬拡
	var index;//瀹氫箟鍏ㄥ眬鎸囬拡
	var startRun;//棰勫畾涔夎嚜鍔ㄨ繍琛屽弬鏁�
	var delayRun;//棰勫畾涔夊欢杩熻繍琛屽弬鏁�

//鍒濆鍖�
	_self.eq(0).show();

//涓诲垏鎹㈠嚱鏁�
function fadeAB () {
	if (nowIndex != index) {
		if (set.thumbObj!=null) {
		$(set.thumbObj).removeClass().eq(index).addClass(set.thumbNowClass);}
		_self.eq(nowIndex).stop(false,true).fadeOut(set.slideTime);
		_self.eq(index).stop(true,true).fadeIn(set.slideTime);
		$(set.titleObj).eq(nowIndex).hide();//鏂板鍔爐itle
		$(set.titleObj).eq(index).show();//鏂板鍔爐itle
		nowIndex = index;
		if (set.autoChange==true) {
		clearInterval(startRun);//閲嶇疆鑷姩鍒囨崲鍑芥暟
		startRun = setInterval(runNext,set.changeTime);}
		}
}

//鍒囨崲鍒颁笅涓€涓�
function runNext() {
	index =  (nowIndex+1)%size;
	fadeAB();
}

//鐐瑰嚮浠讳竴鍥剧墖
	if (set.thumbObj!=null) {
	thumb = $(set.thumbObj);
//鍒濆鍖�
	thumb.eq(0).addClass(set.thumbNowClass);
		thumb.bind("mousemove",function(event){
			index = thumb.index($(this));
			fadeAB();
			delayRun = setTimeout(fadeAB,set.delayTime);
			clearTimeout(delayRun);
			event.stopPropagation();
		})
	}

//鐐瑰嚮涓婁竴涓�
	if (set.botNext!=null) {
		var botNext = $(set.botNext);
		botNext.mousemove(function () {
			runNext();
			return false;
		});
	}

//鐐瑰嚮涓嬩竴涓�
	if (set.botLast!=null) {
		var botLast = $(set.botLast);
		botLast.mousemove(function () {
			index = (nowIndex+size-1)%size;
			fadeAB();
			return false;
	});
	}

//鑷姩杩愯
	if (set.autoChange==true) {
	startRun = setInterval(runNext,set.changeTime);
	}

}

var $sG = $.sGalleryLong;

})(jQuery);

function slide(Name,Class,Width,Height,fun){
	$(Name).width(Width);
	$(Name).height(Height);
	
	if(fun == true){
		$(Name).append('<div class="title-bg"></div><div class="title"></div><div class="change"></div>')
		var atr = $(Name+' div.changeDiv a');
		var sum = atr.length;
		for(i=1;i<=sum;i++){
			var title = atr.eq(i-1).attr("title");
			var href = atr.eq(i-1).attr("href");
			$(Name+' .change').append('<i>'+i+'</i>');
			$(Name+' .title').append('<a href="'+href+'">'+title+'</a>');
		}
		$(Name+' .change i').eq(0).addClass('cur');
	}
	$(Name+' div.changeDiv a').sGallery({//瀵硅薄鎸囧悜灞傦紝灞傚唴鍖呭惈鍥剧墖鍙婃爣棰�
		titleObj:Name+' div.title a',
		thumbObj:Name+' .change i',
		thumbNowClass:Class
	});
	$(Name+" .title-bg").width(Width);
}

//缂╃暐鍥�
jQuery.fn.LoadImage=function(scaling,width,height,loadpic){
    if(loadpic==null)loadpic="../images/msg_img/loading.gif";
return this.each(function(){
   var t=$(this);
   var src=$(this).attr("src")
   var img=new Image();
   img.src=src;
   //鑷姩缂╂斁鍥剧墖
   var autoScaling=function(){
    if(scaling){
     if(img.width>0 && img.height>0){ 
           if(img.width/img.height>=width/height){ 
               if(img.width>width){ 
                   t.width(width); 
                   t.height((img.height*width)/img.width); 
               }else{ 
                   t.width(img.width); 
                   t.height(img.height); 
               } 
           } 
           else{ 
               if(img.height>height){ 
                   t.height(height); 
                   t.width((img.width*height)/img.height); 
               }else{ 
                   t.width(img.width); 
                   t.height(img.height); 
               } 
           } 
       } 
    } 
   }
   //澶勭悊ff涓嬩細鑷姩璇诲彇缂撳瓨鍥剧墖
   if(img.complete){
    autoScaling();
      return;
   }
   $(this).attr("src","");
   var loading=$("<img alt=\"鍔犺浇涓�...\" title=\"鍥剧墖鍔犺浇涓�...\" src=\""+loadpic+"\" />");
  
   t.hide();
   t.after(loading);
   $(img).load(function(){
    autoScaling();
    loading.remove();
    t.attr("src",this.src);
    t.show();
	//$('.photo_prev a,.photo_next a').height($('#big-pic img').height());
   });
  });
}

//鍚戜笂婊氬姩浠ｇ爜
function startmarquee(elementID,h,n,speed,delay){
 var t = null;
 var box = '#' + elementID;
 $(box).hover(function(){
  clearInterval(t);
  }, function(){
  t = setInterval(start,delay);
 }).trigger('mouseout');
 function start(){
  $(box).children('ul:first').animate({marginTop: '-='+h},speed,function(){
   $(this).css({marginTop:'0'}).find('li').slice(0,n).appendTo(this);
  })
 }
}

//TAB鍒囨崲
function SwapTab(name,title,content,Sub,cur){
  $(name+' '+title).mouseover(function(){
	  $(this).addClass(cur).siblings().removeClass(cur);
	  $(content+" > "+Sub).eq($(name+' '+title).index(this)).show().siblings().hide();
  });
}