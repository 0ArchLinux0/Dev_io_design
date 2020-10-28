const inner = document.querySelector("#lead");
const section = document.querySelector("#lead-down");

console.log("offset Top:"+section.offsetTop);
console.log("window:"+window.pageYOffset);

var height=inner.clientHeight
console.log("h:"+height);

window.onscroll = function() {
  let value = window.pageYOffset / height + 1;
  console.log(value);
  inner.style.transform = `scale(${value})`;
};


$(function(){
	
	var $window = $(window);		//Window object
	
	var scrollTime = 1.2;			//Scroll time
	var scrollDistance = 170;		//Distance. Use smaller value for shorter scroll and greater value for longer scroll
		
	$window.on("mousewheel DOMMouseScroll", function(event){
		
		event.preventDefault();	
										
		var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
		var scrollTop = $window.scrollTop();
		var finalScroll = scrollTop - parseInt(delta*scrollDistance);
			
		TweenMax.to($window, scrollTime, {
			scrollTo : { y: finalScroll, autoKill:true },
				ease: Power1.easeOut,	//For more easing functions see https://api.greensock.com/js/com/greensock/easing/package-detail.html
				autoKill: true,
				overwrite: 5							
			});
					
	});
	
});