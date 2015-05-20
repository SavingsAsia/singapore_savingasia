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
    var offset = event.data.offset
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top + offset
    }, 700);
    return false;
  };

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('#team').height(1200);
    $('[name=team]').on('click', {offset: 0}, smoothScroll);
    $('[name=about]').on('click', {offset: -50}, smoothScroll);
    $('[name=contact]').on('click', {offset: 0}, smoothScroll);
    $('[name=location]').on('click', {offset: 0}, smoothScroll);
    $('[name=home]').on('click', {offset: -100}, smoothScroll);
  } else {
    $('[name=home]').on('click', {offset: 0}, smoothScroll);
    $('[name=team]').on('click', {offset: 500}, smoothScroll);
    $('[name=about]').on('click', {offset: 0}, smoothScroll);
    $('[name=contact]').on('click', {offset: 0}, smoothScroll);
    $('[name=location]').on('click', {offset: -50}, smoothScroll);
    skrollr.init({forceHeight: false});
    $(window).on('scroll', {position: teamScrollPosition, target: '.team'}, hideTarget);
  }
});
