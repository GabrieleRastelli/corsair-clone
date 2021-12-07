var currentAnimation; 
var nextEndRotation=360;
const rotationDirections = Object.freeze({"clockwise":1, "counterclockwise":2});
Object.freeze(rotationDirections);
var currentRotationDirection;

function buttonClicked(id){
    if (currentAnimation==null){
        currentRotationDirection = rotationDirections.clockwise;
        currentAnimation = document.getElementById(id).animate([
            // keyframes
                { transform: 'rotate('+getCurrentRotation(document.getElementById(id))+')' }, 
                { transform: 'rotate('+nextEndRotation+'deg)' }
                ], { 
                // timing options
                duration: 5000,
                iterations: Infinity
            });
    } else {
        currentAnimation.pause();
        var currentRotation = getCurrentRotation(document.getElementById(id));
        if (currentRotationDirection == rotationDirections.clockwise) {
            nextEndRotation = (360 - currentRotation) * -1;
            currentRotationDirection = rotationDirections.counterclockwise;
        } else {
            nextEndRotation = 360 + currentRotation;
            currentRotationDirection = rotationDirections.clockwise;
        }
        
        console.debug('goin to rotate from '+ currentRotation + ' to ' + nextEndRotation);
        currentAnimation = document.getElementById(id).animate([
            // keyframes
                { transform: 'rotate('+getCurrentRotation(document.getElementById(id))+')' }, 
                { transform: 'rotate('+nextEndRotation+'deg)' }
                ], { 
                // timing options
                duration: 5000,
                iterations: Infinity
            });
    }
    
    
}

function getCurrentRotation(el){
    var st = window.getComputedStyle(el, null);
    var tm = st.getPropertyValue("-webkit-transform") ||
             st.getPropertyValue("-moz-transform") ||
             st.getPropertyValue("-ms-transform") ||
             st.getPropertyValue("-o-transform") ||
             st.getPropertyValue("transform") ||
             "none";
    if (tm != "none") {
      var values = tm.split('(')[1].split(')')[0].split(',');
      
      var angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
      return (angle < 0 ? angle + 360 : angle);
    }
    return 0;
}