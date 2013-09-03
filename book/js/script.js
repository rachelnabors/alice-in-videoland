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
	// reveal the tunnels w/ class
	$("#tunnels").addClass("cue");

	// gently animate down the page
	var scrolledHeight = $(window).scrollTop(); // current offset from top
	var windowHeight = $(window).height(); //window's height
	var tunnelsHeight = $(".page_the-hole").outerHeight(); // all "pages" are the same height...
	var newOffset = scrolledHeight + tunnelsHeight + windowHeight; 
	$("html,body").animate({
		scrollTop: newOffset // animate new offset to scroll past the tunnels
	}, 2000, function(){
		$("#tunnel").addClass("in-view");
		// iscroll only
		setTimeout(function () {
			myScroll.refresh();
		}, 0);
	});

	// TODO: Add enticing "scroll down" arrow that activates to move down.
}

// How to guess which frame is "being read".
var beingRead = function() {
	// It would be approximately centered, of equal distance from top as from bottom.	
	var $screenHeight = $.waypoints('viewportHeight');
	var $pageHeight = $(".page").height();
	var offset = ($pageHeight - $screenHeight) / 2 * -1;

	return offset;
	// What if the the screen is shorter than the page?
	// What if we force the pages to always be the same height as the screen?
}

// To get to #tunnels, activate #tunnels
$("#to-tunnels").activate(downTheHole);

// play phone SFX when the rabbit appears in full view. 
$(".page_rabbit-appears").waypoint(function() {
		if ($(this).hasClass("in-view")){
			console.log($(this).hasClass("in-view"))
			var phone = document.getElementById("rabbit-phone");
			phone.volume = 0.1;
			setTimeout(function(){
				phone.play();
			}, 2000);
		}
});

// all pages get in-view classes while they're centered in the viewport 
$(".page").waypoint(function(direction) {
	if (direction === "up") { // if scrolling up
 		$(this).addClass("in-view").removeClass("scrolled-past")
 		.waypoint('next').removeClass("in-view");
	} else { // else, assuming we're not scrolling at all or are scrolling down
 		$(this).addClass("in-view").removeClass("scrolled-past")
 		.waypoint('prev').removeClass("in-view").addClass("scrolled-past");		
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


// After cut, show wonderland
// Roll credits