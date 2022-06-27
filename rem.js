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

;(function(doc, win) {
  const documentEle = doc.documentElement
  const bodys = document.getElementsByTagName('body')[0]
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const _scale = isIOS() ? 1 : win.getComputedStyle(documentEle)['font-size'].replace(/px/gi, '') / 50
  const recalc = function() {
    const clientWidth = documentEle.clientWidth
    if (!clientWidth) return
    if (clientWidth <= 1080) {
      unitBodyFontsize = 100 * (clientWidth / 750)
      documentEle.style.fontSize = unitBodyFontsize / _scale + 'px'
    } else {
      unitBodyFontsize = 100 * (1080 / 750)
      documentEle.style.fontSize = unitBodyFontsize / _scale + 'px'
    }
    bodys.style.visibility = 'visible'
    store.commit('SET_RemUnitSize', unitBodyFontsize / _scale)
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
  recalc()
})(document, window)
