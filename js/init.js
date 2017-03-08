'use strict';

var $ = window.jQuery;

//ON DOCUMENT READY
$(document).ready(function() {

    //SVG for Everybody (ie9+, ...)
    svg4everybody();

  var screen_height = $(window).height();
  //detect firefox
  if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
  {
       $('.hero .tableize').css('height', screen_height);
  }

  //SMOOTHSCROLL for better page scroll on click on link
  $('.btn--scroll-to').smoothScroll({
    offset: 0,
    // one of 'top' or 'left'
    direction: 'top',
    // only use if you want to override default behavior
    scrollTarget: null,
    // fn(opts) function to be called before scrolling occurs.
    // `this` is the element(s) being scrolled
    beforeScroll: function() {},
    // fn(opts) function to be called after scrolling occurs.
    // `this` is the triggering element
    afterScroll: function() {},
    easing: 'easeInOutCubic',
    speed: 400,
    // coefficient for "auto" speed
    autoCoefficent: 1,
    // $.fn.smoothScroll only: whether to prevent the default click action
    preventDefault: true
  });

  //OWLCAROUSEL2 plugin for slider
  $('.owl-carousel').owlCarousel({
      items: 1,
      loop: true,
      nav: true,
      dots: true,
      margin: 0,
      autoHeight: true,
      navText: [
        "<span><svg role='img' class='icon icon-slider-arrow'><use xlink:href='icons/icons.svg#icon-arrow-left'></use></svg></span>",
        "<span><svg role='img' class='icon icon-slider-arrow'><use xlink:href='icons/icons.svg#icon-arrow-right'></use></svg></span>"
      ]
  });

  //MAGINFIC POPUP for sign in
  $('.js-openpopup').magnificPopup({
      type: 'inline',
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: 'my-mfp-zoom-in'
  });

  $("select").selectOrDie();

  var setConfig = function(parentClass) {
    return {
      $bookBlock : $( '.' + parentClass + ' .bb-bookblock' ),
      $navNext : $(  '.' + parentClass + ' .bb-nav-next' ),
      $navPrev : $( '.' + parentClass + ' .bb-nav-prev' ),
      $navFirst : $( '.' + parentClass + ' .bb-nav-first' ),
      $navLast : $( '.' + parentClass + ' .bb-nav-last' )
    }
  };

  var initEvents = function(config) {

      var $slides = config.$bookBlock.children();

      // add navigation events
      config.$navNext.on( 'click touchstart', function() {
          config.$bookBlock.bookblock( 'next' );
          return false;
      } );

      config.$navPrev.on( 'click touchstart', function() {
          config.$bookBlock.bookblock( 'prev' );
          return false;
      } );

      config.$navFirst.on( 'click touchstart', function() {
          config.$bookBlock.bookblock( 'first' );
          return false;
      } );

      config.$navLast.on( 'click touchstart', function() {
          config.$bookBlock.bookblock( 'last' );
          return false;
      } );

      // add swipe events
      $slides.on( {
          'swipeleft' : function( event ) {
              config.$bookBlock.bookblock( 'next' );
              return false;
          },
          'swiperight' : function( event ) {
              config.$bookBlock.bookblock( 'prev' );
              return false;
          }
      } );

      // add keyboard events
      $( document ).keydown( function(e) {
          var keyCode = e.keyCode || e.which,
              arrow = {
                  left : 37,
                  up : 38,
                  right : 39,
                  down : 40
              };

          switch (keyCode) {
              case arrow.left:
                  config.$bookBlock.bookblock( 'prev' );
                  break;
              case arrow.right:
                  config.$bookBlock.bookblock( 'next' );
                  break;
          }
      } );
  };

  var initBook = function(config) {
      config.$bookBlock.bookblock( {
          speed : 800,
          shadowSides : 0.8,
          shadowFlip : 0.7
      } );
      initEvents(config);
  };

  // Check the bug with showing next page in top left corner while flipping
  initBook(setConfig('first_boy'));
  /*initBook(setConfig('first_girl'));
  initBook(setConfig('second_boy'));
  initBook(setConfig('second_girl'));*/

  //$( '#bb-bookblock' ).bookblock();

  //MAGINFIC POPUP for sign in
  // var contact_form = $('#contact-form');
  // contact_form.validate({
  //     errorElement: 'div',
  //     errorClass: 'error',
  //     rules: {
  //         birthday: "required",
  //         name: "required",
  //         birthplace: "required",
  //         first_word: "required",
  //         message: "required"
  //     },
  //     messages: {
  //         birthday: "Please enter your birthday",
  //         birthday: "Please enter your birthplace",
  //         name: "Please enter your name",
  //         first_word: "Please enter your first word",
  //         message: "Please write your message."
  //     },
  //     submitHandler: function(form) {
  //       console.log('ok');

  //         $.ajax({
  //             success: function(response) {


  //             }
  //         });
  //     },
  //     invalidHandler: function(event, validator) {
  //       console.log('not');
  //     }
  // });

  $('.btn--preview').on('click', function(e) {
      // $(this).attr('href', '.' + $('.sod_label').text().replace(' ','_').toLowerCase() );
      e.preventDefault();
      var child_class = $('.sod_label').text().replace(' ','_').toLowerCase();

      $.magnificPopup.open({
          items: {
              src: $('.' + child_class + '')
          },
          type: 'inline',
          fixedContentPos: true,
          fixedBgPos: true,
          overflowY: 'auto',
          closeBtnInside: true,
          preloader: false,
          midClick: true,
          removalDelay: 300,
          mainClass: 'my-mfp-zoom-in',
          callbacks: {
              open: function() {
                  var child_class = $('.sod_label').text().replace(' ','_').toLowerCase();
                  var child_name_val = $('.childs_name').val();
                  //        var child_name = {
                  //            name: child_name_val !== '' ? child_name_val : '[Please enter child\'s name]',
                  //            fontSize: child_name_val !== '' ? '15px' : '12px',
                  //            width: child_name_val !== '' ? 'auto' : '20%',
                  //            color: child_name_val !== '' ? '#901815' : '#000'
                  //        };

                  var child_gender = child_class.indexOf('boy') !== -1 ? 'he' : 'she';

                  var birthday_val = $('.birthday').val();
                  //        var birthday ={
                  //            date: birthday_val !== '' ? birthday_val : '[Please enter child\'s birthday]',
                  //            fontSize: birthday_val !== '' ? '15px' : '12px',
                  //            width: birthday_val !== '' ? '17%' : '20%',
                  //            color: birthday_val !== '' ? '#901815' : '#000'
                  //        };

                  var birthplace_val = $('.birthplace').val();
                  //        var birthplace = {
                  //            city: birthplace_val !== '' ? birthplace_val : '[Please enter child\'s birthplace]',
                  //            fontSize: birthplace_val !== '' ? '15px' : '12px',
                  //            width: birthplace_val !== '' ? '17%' : '22%',
                  //            right: birthplace_val !== '' ? '17%' : '14.3%',
                  //            color: birthplace_val !== '' ? '#901815' : '#000'
                  //        };

                  var first_word_val = $('.first_word').val();
                  //        var first_word = {
                  //            word: first_word_val !== '' ? first_word_val : '[Please enter child\'s first word]',
                  //            fontSize: first_word_val !== '' ? '15px' : '12px',
                  //            color: first_word_val !== '' ? '#901815' : '#000'
                  //        };

                  var message_val = $('.special_message').val();
                  //        var message = {
                  //            special: message_val !== '' ? message_val : '[Please enter special message for child]',
                  //            fontSize: message_val !== '' ? '15px' : '12px',
                  //            color: message_val !== '' ? '#901815' : '#000',
                  //        };

                  $('.preview').hide();
                  $('.' + child_class).show();
                  initBook(setConfig(child_class));

                  // Name positioning
                  $('.' + child_class + ' .page_0_name').text(child_name_val);
                      //.text(child_name.name).css('font-size', child_name.fontSize).css('width', child_name.width);
                      $('.' + child_class + ' .page_1_name').text(child_name_val);
                      //.text(child_name.name).css('font-size', child_name.fontSize).css('width', child_name.width);
                      $('.' + child_class + ' .page_2_name').text(child_name_val);
                      //.text(child_name.name).css('font-size', child_name.fontSize).css('width', child_name.width);
                      $('.' + child_class + ' .page_3_name').text(child_name_val);
                      //.text(child_name.name).css('font-size', child_name.fontSize).css('width', child_name.width);
                      $('.' + child_class + ' .page_9_name').text(child_name_val);
                      //.text(child_name.name).css('font-size', child_name.fontSize).css('width', child_name.width);
                      $('.' + child_class + ' .page_12_name').text(child_name_val);
                      //.text(child_name.name).css('font-size', child_name.fontSize).css('width', child_name.width);
                      $('.' + child_class + ' .page_12_name2').text(child_name_val);
                      //.text(child_name.name).css('font-size', child_name.fontSize).css('width', '18%');;

                  //
                  //        if(child_name_val === '') {
                  //            $('.' + child_class + ' .page_1_name').css('left', '22%').css('top', '16.5%');
                  //            $('.' + child_class + ' .page_2_name').css('right', '13.5%').css('bottom', '7.5%');
                  //            $('.' + child_class + ' .page_9_name').css('left', '12.4%').css('top','20%').css('font-size','11px');
                  //            $('.' + child_class + ' .page_12_name').css('right', '16%');
                  //        } else {
                  //            $('.' + child_class + ' .page_0_name').css('width', '17%');
                  //            $('.' + child_class + ' .page_1_name').css('width', '17%').css('left', '23%').css('top', '16%');
                  //            $('.' + child_class + ' .page_2_name').css('width', '17%').css('right', '15%').css('bottom', '7%');
                  //            $('.' + child_class + ' .page_3_name').css('width', '20%');
                  //            $('.' + child_class + ' .page_9_name').css('width', '15%').css('top','19%').css('left', '15%');
                  //            $('.' + child_class + ' .page_12_name').css('width', '16%').css('right', '18%');
                  //            $('.' + child_class + ' .page_12_name2').css('width', '17%');
                  //        }

                          // Gender
                          $('.' + child_class + ' .page_12_gender').text(child_gender);

                          // Date of birth
                          $('.' + child_class + ' .page_12_birthday').text(birthday_val);
                              //.css('font-size', birthday.fontSize).css('width', birthday.width);

                          // Birthplace
                          $('.' + child_class + ' .page_12_city').text(birthplace_val);
                              //.css('font-size', birthplace.fontSize).css('width', birthplace.width).css('right', birthplace.right);

                          // First word
                          $('.' + child_class + ' .page_14_first_word').text(first_word_val);
                              //.css('font-size', first_word.fontSize);

                          // Special Message
                          $('.' + child_class + ' .page_16_message').text(message_val);
                              //.css('font-size', message.fontSize);

                          // Book title
                          var finds_magic = $('.finds_magic').val();
                          var custom_title = $('.custom_title').val();
                          var names_book = $('.names_book').val();

                          var title;


                          if(finds_magic !== '') {
                              title = finds_magic + ' Finds Magic';
                          } else if(custom_title !== '') {
                              title = custom_title;
                          } else if(names_book !== '') {
                              title = names_book + '\'s Book';
                          } else {
                              title = '';//[Please enter book\'s title]';
                          }


                          $('.' + child_class + ' .front_cover_name').text(title);

              }
          }
      });
  });

  // $('.btn--preview').magnificPopup({
  //     type: 'inline',
  //     fixedContentPos: true,
  //     fixedBgPos: true,
  //     overflowY: 'auto',
  //     closeBtnInside: true,
  //     preloader: false,
  //     midClick: true,
  //     removalDelay: 300,
  //     mainClass: 'my-mfp-zoom-in',
  //     callbacks: {
  //         open: function() {
  //             var child_class = $('.sod_label').text().replace(' ','_').toLowerCase();
  //             var child_name_val = $('.childs_name').val();
  //             //        var child_name = {
  //             //            name: child_name_val !== '' ? child_name_val : '[Please enter child\'s name]',
  //             //            fontSize: child_name_val !== '' ? '15px' : '12px',
  //             //            width: child_name_val !== '' ? 'auto' : '20%',
  //             //            color: child_name_val !== '' ? '#901815' : '#000'
  //             //        };

  //             var child_gender = child_class.indexOf('boy') !== -1 ? 'he' : 'she';

  //             var birthday_val = $('.birthday').val();
  //             //        var birthday ={
  //             //            date: birthday_val !== '' ? birthday_val : '[Please enter child\'s birthday]',
  //             //            fontSize: birthday_val !== '' ? '15px' : '12px',
  //             //            width: birthday_val !== '' ? '17%' : '20%',
  //             //            color: birthday_val !== '' ? '#901815' : '#000'
  //             //        };

  //             var birthplace_val = $('.birthplace').val();
  //             //        var birthplace = {
  //             //            city: birthplace_val !== '' ? birthplace_val : '[Please enter child\'s birthplace]',
  //             //            fontSize: birthplace_val !== '' ? '15px' : '12px',
  //             //            width: birthplace_val !== '' ? '17%' : '22%',
  //             //            right: birthplace_val !== '' ? '17%' : '14.3%',
  //             //            color: birthplace_val !== '' ? '#901815' : '#000'
  //             //        };

  //             var first_word_val = $('.first_word').val();
  //             //        var first_word = {
  //             //            word: first_word_val !== '' ? first_word_val : '[Please enter child\'s first word]',
  //             //            fontSize: first_word_val !== '' ? '15px' : '12px',
  //             //            color: first_word_val !== '' ? '#901815' : '#000'
  //             //        };

  //             var message_val = $('.special_message').val();
  //             //        var message = {
  //             //            special: message_val !== '' ? message_val : '[Please enter special message for child]',
  //             //            fontSize: message_val !== '' ? '15px' : '12px',
  //             //            color: message_val !== '' ? '#901815' : '#000',
  //             //        };

  //             $('.preview').hide();
  //             $('.' + child_class).show();
  //             initBook(setConfig(child_class));

  //             // Name positioning
  //             $('.' + child_class + ' .page_0_name').text(child_name_val);
  //                 //.text(child_name.name).css('font-size', child_name.fontSize).css('width', child_name.width);
  //                 $('.' + child_class + ' .page_1_name').text(child_name_val);
  //                 //.text(child_name.name).css('font-size', child_name.fontSize).css('width', child_name.width);
  //                 $('.' + child_class + ' .page_2_name').text(child_name_val);
  //                 //.text(child_name.name).css('font-size', child_name.fontSize).css('width', child_name.width);
  //                 $('.' + child_class + ' .page_3_name').text(child_name_val);
  //                 //.text(child_name.name).css('font-size', child_name.fontSize).css('width', child_name.width);
  //                 $('.' + child_class + ' .page_9_name').text(child_name_val);
  //                 //.text(child_name.name).css('font-size', child_name.fontSize).css('width', child_name.width);
  //                 $('.' + child_class + ' .page_12_name').text(child_name_val);
  //                 //.text(child_name.name).css('font-size', child_name.fontSize).css('width', child_name.width);
  //                 $('.' + child_class + ' .page_12_name2').text(child_name_val);
  //                 //.text(child_name.name).css('font-size', child_name.fontSize).css('width', '18%');;

  //             //
  //             //        if(child_name_val === '') {
  //             //            $('.' + child_class + ' .page_1_name').css('left', '22%').css('top', '16.5%');
  //             //            $('.' + child_class + ' .page_2_name').css('right', '13.5%').css('bottom', '7.5%');
  //             //            $('.' + child_class + ' .page_9_name').css('left', '12.4%').css('top','20%').css('font-size','11px');
  //             //            $('.' + child_class + ' .page_12_name').css('right', '16%');
  //             //        } else {
  //             //            $('.' + child_class + ' .page_0_name').css('width', '17%');
  //             //            $('.' + child_class + ' .page_1_name').css('width', '17%').css('left', '23%').css('top', '16%');
  //             //            $('.' + child_class + ' .page_2_name').css('width', '17%').css('right', '15%').css('bottom', '7%');
  //             //            $('.' + child_class + ' .page_3_name').css('width', '20%');
  //             //            $('.' + child_class + ' .page_9_name').css('width', '15%').css('top','19%').css('left', '15%');
  //             //            $('.' + child_class + ' .page_12_name').css('width', '16%').css('right', '18%');
  //             //            $('.' + child_class + ' .page_12_name2').css('width', '17%');
  //             //        }

  //                     // Gender
  //                     $('.' + child_class + ' .page_12_gender').text(child_gender);

  //                     // Date of birth
  //                     $('.' + child_class + ' .page_12_birthday').text(birthday_val);
  //                         //.css('font-size', birthday.fontSize).css('width', birthday.width);

  //                     // Birthplace
  //                     $('.' + child_class + ' .page_12_city').text(birthplace_val);
  //                         //.css('font-size', birthplace.fontSize).css('width', birthplace.width).css('right', birthplace.right);

  //                     // First word
  //                     $('.' + child_class + ' .page_14_first_word').text(first_word_val);
  //                         //.css('font-size', first_word.fontSize);

  //                     // Special Message
  //                     $('.' + child_class + ' .page_16_message').text(message_val);
  //                         //.css('font-size', message.fontSize);

  //                     // Book title
  //                     var finds_magic = $('.finds_magic').val();
  //                     var custom_title = $('.custom_title').val();
  //                     var names_book = $('.names_book').val();

  //                     var title;


  //                     if(finds_magic !== '') {
  //                         title = finds_magic + ' Finds Magic';
  //                     } else if(custom_title !== '') {
  //                         title = custom_title;
  //                     } else if(names_book !== '') {
  //                         title = names_book + '\'s Book';
  //                     } else {
  //                         title = '';//[Please enter book\'s title]';
  //                     }


  //                     $('.' + child_class + ' .front_cover_name').text(title);

  //         }
  //     }
  // });
});


//WINDOW ONLOAD
$(window).load(function() {

  // WINDOW RESIZE
  $(window).on('resize', function() {

  }).trigger('resize');

});