            

// $(".contact-form").submit(function(){
//   const scriptURL = 'https://script.google.com/macros/s/AKfycbzbS-oRHf8-LPZZKDQY7gZeywlzqiK8XWBkgAFUQs7k9AfMGD7buxFLIe7wOM1BxTqt/exec'

//   $.post(scriptURL, $(this).serialize(), function(response){
//     console.log(response);
//     return false;
//   })
// });

// header
$(window).scroll(function() {    
  var scroll = $(window).scrollTop();
  console.log(scroll);
  if (scroll == 0) {
      $("header").removeClass("small");
  } else if (scroll > 10) {
    $("header").addClass("small");
  }
}); 


// card slider
$(function() {
  
  var slideCount =  $(".slider ul li").length;
  var slideWidth =  $(".slider ul li").width();
  var slideHeight =  $(".slider ul li").height();
  var slideUlWidth =  slideCount * slideWidth;
  
  $(".slider").css({"max-width":slideWidth, "height": slideHeight});
  $(".slider ul").css({"width":slideUlWidth, "margin-left": - slideWidth });
  $(".slider ul li:last-child").prependTo($(".slider ul"));
  
  function moveLeft() {
    $(".slider ul").stop().animate({
      left: + slideWidth
    },700, function() {
      $(".slider ul li:last-child").prependTo($(".slider ul"));
      $(".slider ul").css("left","");
    });
  }
  
  function moveRight() {
    $(".slider ul").stop().animate({
      left: - slideWidth
    },700, function() {
      $(".slider ul li:first-child").appendTo($(".slider ul"));
      $(".slider ul").css("left","");
    });
  }
  
  
  $(".next").on("click",function(){
    moveRight();
  });
  
  $(".prev").on("click",function(){
    moveLeft();
  });
  
  
});