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

// Reveal the rabbit tunnel and move the page down to #tunnel
var downTheHole = function() {
	var $tunnel = $("#tunnel");

	// reveal the tunnels w/ class
	$("#tunnels").addClass("cue");

	// calculate the height of the tunnels
	var tunnelTop = Math.round($tunnel.offset().top);
	var tunnelTopData = "data-" + tunnelTop;
	var tunnelBottomData =  "data-" + (tunnelTop + Math.round($tunnel.height()));

	// Give Falling Alice her skrollr measurements as data attributes
	$tunnel.find(".alice-falling").attr(tunnelTopData, "top:-10%").attr(tunnelBottomData, "top:80%");

	//make sure it's set to the correct body class.
	var mood = $tunnel.find(".page").first().data("mood");
	$("body").removeClass().addClass(mood);

	//Start up the skrollr object
	skrollr.init({
		forceHeight: false
	});

	// recalculate the new waypoints since this part was hidden
	$.waypoints('refresh');
	$tunnel.addClass("in-view");

	// gently animate down the page
	var scrolledHeight = $(window).scrollTop(); // current offset from top
	var windowHeight = $(window).height(); //window's height
	var tunnelsHeight = $("#tunnels").outerHeight(); // all "pages" are the same height...
	var newOffset = scrolledHeight + tunnelsHeight + windowHeight; 
	$("html,body").animate({
		scrollTop: newOffset // animate new offset to scroll past the tunnels
	}, 20000);
}

// How to guess which frame is "being read".
var beingRead = function() {
	// It would be approximately centered, of equal distance from top as from bottom.	
	var $screenHeight = $.waypoints('viewportHeight');
	var $pageHeight = $(".page").height();
	var offset = ($pageHeight - $screenHeight) / 2 * -1;

	return offset;
}

// To get to #tunnels, activate #tunnels
$("#to-tunnels").activate(downTheHole);

// play phone SFX when the rabbit appears in full view. 
$(".page_rabbit-appears").waypoint(function() {
	if ($(this).hasClass("in-view")){
		var phone = document.getElementById("rabbit-phone");
		phone.volume = 0.1;
		setTimeout(function(){
			phone.play();
		}, 2000);
	}
}, {
  offset: beingRead()
});

// all pages get in-view classes while they're centered in the viewport 
$(".page").waypoint(function(direction) {
// else, assuming we're not scrolling at all or are scrolling down
	$(this).addClass("in-view");
	if ($(this).parent("#tunnel")){
		var mood = $(this).data("mood");
		$("body").removeClass().addClass(mood);		
	}
}, {
  offset: beingRead()
});

// $('.page').waypoint(function() {
//   $(this).removeClass("in-view").addClass("scrolled-past");
// }, {
//   offset: function() {
//     return -$(this).height();
//   }
// });

// // when in tunnels, give them a class of in-view. 
// $("#tunnel").waypoint(function(direction) {
// 	$("#tunnel").addClass("in-view");
// 	// when scrolled past, give the tunnels a class of scrolled-past so you can stop the animation and dump the characters at the bottom

// 	// Once you get to the end of the tunnels, cue cut and wonderland behind it
// 	$(".scene-cut, .scene-wonderland").addClass("cue");
// 		// pull crash scene under cut
// 		var scrolledHeight = $(window).scrollTop(); // current offset from top
// 		var windowHeight = $(window).height(); //window's height
// 		var newOffset = scrolledHeight + windowHeight; 
// 		$("html,body").scrollTop(newOffset);
// });


// Change attitude as you "fall"
// Add class to body that mirrors the class of the page.


// After cut, show wonderland
// Roll credits