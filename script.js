var isMobile = false;
var filter = "hp-ux|linux i686|linux armv7l|mac68k|macppc|macintel|sunos|win16|win32|wince";
console.log(navigator.platform);
if (navigator.platform) {

    isMobile = filter.indexOf(navigator.platform.toLowerCase()) < 0;
}

const inner = document.querySelector("#lead");
const section = document.querySelector("#lead-down");
var warningA = document.getElementById("warning");

console.log("offset Top:" + section.offsetTop);
console.log("window:" + window.pageYOffset);

const height = inner.clientHeight;
console.log("h:" + height);

window.onscroll = function() {
    let value = window.pageYOffset / height + 1;
    inner.style.transform = `scale(${value})`;
};

if (isMobile) {
    window.addEventListener("orientationchange", function() {
        alert("the orientation of the device is now " + screen.orientation.angle);
        if (window.matchMedia("(orientation: landscape)").matches) {
            alert("In LandScape mode might not work well");
            warningA.style.visibility = 'visible';
        } else if (window.matchMedia("(orientation: portrait)").matches) {
            warningA.style.visibility = 'hidden';
        }

    });
}


/*
if (isMobile) {*/
/*if (window.matchMedia("(orientation: landscape)").matches) {
    alert("In LandScape mode might not work well");
    warn.setAttribute("visibility", "visible");
    warn.setAttribute("position", "fixed");
    warn.setAttribute("font-size", "100px");
    warn.setAttribute("font-weight", "800");
    warn.setAttribute("z-index", "2000");
    warn.setAttribute("color", "red");
}

if (window.matchMedia("(orientation: portrait)").matches) {
    alert("Portrait");
    warn.setAttribute("visibility", "hidden");
    warn.setAttribute("position", "fixed");
    warn.setAttribute("font-size", "100px");
    warn.setAttribute("font-weight", "800");
    warn.setAttribute("z-index", "2000");
    warn.setAttribute("color", "red");
}*/
/*}
 */




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