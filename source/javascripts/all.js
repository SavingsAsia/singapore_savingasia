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
  }

  function fixedHeader() {
    var $header = $('#header .container__header__bar');
    var offset = $('#home').height();

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

  $( window ).on( "orientationchange", function( event ) {
    location.reload();
  });

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
        scaleControl: false,
        mapTypeControl: false,
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


  var lastId,
    topMenu = $("#header");
    topMenuHeight = topMenu.outerHeight()+15;
    // All list items
    menuItems = $("#header a, .arrow--down, .footer__wrapper--logo a");

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
      offsetTop = $('#header .header__navbar').hasClass('header--fixed') ?
        0 : topMenuHeight - 15;

      offsetTop = $(href).offset().top - offsetTop;
    } else {
      offsetTop = $('#header .header__navbar').hasClass('header--fixed') ?
        topMenuHeight-20 :  topMenuHeight-30;

      offsetTop = $(href).offset().top - offsetTop;
    }

    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 500);
    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function(){
     fixedHeader();
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

  $('.js-singapore').mouseover(function() {
    $(this).find('.js-overlay').css({
      "z-index" : "0",
      "opacity" : "0.0",
      "transition" : "opacity 0.7s ease-in-out"
    })
  })

  $('.js-bangkok').mouseover(function() {
    $(this).find('.js-overlay').css({
      "z-index" : "0",
      "opacity" : "0.0",
      "transition" : "opacity 0.7s ease-in-out"
    })
  })


  $('.js-singapore').mouseleave(function() {
    $(this).find('.js-overlay').css({
      "opacity" : "0.4",
      "transition" : "opacity 0.7s ease-in-out"
    })
  })

  $('.js-bangkok').mouseleave(function() {
    $(this).find('.js-overlay').css({
      "opacity" : "0.4",
      "transition" : "opacity 0.7s ease-in-out"
    })
  })

  $(document).on('ready', initScrollSpy());
});
