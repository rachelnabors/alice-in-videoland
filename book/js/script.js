/* Alice in Videoland JS! */
(function(window, document, $){ // Use an IIFE http://gregfranko.com/blog/i-love-my-iife/
	var $tunnels = $("#tunnels"),
			$tunnel = $("#tunnel"),
	 	  $screenHeight = $.waypoints('viewportHeight');

	// First and foremost, get that loader in place.
	var loadingSaucer= '<div id="loader"><svg version="1.1" id="brew" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="266px" height="25px" viewBox="0 0 266 25" enable-background="new 0 0 266 25" xml:space="preserve"><ellipse fill="#903741" cx="133" cy="12.5" rx="133" ry="12.5"/></svg><p>Please wait while we load</p></div><div class="saucer"></div>';
	$(".loading-card").append(loadingSaucer);

	// Rodney Rehm's improved method for mapping click and touch: https://gist.github.com/rodneyrehm/6464641
	function touch(event) {
	    event.preventDefault();
	    var runFunc = $(this).data('activateRunFunc');
	    runFunc() && runFunc();;
	}

	function click(event) {
	    event.preventDefault();
	    event.stopImmediatePropagation();
	    var runFunc = $(this).data('activateRunFunc');
	    runFunc() && runFunc();;
	}

	$.fn.activate = function(runFunc) {
	    return $(this).data('activateRunFunc', runFunc).on({
	        touchend: touch,
	        click: click
	    });
	};

	// if the page's height is greater than the window's height, just scroll to its top edge
	var topOffset = function(page) {
		var $topCorner = $(page).offset().top,
				diff = ($(page).outerHeight() - $screenHeight) / 2;
		if(diff >= 0) { 
			return $topCorner;
		} else {
			return $topCorner + diff;
		}
	}

	var scrollPageIntoCenter = function(toPage) {
		// Then animate that sucker.
		$("html, body").animate({
				scrollTop: topOffset(toPage)
			}, 500);
	};

	// if touch is enabled, let's use hammer.js to detect gestures!
	if(Modernizr.touch) {
		//prevent scrolling 
		// ev.gesture.preventDefault();
		$(document).hammer({drag_block_vertical: true}).on("swipeup", ".page", function(event) {
			// alert("swiped!")
			var $nextPage = $(this).next(".page");
			scrollPageIntoCenter($nextPage);
		});

		//Swipe to previous page
		$(document).hammer({drag_block_vertical: true}).on("swipedown", ".page", function(event) {
			var $prevPage = $(this).prev(".page");
			scrollPageIntoCenter($prevPage);
		});

	}

	setTimeout(function(){ 
		// change state to loaded
		$("html").addClass("loaded").removeClass("loading");

		// Show park scene.
		$(".scene-park").addClass("cue");

		// all pages get in-view classes while they're centered in the viewport 
		$(".scene-park .page").waypoint(function() {
			$(this).addClass("in-view");
		}, {
		  offset: beingRead()
		});
	}, 5000); //gotta wait a lil' bit

	// Reveal the rabbit tunnel and move the page down to #tunnel
	var downTheHole = function() {

		var $alice = $tunnel.find(".alice-falling");

		// reveal the tunnels w/ class
		$tunnels.addClass("cue");

		// calculate the height of the tunnels
		var tunnelTop = Math.round($tunnel.offset().top);
		var tunnelTopData = "data-" + tunnelTop;
		var tunnelBottomData =  "data-" + (tunnelTop + Math.round($tunnel.height()));

		$alice.waypoint('sticky') // make her sticky!
		.attr(tunnelTopData, "top:0%").attr(tunnelBottomData, "top:80%");		// Give Falling Alice her skrollr measurements as data attributes


		// recalculate the new waypoints since this part was hidden
		$tunnel.find(".page").waypoint(function() {
			$(this).addClass("in-view");
			var mood = $(this).data("mood");
			$("body").removeClass().addClass(mood);		
		}, {
		  offset: beingRead()
		});

		// Give the parent tunnel an in-view class
		$tunnel.addClass("in-view")
		.find(".page:first").addClass("in-view");// and give it's first page an in-view class ;)

		// gently animate down the page
		$("html,body").animate({
			scrollTop: $("#tunnel").offset().top // animate new offset to scroll past the tunnels
		}, 4000, function(){
			$(".scene-hole").waypoint(function(direction) {
				// Disable waypoint so people can scroll up if they want to.
				$(".scene-hole").waypoint('disable');

				// gently animate down the page
		  	$(this).next(".scene").addClass("cue");
		  	window.setTimeout(function(){
		  		$(".scene-wonderland").addClass("cue")
		  		.find(".page").waypoint(function() {
					$(this).addClass("in-view");
				}, {
				  offset: beingRead()
				});

			  	$("html,body").animate({
						scrollTop: $(".scene-wonderland").offset().top
					}, 2500, function() {
						$(".scene-cut").remove();
					});
		  	}, 2000);
			}, {
			  offset: function() {
			    return -($tunnels.height() - $screenHeight);
			  }
			});
			//Start up the skrollr object
			skrollr.init({
				forceHeight: false,
				mobileCheck: function() {
              //hack - forces mobile version to be off
              return false;
          }
			});
		});
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
	});

	$(window).load(function() {

	  setTimeout(function(){ 
	    // change state to loaded
	    $("html").addClass("loaded").removeClass("loading");
	    
	    // Show park scene.
	    $(".scene-park").addClass("cue");
	    
	    // all pages get in-view classes while they're centered in the viewport 
			$(".scene-park .page").waypoint(function() {
				$(this).addClass("in-view");
			}, {
			  offset: beingRead()
			});
	  }, 4000); //gotta wait a lil' bit

	});
})(window, document, window.jQuery);
