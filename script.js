$(function() {
  var isFlipped  = false,
      isOpened   = false,
      photoShown = false,
      $card      = $('#container'),
      $flap      = $('#flap'),
      $letter    = $('#letter'),
      $scene     = $('#perspective'),
      $arrow     = $('#letter hgroup h2'),
      $photo     = $('#photo'),
      audioEl    = document.getElementById('bg-audio');

  // 1) Scroll only flips the card
  $(window).on('scroll', function() {
    var scrollTop = $(this).scrollTop();
    if (scrollTop >= 100 && !isFlipped) {
      $card.css({ transition: 'all 1s', transform: 'rotateY(180deg)' });
      $flap.css({ transition: 'all 1s .5s', transform: 'rotateX(180deg)', 'z-index': 0 });
      isFlipped = true;
    } else if (scrollTop < 100 && isFlipped && !isOpened) {
      $card.css({ transition: 'all 1s .5s', transform: 'rotateY(0deg)' });
      $flap.css({ transition: 'all 1s', transform: 'rotateX(0deg)', 'z-index': 10 });
      isFlipped = false;
    }
  });

  // 2) Clicks: first opens & centers the letter, second reveals & centers the photo
  $card.on('click', function() {
    // First click after flip → center letter + play audio
    if (isFlipped && !isOpened) {
      $letter.addClass('centered');
      audioEl.play().catch(function(err) {
        console.warn('Playback blocked:', err);
      });
      isOpened = true;
      return;
    }
    // Second click → center photo
    if (isOpened && !photoShown) {
      $photo.addClass('centered');
      photoShown = true;
    }
  });
});
