var isMobile = false;
var filter = "iPhone|iPod|iPad|Android|BlackBerry";
if (navigator.platform) {
    isMobile = filter.indexOf(navigator.platform.toLowerCase()) > 0;
}

const inner = document.querySelector("#lead");
const section = document.querySelector("#lead-down");
var warn=document.getElementById("warning");

console.log("offset Top:" + section.offsetTop);
console.log("window:" + window.pageYOffset);

var height = inner.clientHeight
console.log("h:" + height);

window.onscroll = function() {
    let value = window.pageYOffset / height + 1;
    console.log(value);
    inner.style.transform = `scale(${value})`;
};
console.log(isMobile);
console.log("2");
if (isMobile) {
    if (window.matchMedia("(orientation: landscape)").matches) {
        alert("In LandScape mode might not work well");
        warn.setAttribute("visibility","visible");
        warn.setAttribute("font-size","100px");
        warn.setAttribute("font-weight: 800");
        warn.setAttribute("z-index","2000");
        warn.setAttribute("color","red");
        warn.setAttribut("visibility","visible");
        console.log("1");
    }
}





/*$(function(){
	
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
	
});*/