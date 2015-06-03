//= require_tree .

$(function() {
  var sections = [];

  function initScrollSpy(sections) {
    $('.js-nav-main').find('a').each(function() {
      sections.push($(this).attr('href'));
    });
  }

  function scrollSpy(event) {
    var activeSection;
    var i;
    var len;
    var scrollPosition;
    var $section;
    var $scrollPosition = $(window).scrollTop();
    var sections = event.data.sections;
    var $navMain = $('.js-nav-main');

    for (i = 0, len = sections.length; i < len; i++) {
      $section = $(sections[i]);
      if ($scrollPosition >= $section.offset().top - 70) {
        activeSection = $section.attr('id');
      }
    }
    $navMain.find('a').removeClass('active');
    return $navMain.find("a[href='#" + activeSection + "']").addClass('active');
  }

  function smoothScroll(event){
    var offset = event.data.offset,
        value = null;

    event.preventDefault();

    if (event.data.value > 0) {
      value = event.data.value;
    } else {
      value = $($(this).attr('href')).offset().top;
    }

    $('html, body').animate({
        scrollTop: value
    }, 500);
  }


  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('#team').height(1200);
    $('[name=team]').on('click', {offset: 0}, smoothScroll);
    $('[name=about]').on('click', {offset: -50}, smoothScroll);
    $('[name=contact]').on('click', {offset: 0}, smoothScroll);
    $('[name=location]').on('click', {offset: 0}, smoothScroll);
    $('[name=home]').on('click', {offset: -100}, smoothScroll);
  } else {
    skrollr.init({forceHeight: false, render: function(data) {} });
    $(document).on('ready', initScrollSpy(sections));
    $(window).on('scroll', {sections: sections}, scrollSpy);
    $('[name=home]').on('click', {value: 0}, smoothScroll);
    $('[name=team]').on('click', {value: 2100}, smoothScroll);
    $('[name=about]').on('click', {value: 1250}, smoothScroll);
    $('[name=contact]').on('click', {value: 3250}, smoothScroll);
    $('[name=location]').on('click', {value: 4400}, smoothScroll);
  }
});
