// Author: Luke Crouch (groovecoder)
// Apache License 2.0
// https://www.apache.org/licenses/LICENSE-2.0

// Mostly lifted from https://code.google.com/p/html5slides/

(function($, deck, undefined) {
    function disableFrame(frame) {
      frame.src = 'about:blank';
    }
    function disableSlideFrames(slide) {
      var frames = slide.getElementsByTagName('iframe');
      for (var i = 0, frame; frame = frames[i]; i++) {
        disableFrame(frame);
      }
    }
    function enableFrame(frame) {
      var src = frame._src;
      if (frame.src != src && src != 'about:blank') {
        frame.src = src;
      }
    }
    function enableSlideFrames(slide) {
      var frames = slide.getElementsByTagName('iframe');
      for (var i = 0, frame; frame = frames[i]; i++) {
        enableFrame(frame);
      }
    }
    // copy original iframe src into _src property
    // then disable them all
    $[deck]('extend', 'iframes', function(){
        console.log("inside iframes");
        $('iframe').each(function(i, el){
          el._src = el.src;
          disableFrame(el);
        });
        $(document).bind('deck.change', function(event, from, to) {
          if (from == 0)
            return;
          $toSlide = $.deck('getSlide', to);
          enableSlideFrames($toSlide.context);
          $nextSlide = $.deck('getSlide', to+1)
          if ($nextSlide) {
            enableSlideFrames($nextSlide.context);
          }
        });
    });
})(jQuery, 'deck');
