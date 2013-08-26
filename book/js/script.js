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
	});

	// TODO: Add enticing "scroll down" arrow that activates to move down.
}

// play phone SFX when the rabbit appears in full view. 
$(".page_rabbit-appears").on('inview', function(event, visible, topOrBottomOrBoth) {
  var o = $(this);
  if(visible && (topOrBottomOrBoth == 'bottom' || (topOrBottomOrBoth == 'both'))) {
  	var phone = document.getElementById("rabbit-phone");
  	phone.volume = 0.1;
  	setTimeout(function(){
  		phone.play();
  	}, 2000);

  	o.addClass("in-view");
  	o.off('inview');
  }
});

// play phone SFX when the rabbit appears in full view. 
$(".page_the-hole").on('inview', function(event, visible, topOrBottomOrBoth) {
  var o = $(this);
  if(visible && (topOrBottomOrBoth == 'both')) {
  	o.addClass("in-view");
  	o.off('inview');
  }
});

// To get to #tunnels, activate #tunnels
$("#to-tunnels").activate(downTheHole);

// when in tunnels, give them a class of in-view. 
$("#tunnel").on('inview', function(event, visible, topOrBottomOrBoth) {
  var o = $(this);

  if(visible) {
      if(topOrBottomOrBoth == 'top') {
        o.data('seenTop', true);
      } else if(topOrBottomOrBoth == 'bottom') {
        o.data('seenBottom', true);
      }

      if(o.data('seenTop') && o.data('seenBottom')) {
      	// dereg handler
        o.off('inview');

		// when scrolled past, give the tunnels a class of scrolled-past
        o.removeClass("in-view").addClass("scrolled-past");

		// Once you get to the end of the tunnels, cue cut and wonderland behind it
        $(".scene-cut, .scene-wonderland").addClass("cue");
        	// pull crash scene under cut
					var scrolledHeight = $(window).scrollTop(); // current offset from top
					var windowHeight = $(window).height(); //window's height
					var newOffset = scrolledHeight + windowHeight; 
					$("html,body").scrollTop(newOffset);
      } 
  }
});


// Change attitude as you "fall"


// After cut, show wonderland
// Roll credits