/* Alice in Videoland JS! */
var alice = (function(window, document, $){ // Use an IIFE http://gregfranko.com/blog/i-love-my-iife/
	var $tunnels = $("#tunnels"),
		$tunnel = $("#tunnel"),
	 	$screenHeight = $.waypoints('viewportHeight');
	 	pagesNum = $(".page").length;
	if(Modernizr.touch) {
		// variables only needed for touch context Hammer functions at bottom
		var cutFired = false,
			downHole = false,
			currentPage,
			nextPage,
			prevPage;
	}
	var recalcWaypoints = function() {
		$(".page").waypoint({
			offset: beingRead()
		});
	}
	
	// only for mobile swiping
	var calcPrevNext = function(current) {
		if (prevPage < 1) {
			prevPage = current;
		} else {
			prevPage = current - 1;
		}

		if (nextPage === pagesNum) {
			nextPage = current;
		} else {
			nextPage = current + 1;
		}
	}
		
	window.addEventListener('orientationchange', recalcWaypoints);

	// First and foremost, get that loader in place.
	var loadingSaucer= '<div id="loader"><div class="cup"><svg version="1.1" id="brew" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="266px" height="25px" viewBox="0 0 266 25" enable-background="new 0 0 266 25" xml:space="preserve"><ellipse fill="#903741" cx="133" cy="12.5" rx="133" ry="12.5"/></svg><p>Please wait while we load</p></div><div class="saucer"></div></div>';
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

	// How to guess which frame is "being read".
	var beingRead = function() {
		// It would be approximately centered, of equal distance from top as from bottom.	
		var $screenHeight = $.waypoints('viewportHeight');
		var $pageHeight = $(".page").height();
		var offset = ($pageHeight - $screenHeight) / 2 * -1;

		return offset;
	}

	// Reveal the rabbit tunnel and move the page down to #tunnel
	var downTheHole = function() {
		if(Modernizr.touch) {
			currentPage = $(".falling_frightened").index(".page");
			downHole = true;
			calcPrevNext(currentPage);
		}
		var $alice = $tunnel.find(".alice-falling");

		// reveal the tunnels w/ class
		$tunnels.addClass("cue");

		// use the transitioning class on html to present scrolling till we're done.
		$("html").addClass("scene-transitioning");

		// TODO: These need to get recalculated on orientation change
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
			// cut to wonderland
			$(".scene-hole").waypoint(cutToWonderland, {
			  offset: function() {
			  	// this sez "when bottom of tunnels is at bottom of screen"
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

			// remove the scene-transitioning class so people can scroll again.
			$("html").removeClass("scene-transitioning");
		});
	}

	var cutToWonderland = function() {
		if(Modernizr.touch) {
			cutFired = true;
			currentPage = nextPage;
			calcPrevNext(currentPage);
		}
		// disable scrolling
		$("html").addClass("scene-transitioning");
		
		// Disable waypoint so people can scroll up if they want to.
		$(".scene-hole").waypoint('disable');

		// Give the .cut scene its cue
	  	$(".scene-cut").addClass("cue");

	  	// wait a little bit
	  	window.setTimeout(function(){
	  		// give first wonderland page its cue
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
					// allow folks to scroll again.
					$("html").removeClass("scene-transitioning");
				});
	  	}, 2000);
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

	return {
		windowLoaded: function() {

			// if touch is enabled, let's use hammer.js to detect gestures!
			if(Modernizr.touch) {
				// set current page
				// needs to infer the "current page" on position
				// loop through all .pages and stop on the first one that returns true.
				// will need to run post page load... so set timeout to like
				var scrollPageIntoCenter = function(toPage) {
					// Then animate that sucker.
					$("html, body").animate({
						scrollTop: topOffset(toPage)
					}, 500);
				};

				var visiblePages = [];
				$('.page:visible').each(function(i) { 
					if ($(this).visible(false, true)) {
						visiblePages.push(i);
					}
				});
				// if more than 2 pages are on the screen, use the second
				if (visiblePages > 2) {
					currentPage = visiblePages[1];
					calcPrevNext(visiblePages[1]);
				} else { // otherwise go for the first
					currentPage = visiblePages[0];
					calcPrevNext(visiblePages[0]);
				}

				$(document).hammer({prevent_default:true}).on("swipeup", function(event) {
					// using index() to get the index of our current page,
					// we can eq() the next or previous .page in the set of matched elements.

					// check if this is the last tunnel scene, and if so fire cutToWonderland 
					if ($(".page").eq(currentPage).hasClass("page_the-hole")  && !downHole ) {
						currentPage = currentPage;
						calcPrevNext(currentPage);
					} else if ($(".page").eq(currentPage).hasClass("falling_weird") && !cutFired) {
						cutToWonderland();
					} else {
						scrollPageIntoCenter($(".page").get(nextPage));
						currentPage = nextPage;					
						calcPrevNext(currentPage);
					}

					// Stops Hammer from detecting any further gestures, in the current detection session. Might be usefull to call after you did a succesfull swipe.
					event.gesture.stopDetect();
				});

				//Swipe to previous page
				$(document).hammer({prevent_default:true}).on("swipedown", function(event) {
					scrollPageIntoCenter($(".page").get(prevPage));
					currentPage = prevPage;
					calcPrevNext(currentPage);

					// Stops Hammer from detecting any further gestures, in the current detection session. Might be usefull to call after you did a succesfull swipe.
					event.gesture.stopDetect();

				});

				$(".page_credits").hammer({prevent_default:false}).off("swipeup");

			}

			setTimeout(function(){ 
			    // change state to loaded
		    	$("html").addClass("loaded")
			    setTimeout(function(){
				    $("html").removeClass("loading");
			    }, 3500);
			    
			    // Show park scene.
			    $(".scene-park").addClass("cue");
			    
			    // all pages get in-view classes while they're centered in the viewport 
					$(".scene-park .page").waypoint(function() {
						$(this).addClass("in-view");
					}, {
					  offset: beingRead()
					});
			}, 4000); //gotta wait a lil' bit

		}
	};
})(window, document, window.jQuery);
