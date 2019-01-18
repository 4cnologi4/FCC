
$(document).ready(function(){
  var alto = $('.nav').offset().top;

    $(window).on('scroll', function(){
        if ( $(window).scrollTop() > alto ){
            $('.nav').addClass('menu-fixed');
          } else {
            $('.nav').removeClass('menu-fixed');
        }
    });
});
