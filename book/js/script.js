$(window).load(function() {
/* Alice in Videoland JS! */

var $hole = $("#to-tunnels"),
		$tunnels = $("#tunnels"),
		$tunnel = $("#tunnel");

// Reveal the rabbit tunnel
var downTheHole = function() {

	// reveal the tunnels w/ class
	$tunnels.addClass("cue");

	// recalculate the new waypoints since this part was hidden
	$('.page').waypoint('disable');
	$.waypoints('refresh'); //refreshing recalculates where the waypoints are, but it also fires all their callbacks! 
	$('.page').waypoint('enable');

	$tunnel.addClass("in-view");

}

// How to guess which frame is "being read".
var beingRead = function() {
	// It would be approximately centered, of equal distance from top as from bottom.	
	var $screenHeight = $.waypoints('viewportHeight');
	var $pageHeight = $(".page").height();
	var offset = ($pageHeight - $screenHeight) / 2 * -1;

	return offset;
}

var gentleScroll = function(duration, scrollPast) {
		// gently animate down the page
		var scrolledHeight = $(window).scrollTop(); // current offset from top
		var windowHeight = $(window).height(); //window's height
		if (scrollPast) {
			var scrollPastHeight = $(scrollPast).outerHeight(); // all "pages" are the same height...
			var newOffset = scrolledHeight + scrollPastHeight + windowHeight; 
		} else {
			var newOffset = scrolledHeight + windowHeight; 			
		}
		$("html,body").animate({
			scrollTop: newOffset // animate new offset to scroll past the tunnels
		}, duration, function(){
			//make sure it's set to the correct body class.
			var mood = $tunnel.find(".page").first().data("mood");
			$("body").removeClass().addClass(mood);
		});
}

// For people touching the screen
$hole.on('touchend', function(e){
	$(this).addClass("touched");
	
	$(".alice-falling").addClass("touched");

	downTheHole();

	gentleScroll(20000, $tunnels);

	e.preventDefault();
});

// For people using mice
$hole.on('click', function(e){
	if (!($(this).hasClass('touched'))) {
		//make Alice sticky
		$(".alice-falling").waypoint('sticky');

		downTheHole();

		// calculate the height of the tunnels
		var tunnelTop = Math.round($tunnel.offset().top);
		var tunnelTopData = "data-" + tunnelTop;
		var tunnelBottomData =  "data-" + (tunnelTop + Math.round($tunnel.height()));

		// Give Falling Alice her skrollr measurements as data attributes
		$tunnel.find(".alice-falling").attr(tunnelTopData, "top:0%").attr(tunnelBottomData, "top:80%");
		
		//Start up the skrollr object
		skrollr.init({
			forceHeight: false
		});

		gentleScroll(2000);
		
		e.preventDefault();
		e.stopPropagation();
	};
});

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
	$(this).addClass("in-view");

	// Change attitude as you "fall"
	if ($(this).parent("#tunnel")){
		var mood = $(this).data("mood");
		$("body").removeClass().addClass(mood);		
	}
}, {
  offset: beingRead() //makes sure the frame is centered before adding class
});


	// Have Tuna float up

	// Add Tuna craziness

	// Have Tuna float away

	// Once you get to the end of the tunnels, cue cut and wonderland behind it
	// $(".scene-cut, .scene-wonderland").addClass("cue");
});