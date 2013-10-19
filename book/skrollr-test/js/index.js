$(window).load(function() {
	console.log("load")
	// How to guess which frame is "being read".
	var beingRead = function() {
		// It would be approximately centered, of equal distance from top as from bottom.	
		var $screenHeight = $.waypoints('viewportHeight');
		var $pageHeight = $(".page").height();
		var offset = ($pageHeight - $screenHeight) / 2 * -1;

		return offset;
	}

	// calculate the height of the tunnels
		var tunnelTop = Math.round($("#tunnel").offset().top);
		var tunnelTopData = "data-" + tunnelTop;
		var tunnelBottomData =  "data-" + (tunnelTop + Math.round($("#tunnel").height()));

		// Give Falling Alice her skrollr measurements as data attributes
		$(".alice-falling").attr(tunnelTopData, "top:-10%").attr(tunnelBottomData, "top:80%");

		//Start up the skrollr object
		skrollr.init({
			forceHeight: false,
			mobileCheck: function() {
              //hack - forces mobile version to be off
              return false;
          }
		});

	$(".page").waypoint(function(direction) {
	  var mood = $(this).data("mood");
	  $("body").removeClass().addClass(mood);		
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
});