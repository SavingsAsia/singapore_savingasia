//= require_tree .

$(function() {
  var team = $('.team')
  var teamScrollPosition = $(document).height() - team.height() + 200;

  function hideTarget(event) {
    var $scroll = $(window).scrollTop(),
        $target = $(event.data.target);

    if ($scroll >= event.data.position) {
        $target.addClass("hide");
    } else {
        $target.removeClass("hide");
    }
  }

  function smoothScroll(event){
      $('html, body').animate({
          scrollTop: $( $(this).attr('href') ).offset().top
      }, 700);
      return false;
  };

  $('a').on('click', smoothScroll);

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    return
  } else {
    skrollr.init();
    $(window).on('scroll', {position: teamScrollPosition, target: '.team'}, hideTarget);
  }
});
