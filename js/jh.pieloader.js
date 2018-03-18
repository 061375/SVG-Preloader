/**
*
* 
* Pie Timer Preloader using SVG and Javascript
* @author Jeremy Heminger <contact@jeremyheminger.com>
* 2018
*
*
* */
var pieLoader = (function(){
   /**
    * @param {Object} DOM node
    * @param {Number} length of the animation in seconds
    * @param {Object}
    * @param {Function} optional callback
    * @param {Object} callback parameters
    * */
   var init = function($t,t,style,callback,params) {
       
       let w = $t.offsetWidth,
           h = $t.offsetHeight,
       // @param {Object} the default style
           s = {
               'opacity':1,
               'fill':'#0000ff',
               'fill-opacity':'0.98550725',
               'stroke':'none',
               'stroke-width':'0.16751359',
               'stroke-miterlimit':'4',
               'stroke-dasharray':'none',
               'stroke-opacity':1
           };
       // update style based on object
       for(let k in style) {
           s[k] = style[k];
       }
       // create the svg node
       let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
           svg.style.width = w+'px';
           svg.style.height = h+'px';
           let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
               // loop the style object and create the style attribute
               let p = '';
               for(let k in s) {
                   p += k+':'+s[k]+';';
               }
               path.setAttribute('style',p);
               path.style.width = w+'px';
               path.style.height = h+'px';
           svg.appendChild(path);
       $t.appendChild(svg);
       
       // @param {Number}
       let degs = 0;
       
       // loop 
       let int = setInterval(function() {
           
           // increment degrees
           degs++;
           if (typeof callback === 'function') {
               if (degs > 360) {
                  // after T if a callback is set then kill the loop and run the callback
                  clearInterval(int);
                  callback(params);
               }
           }else{
               // reset after 360 degrees or T
               if (degs > 360) degs-=360;
           }
           // create the arc
           let d = describeArc(w/2, h/2, h/2, 0, degs);
           // append the pie section by creating a line to the center
           d += ' l 0,'+(h/2)+' z';
           // find the preloader and set the attributes
           $t.querySelector('path').setAttribute("d", d);
           
       },t * 2); // t * 2 = ( t seconds )
   }
   /**
    * @param {Number}
    * @param {Number}
    * @param {Number}
    * @param {Number}
    * @returns {Object}
    * */
   var polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
       let angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
       return {
         x: centerX + (radius * Math.cos(angleInRadians)),
         y: centerY + (radius * Math.sin(angleInRadians))
       };
   }
   /**
    * @param {Number}
    * @param {Number}
    * @param {Number}
    * @param {Number}
    * @param {Number}
    * @returns {String}
    * */
   var describeArc = function(x, y, radius, startAngle, endAngle){
 
       var start = polarToCartesian(x, y, radius, endAngle);
       var end = polarToCartesian(x, y, radius, startAngle);
   
       var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
   
       var d = [
           "M", start.x, start.y, 
           "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
       ].join(" ");
   
       return d;       
   }
   
   // ------
   
   return {
     init:init
   }
})();