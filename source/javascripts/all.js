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
    $headerOffset = $('#home').height() + 100;
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

      map.setOptions({
        zoom: 16,
        center: center,
        scrollwheel: false,
        navigationControl: false,
        draggable: false
      });
      var marker = new google.maps.Marker({ position: center, map: map });
      infowindow = new google.maps.InfoWindow({
        content: $container.data('marker'),
      });

      google.maps.event.addListener(infowindow, 'domready', function(){
        $(".gm-style-iw").next("div").hide();
      });
      google.maps.event.addListener(map, "tilesloaded", function() {
        $container.parent().children().first().hide();
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

  //$.extend($.scrollTo.defaults, {
    //axis: 'y',
    //duration: 300
  //});

  var lastId,
    topMenu = $("#header");
    topMenuHeight = topMenu.outerHeight()+15;
    // All list items
    menuItems = $("#header a, .home a.arrow-down");

  // Anchors corresponding to menu items
  var scrollItems = menuItems.map(function(){
    var item = $($(this).attr("href"));
    if (item.length) { return item; }
  });

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function(e) {
    var offsetTop;
    var href = $(this).attr("href");

    if(href === "#home") {
      offsetTop = 0;
    } else if(href === "#about-us") {
      offsetTop = $('#header').hasClass('header--fixed') ?
        0 : topMenuHeight-10;

      offsetTop = $(href).offset().top - offsetTop;
    } else {
      offsetTop = $('#header').hasClass('header--fixed') ?
        topMenuHeight-20 : (2*topMenuHeight)-30;

      offsetTop = $(href).offset().top - offsetTop;
    }

    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function(){
     // Get container scroll position
     var fromTop = $(this).scrollTop()+topMenuHeight;

     // Get id of current scroll item
     var cur = scrollItems.map(function() {
       if ($(this).offset().top < fromTop)
         return this;
     });
     // Get the id of the current element
     cur = cur[cur.length-1];
     var id = cur && cur.length ? cur[0].id : "";

     if (lastId !== id) {
         lastId = id;
         // Set/remove active class
         menuItems
           .parent().removeClass("active")
           .end().filter("[href=#"+id+"]").parent().addClass("active");
     }
  });

  $(document).on('ready', initScrollSpy());
  $window.on('scroll', {offset: $headerOffset }, fixedHeader);

  //$('[name=about-init]').on('click', {value: $aboutsectionoffsettop - $headerheight}, smoothscroll);
  //$('[name=home]').on('click', {value: 0}, smoothscroll);
  //$('[name=team]').on('click', {value: $teamsectionoffsettop - (window.devicepixelratio * $headerheight)}, smoothscroll);
  //$('[name=about]').on('click', {value: $aboutsectionoffsettop - $headerheight}, smoothscroll);
  //$('[name=contact]').on('click', {value: $contactsectionoffsettop - (window.devicepixelratio * $headerheight)}, smoothscroll);
});
