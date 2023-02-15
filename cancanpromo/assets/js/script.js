$(function(){
	windowheight();
});
function windowheight(){
 $('.header_wrapper, .purpose_wrap, .partner_wrap, .booster_wrap').css({'height':$(window).height()});
 $(window).resize(function(){
  $('.header_wrapper, .purpose_wrap, .partner_wrap, .booster_wrap').css({'height':$(window).height()});
 });
}