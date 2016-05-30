$(function () {


    //回头部
    $('.back_to_top').hide();
    $(window).scroll(function () {
        if ($(window).scrollTop() > 150) {
            $('.back_to_top').fadeIn();
        } else {
            $('.back_to_top').fadeOut();
        }
    });

    $('.back_to_top').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 600);
        return false;
    });


})

//选项卡
function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}