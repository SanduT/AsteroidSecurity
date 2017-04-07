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

$('.social_blog').mouseenter(function()
{
	var location = this;
	if($(location).hasClass("changed") == false)
	{
	$(this).addClass('changed');
	$(this).find('.share').fadeOut('slow', function()
	{
	 $(location).find('.fb_share').css({opacity: 0, visibility: "visible"}).animate({opacity: 0.7}, 'slow');
	}
	 );
	}
	console.log($(location).hasClass("changed"));
});

