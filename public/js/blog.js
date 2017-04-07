/* Open when someone clicks on the span element */
function openNav() {
    $('#myNav').css({opacity: 0, visibility: "visible"}).animate({opacity: 0.9}, 'slow');
    $('#overContent').css({top: 50}).animate({top: 100}, 'slow');
    document.getElementById("openbtn").style.visibility = "hidden";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    $('#myNav').css({opacity: 0.9, visibility: "hidden"}).animate({opacity: 0}, 'slow');
    $('#overContent').css({top: 100}).animate({top: 50}, 'slow');
    $("#openbtn").css({opacity: 0, visibility: "visible"}).animate({opacity: 0.9}, 'slow');
}



$(document).ready(function(){
    animateDiv('.a1');
 
    
});

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(str){
    var newq = makeNewPosition();
    var oldq = $(str).offset();

    var speed = calcSpeed([oldq.top, oldq.left], newq);
    
    $(str).animate({ top: newq[0], left: newq[1] }, speed, function(){
      animateDiv();        
    });
    
};

function calcSpeed(prev, next) {
    
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;
    
    var speedModifier = 0.1;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}
