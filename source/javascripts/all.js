//= require_tree .


$(function() {
  var $headerHeight = 0;
  var sections = [];
  var $headerOffset = 0
  var $teamValue = 0;
  var $teamRowOffsetTop = 0
  var $teamSectionHeight = 0
  var $window = $(window);
  var mapInstances = [];

  function initScrollSpy() {
    $headerHeight = $('#header').height();
    $aboutSectionOffsetTop =  $('#about-us').offset().top
    $teamSectionOffsetTop = $('#team').offset().top
    $contactSectionOffsetTop = $('#contact').offset().top
    $headerOffset = $('#home').height();
    $teamSectionHeight = $('#team').height()
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
        value = event.data.value;

    event.preventDefault();

    $('html, body').animate({
        scrollTop: value
    }, 300);
  }

  function fixedHeader(event) {
    var $header = $('#header');
    var offset = event.data.offset;

    if($(this).scrollTop() > offset) {
      $header.addClass('header--fixed');
    } else {
      $header.removeClass('header--fixed');
    }
  }

  function moveElphant(event) {
    var removeAnimationOffset = $('#about-us').offset().top;
    var offset = event.data.offset + event.data.sectionHeight/20;
    var $scrollTop = $(this).scrollTop();

    if($scrollTop > offset) {
      $('.team__elephant').each(function() {
        $(this).addClass('elphant--move');
      });
    } else if ($scrollTop < removeAnimationOffset)  {
      $('.team__elephant').each(function() {
        $(this).removeClass('elphant--move');
      });
    }
  }

  $pluginInstance = $('.google-map').lazyLoadGoogleMaps({
    api_key: 'AIzaSyDlS1-sSq3TgIwDkochEakCeg4aZigmojM',
    callback: function(container, map) {
      var $container  = $(container);
      var center      = new google.maps.
        LatLng($container.attr( 'data-lat' ), $container.attr('data-lng'));

      map.setOptions({ zoom: 16, center: center, scrollwheel: false, navigationControl: false });
      var marker = new google.maps.Marker({ position: center, map: map });
      infowindow = new google.maps.InfoWindow({content: $container.data('marker') });

      google.maps.event.addListener(marker, "click", function() {
        infowindow.open(map,marker);
      });
      infowindow.open(map,marker);
      $.data(map, 'center', center);
      mapInstances.push(map);
    }
  });

  $window.on('resize', $pluginInstance.debounce(1000, function() {
   $.each(mapInstances, function() {
     this.setCenter($.data(this,'center'));
   });
  }));

  $(document).on('ready', initScrollSpy());
  $window.on('scroll', {sections: sections}, scrollSpy);
  $window.on('scroll', {offset: $teamSectionOffsetTop, sectionHeight: $teamSectionHeight }, moveElphant);
  $window.on('scroll', {offset: $headerOffset }, fixedHeader);

  $('[name=about-init]').on('click', {value: $aboutSectionOffsetTop - $headerHeight}, smoothScroll);
  $('[name=home]').on('click', {value: 0}, smoothScroll);
  $('[name=team]').on('click', {value: $teamSectionOffsetTop - $headerHeight}, smoothScroll);
  $('[name=about]').on('click', {value: $aboutSectionOffsetTop - $headerHeight}, smoothScroll);
  $('[name=contact]').on('click', {value: $contactSectionOffsetTop - $headerHeight - 50}, smoothScroll);
});
