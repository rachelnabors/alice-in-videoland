/* Alice in Videoland JS! */

// To map click events to "touch events", I put together this based on the feedback here: http://stackoverflow.com/questions/7018919/how-to-bind-touchstart-and-click-events-but-not-respond-to-both

$.fn.activate = function(runFunc) {

	$(this).on('touchend', function(e){
		$(this).addClass("touched");
		runFunc();
		e.preventDefault();
	});

	$(this).on('click', function(e){
		if (!($(this).hasClass('touched'))) {
			runFunc();
			e.preventDefault();
			e.stopPropagation();
		};
	});

}

// Reveal the rabbit tunnel and move the page down a bit
var downTheHole = function() {
	// reveal the tunnels w/ class
	$("#tunnels").addClass("down-hole");

	// gently animate down the page
	var y = $(window).scrollTop(); // current offset from top
	$("html,body").animate({
		scrollTop: y+150 //add a little extra px and animate new offset
	}, 1000);

	// TODO: Add enticing "scroll down" arrow that activates to move down.
}

// To get to #tunnels, activate #tunnels
$("#to-tunnels").activate(downTheHole);

// Change attitude as you "fall"

// Once you get to the end of the tunnels, cut

// After cut, show wonderland

// Roll credits