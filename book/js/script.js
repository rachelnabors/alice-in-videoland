/* Alice in Videoland JS! */

$(window).load(function() {

var $tunnels = $("#tunnels"),
		$tunnel = $("#tunnel");

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
		$.waypoints('refresh');

		// Give the parent tunnel an in-view class
		$tunnel.addClass("in-view");

		// gently animate down the page
		var scrolledHeight = $(window).scrollTop(); // current offset from top
		var windowHeight = $(window).height(); //window's height
		var tunnelsHeight = $(".page_tunnels").outerHeight(); // all "pages" are the same height...
		var newOffset = scrolledHeight + tunnelsHeight + windowHeight; 
		$("html,body").animate({
			scrollTop: newOffset // animate new offset to scroll past the tunnels
		}, 4000, function(){
		
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

	// all pages get in-view classes while they're centered in the viewport 
	$(".page").waypoint(function() {
		$(this).addClass("in-view");
	}, {
	  offset: beingRead()
	});

	// After cut, show wonderland
	// Roll credits
});