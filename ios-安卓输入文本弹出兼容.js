export function scrollKeywords(distance) {
  if (document.scrollingElement.scrollTop < 100) {
    let _scrollTop = 0;
    let scrollToptimer = null;
    if (scrollToptimer) clearInterval(scrollToptimer);
    scrollToptimer = setInterval(() => {
      const ispeed = Math.floor(distance / 4);
      _scrollTop += ispeed;
      document.scrollingElement.scrollTop = _scrollTop;
      // document.body.scrollTop = _scrollTop
      if (_scrollTop >= distance - 3) {
        clearInterval(scrollToptimer);
      }
    }, 20);
  }
}

scrollKeywords(255)
