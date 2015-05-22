//= require_tree .

$(function() {
  function smoothScroll(event){
    var offset = event.data.offset,
        value = null

    event.preventDefault();

    if (event.data.value > 0) {
      value = event.data.value
    } else {
      value = $($(this).attr('href')).offset().top
    }

    $('html, body').animate({
        scrollTop: value
    }, 700);
  };

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('#team').height(1200);
    $('[name=team]').on('click', {offset: 0}, smoothScroll);
    $('[name=about]').on('click', {offset: -50}, smoothScroll);
    $('[name=contact]').on('click', {offset: 0}, smoothScroll);
    $('[name=location]').on('click', {offset: 0}, smoothScroll);
    $('[name=home]').on('click', {offset: -100}, smoothScroll);
  } else {
    skrollr.init({forceHeight: false, render: function(data) { console.log(data.curTop) }  });
    $('[name=home]').on('click', {value: 0}, smoothScroll);
    $('[name=team]').on('click', {value: 2100}, smoothScroll);
    $('[name=about]').on('click', {value: 1300}, smoothScroll);
    $('[name=contact]').on('click', {value: 3250}, smoothScroll);
    $('[name=location]').on('click', {value: 4400}, smoothScroll);
  }
});
