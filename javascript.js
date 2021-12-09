var currentAnimation; 
var nextEndRotation=360;
const rotationDirections = Object.freeze({"clockwise":1, "counterclockwise":2});
Object.freeze(rotationDirections);
var currentRotationDirection;
var ore;
var minuti;
var secondi;
var decimi;
var visualizzazione;
var contatore_intertempi;
var stop; //0=active 1=stopped

function rotateShip(id){
    if (currentAnimation==null){
        currentRotationDirection = rotationDirections.clockwise;
    } else {
        currentAnimation.pause();
        var currentRotation = getCurrentRotation(document.getElementById(id));
        if (currentRotationDirection == rotationDirections.clockwise) {
            nextEndRotation = currentRotation - 360;
            currentRotationDirection = rotationDirections.counterclockwise;
        } else {
            nextEndRotation = 360 + currentRotation;
            currentRotationDirection = rotationDirections.clockwise;
        }
        
    }
    currentAnimation = document.getElementById(id).animate([
            // keyframes
                { transform: 'rotate('+getCurrentRotation(document.getElementById(id))+'deg)' }, 
                { transform: 'rotate('+nextEndRotation+'deg)' }
                ], { 
                // timing options
                duration: 5000,
                iterations: Infinity
            });
    
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

setInterval(function spawnBullet(){
    var div = document.createElement("div");
    var id = div.id = "bullet";
    div.style.width = "25px";
    div.style.height = "25px";
    div.style.top = "190px";
    div.style.left = "190px";
    div.style.position = "absolute";
    div.style.backgroundColor = "black";
    div.style.borderRadius = "50%";

    document.getElementById("bullet_shooter").appendChild(div);

    var ship_elem = document.getElementById("ship");

    var angle = Math.random()*Math.PI*2;
    x = Math.cos(angle)*200;
    y = Math.sin(angle)*200;

    var bullet_elem=document.getElementById(id);
    bullet_elem.animate([
        // keyframes
            { transform: 'translate('+x+'px,'+y+'px)' },
            ], { 
            // timing options
            duration: 750
        });
    setTimeout(function(){ 
        bullet_elem.parentNode.removeChild(bullet_elem);
    }, 750);  
        
},800);

function getRandomBetweenTwo(min, max) {
    return Math.random() * (max - min) + min;
}


/* check collission */
setInterval(function spawnBullet(){
    var d1 = document.getElementById('ship').getBoundingClientRect();
    if (document.getElementById('bullet') != null) {
        var d2 = document.getElementById('bullet').getBoundingClientRect();
        var ox = Math.abs(d1.x - d2.x) < (d1.x < d2.x ? d2.width : d1.width);
        var oy = Math.abs(d1.y - d2.y) < (d1.y < d2.y ? d2.height : d1.height);
        if(ox && oy) {
            if (currentAnimation!= null){
                currentAnimation.pause();
            }
            if(!alert('Lost. You survived '+visualizzazione)){
                window.location.reload();  
            }
        }
    }
    
    
},1);

window.onload = function() {
    ore=0;
    minuti=0;
    secondi=0;
    decimi=0;
    visualizzazione="";
    contatore_intertempi=0;
    stop=1; //0=active 1=stopped
    if (stop==1){
        stop=0;
        chronometer();
    }
}

function chronometer(){
  if (stop==0) {
    decimi+=1;
    if (decimi>9) {decimi=0;secondi+=1;}
    if (secondi>59) {secondi=0;minuti+=1;}
    if (minuti>59) {minuti=0;ore+=1;}
    if (ore<10) {visualizzazione="0" + ore;} else {visualizzazione=ore;}
    if (minuti<10) {visualizzazione=visualizzazione + ":0" + minuti;} else {visualizzazione=visualizzazione + ":" + minuti;}
    if (secondi<10) {visualizzazione=visualizzazione + ":0" + secondi;} else {visualizzazione=visualizzazione + ":" + secondi;}
    visualizzazione=visualizzazione;
    document.getElementById("chrono").innerText = visualizzazione;
    setTimeout("chronometer()", 100);
  }
}