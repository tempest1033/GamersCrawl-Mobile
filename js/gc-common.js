/**
 * GamersCrawl 공용 스크립트 (모바일)
 * - 이미지 폴백
 * - 폰트/이모지
 */

// ===== 이미지 폴백 =====
(function() {
  function applyFallback(img) {
    if (!img || img.tagName !== 'IMG' || img.dataset.gcFallback === '1') return;
    img.dataset.gcFallback = '1';
    var action = img.dataset.imgFallback || '';
    if (action === 'hide') img.style.display = 'none';
    else if (action === 'parent-hide' && img.parentElement) img.parentElement.style.display = 'none';
  }
  document.addEventListener('error', function(e) {
    if (e.target && e.target.tagName === 'IMG') applyFallback(e.target);
  }, true);
})();

// ===== 폰트 + 이모지 =====
(function() {
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function() {
      document.documentElement.classList.add('fonts-loaded');
    });
  } else {
    setTimeout(function() {
      document.documentElement.classList.add('fonts-loaded');
    }, 100);
  }

  function parseTwemoji() {
    if (window.__gcTwemojiParsed || typeof twemoji === 'undefined') return;
    twemoji.parse(document.body, { folder: 'svg', ext: '.svg' });
    window.__gcTwemojiParsed = '1';
  }
  parseTwemoji();
  window.addEventListener('load', parseTwemoji);
})();
