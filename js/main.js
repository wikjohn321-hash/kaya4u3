(function () {
  var track = document.getElementById('slides');
  var dots = document.getElementById('dots');
  var n = track.children.length, cur = 0, timer;
  for (var i = 0; i < n; i++) {
    (function (i) {
      var d = document.createElement('button');
      d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      d.addEventListener('click', function () { go(i); restart(); });
      dots.appendChild(d);
    })(i);
  }
  function go(i) {
    cur = (i + n) % n;
    track.scrollTo({ left: cur * track.clientWidth, behavior: 'smooth' });
  }
  function mark() {
    cur = Math.round(track.scrollLeft / track.clientWidth);
    Array.prototype.forEach.call(dots.children, function (d, k) { d.classList.toggle('on', k === cur); });
  }
  function restart() {
    clearInterval(timer);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timer = setInterval(function () { go(cur + 1); }, 5000);
    }
  }
  track.addEventListener('scroll', mark, { passive: true });
  track.addEventListener('touchstart', function () { clearInterval(timer); }, { passive: true });
  track.addEventListener('touchend', restart, { passive: true });
  mark(); restart();
  document.getElementById('yr').textContent = new Date().getFullYear();
})();
