$(document).ready(function(){

	$(".main_nav li:has('ul')").children("a").append("<span class='drop_down_icon fa fa-chevron-down'></span>");			
	if ($(window).width() < 1200) {
		$(".main_nav li").not(".sub-menu li a").click(function(){
			$(this).find(".drop_down_icon").toggleClass('rotate_icon');
			$(this).find(".sub-menu").slideToggle(400);
		});
		
		$(".toggle_icon").click(function(){
			$(".main_nav").toggleClass('activeMainNav');
			$(this).find('b').toggleClass('creatCross');
			$(".sub-menu").slideUp(400);
			$(".drop_down_icon").removeClass('rotate_icon');
		});	
		
    }
	else{
		$(window).scroll(function() {
			var scroll = $(window).scrollTop();

			if (scroll >= 40) {
				$('header').addClass('sticky_header');
				$('.innerHeader').addClass('stickyinnerHeader');
				$('.headerBtnGrp').slideUp(300);
			} else {
				$('header').removeClass('sticky_header');
				$('.innerHeader').removeClass('stickyinnerHeader');
				$('.headerBtnGrp').slideDown(300);
			}
		});
		$(".main_nav li").not(".sub-menu li").hover(function(){
			$(this).find(".drop_down_icon").toggleClass('rotate_icon');
			$(this).find(".sub-menu").fadeToggle(400);
		});	
	}
});