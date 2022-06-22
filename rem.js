// rem是适配屏幕大小然后动态修改html根元素的fontsize
// rem适配除以750 / 7.5 是为了方便1rem = 100px 方便我们前端写rem方便
let unitBodyFontsize
;(function (doc, win) {
  let documentEle = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = function () {
    let clientWidth = documentEle.clientWidth
    if (!clientWidth) return
    if (clientWidth <= 1080) {
      unitBodyFontsize = 100 * (clientWidth / 750)
      documentEle.style.fontSize = unitBodyFontsize + 'px'
    } else {
      unitBodyFontsize = 100 * (1080 / 750)
      documentEle.style.fontSize = unitBodyFontsize + 'px'
    }
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
  recalc()
})(document, window)
