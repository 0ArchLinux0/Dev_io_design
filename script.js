var isMobile = false;
var filter = "hp-ux|linux i686|linux armv7l|mac68k|macppc|macintel|sunos|win16|win32|wince";
console.log(navigator.platform);
if (navigator.platform) {

    isMobile = filter.indexOf(navigator.platform.toLowerCase()) < 0;
}

const inner = document.querySelector("#lead");
const section = document.querySelector("#lead-down");
const sitevisible = document.querySelector("*");
const siteloading = document.querySelector("#siteLoading");
let warning = document.getElementById("warning");

window.onload = (function() {
    console.log("waiting...");
    setTimeout(function() {            //callback execute after t ms
        siteloading.style.visibility = 'hidden';
        console.log("hiddend");
        if (isMobile) {
            if (window.innerWidth < window.innerHeight) { //moblie lanscape
                sitevisible.style.visibility = 'visible';
                warning.style.visibility = 'hidden';
            } else {
                alert("Use Portrait mode!!");
                window.scrollTo(0, 0);
                sitevisible.style.visibility = 'hidden';
                warning.style.visibility = 'visible';
            }
        }
    }, 30);
});


console.log("offset Top:" + section.offsetTop);
console.log("window:" + window.pageYOffset);

const height = inner.clientHeight;
console.log("h:" + height);

window.onscroll = function() {
    let value = window.pageYOffset / height + 1;
    inner.style.transform = `scale(${value})`;
};


if (isMobile) {         //prevent rotate
    window.addEventListener("orientationchange", function() { 
        if (window.matchMedia("(orientation: landscape)").matches) {
            sitevisible.style.visibility = 'visible';
        } else if (window.matchMedia("(orientation: portrait)").matches) {
            alert("Use Portrait mode!!");
            window.scrollTo(0, 0);
            location.replace("https://0archlinux0.github.io/Interactive_HTML/String/stringReactToMouse.html");
            sitevisible.style.visibility = 'hidden';
        }

    });
}