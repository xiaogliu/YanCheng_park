$(document).ready(function(){
   var height = document.documentElement.clientHeight ; 
      $(".lb-mydiv").height(height) ;   
});
function AdaptHeight(){
    height = $(window).height();    // 获取浏览器可是窗口的高度
    $('.container_page').css('height',height);   // 赋值给页面的高度属性
    }
window.onresize = AdaptHeight();    // onresize 事件会在窗口或框架被调整大小时发生。
