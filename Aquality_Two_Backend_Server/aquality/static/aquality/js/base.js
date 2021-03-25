$(document).ready(function() {
    //Function 1-1 . Smooth Scrolling On Click
    $("a[href*=\\#]").click(function(event) {
      var linkhref = $(this).attr("href");
      event.preventDefault();
      $("html, body").animate({ scrollTop: $(linkhref).offset().top }, 1000);
    });
    
  
    //Function 1-2. Navigation Bar got Activated On Click
    $("nav .navSelect a").on("click", function(e) {
      $("nav .navSelect a").removeClass("active");
      $(this).addClass("active");
    });
    
    //Function 1-3. Navigation Menu disappear when menu clicked.
    $("input").click(function(){
    var mobileNav = $("input[id='toggle']").is(":checked");
    console.log(mobileNav);
    if(mobileNav){
    $('.mobile .navSelect').click(function(){
      $('#toggle').attr('checked',false);
    });
    }
  })
  
  });
  
  //Function 2-1 . Navigation Bar Shrink When Scroll Down from Top
  $(window).scroll(function() {
    if ($(document).scrollTop()) {
      $("nav").addClass("shrink");
    } else {
      $("nav").removeClass("shrink");
    }
    
  //scroll spy
  $('.Target').each(function(){
    if($(window).scrollTop() >= $(this).offset().top - 50){
      var id = $(this).attr("id");
      $('nav .navSelect').find('a').removeClass('active');
      $('nav .navSelect a[href= #' +id+ ']').addClass('active');
    }
  });
  
  });
  
  $(window).resize(function()
  {
    var width = window.innerWidth;
     if(width <= 500){
    $("nav").addClass("mobile");
     }
   else{
   $("nav").removeClass("mobile");
   }
  }).resize();