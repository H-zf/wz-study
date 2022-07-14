import Vue from 'vue'
import Main from './index'
let loginLayerConstructor = Vue.extend(Main)
let instance
const loginLayer = function (opts = {}) {
  instance = new loginLayerConstructor({
    data: {
      visible: true
    },
    props: {
      businessSource: {
        type: String,
        default: opts.businessSource || ''
      },
      pageTitle: {
        type: String,
        default: opts.pageTitle || ''
      },
      registerPage: {
        type: String,
        default: opts.registerPage || ''
      }
    },
    methods: {
      loginSucess: () => (opts.success ? opts.success() : window.location.reload()),
      loginCancel: () => (opts.cancel ? opts.cancel() : 'cancel'),
      loginShow: () => (opts.show ? opts.show() : 'show')
    }
  })

  instance.$mount()
  document.body.appendChild(instance.$el)

  return instance
}

loginLayer.close = function () {
  instance.onClose()
}

export default loginLayer
