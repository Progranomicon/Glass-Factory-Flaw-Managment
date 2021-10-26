(function() {
if (window.donotrun)return;
var img = document.querySelector('img');
var zoomX;
var zoomY;
function zoomIn() {
document.body.className = 'zoom';
window.scrollTo(zoomX + img.offsetLeft - window.innerWidth/2,zoomY + img.offsetTop - window.innerHeight/2);
}
function zoomOut() {
zoomX = window.scrollX + window.innerWidth/2 - img.offsetLeft;
zoomY = window.scrollY + window.innerHeight/2 - img.offsetTop;document.body.className = 'contain';
}
var interval = setInterval(function() {if (img.naturalWidth && img.naturalHeight) {clearInterval(interval);
document.title += ' ('+img.naturalWidth+'\u00d7'+img.naturalHeight+')';
var padding = 2*parseInt(getComputedStyle(document.body).padding, 10);
var s = document.querySelector('style[media]');
s.media = '(max-width:' + (img.naturalWidth + padding) + 'px),(max-height:' + (img.naturalHeight + padding) + 'px)';
zoomX = img.naturalWidth/2;zoomY = img.naturalHeight/2;
} else if (img.error) {clearInterval(interval);}}, 100);

img.onclick = function(e) {var s = getComputedStyle(img);
if (s.cursor == 'zoom-in') {zoomX = e.offsetX;zoomY = e.offsetY;
var clientAspect = img.clientWidth/img.clientHeight;
var naturalAspect = img.naturalWidth/img.naturalHeight;
var scale;
if (naturalAspect > clientAspect) {var displayHeight = img.clientWidth/naturalAspect;
zoomY -= (img.clientHeight - displayHeight)/2;
scale = img.clientWidth/img.naturalWidth;} else {var displayWidth = img.clientHeight*naturalAspect;
zoomX -= (img.clientWidth - displayWidth)/2;
scale = img.clientHeight/img.naturalHeight;}zoomX /= scale;
zoomY /= scale;
zoomIn();} else if (s.cursor == 'zoom-out') {zoomOut();}};
window.onkeypress = function(e) {if (e.keyCode == 13 && !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey) {var s = getComputedStyle(img);if (s.cursor == 'zoom-in')zoomIn();else if (s.cursor == 'zoom-out')zoomOut();e.preventDefault();}};
var drag;window.onmousedown = function(e) {if (document.body.className == 'zoom')drag = {screenX: e.screenX,screenY: e.screenY,scrollX: window.scrollX,scrollY: window.scrollY};};
window.onmouseup = function(e) {img.style.cursor = '';drag = undefined;};
window.onmousemove = function(e) {
if (!drag) return;img.style.cursor = 'move';window.scrollTo(drag.scrollX + drag.screenX - e.screenX,drag.scrollY + drag.screenY - e.screenY);};})();