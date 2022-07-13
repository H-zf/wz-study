import { getSignature } from '@/services/content/detail.js' // 请求后台的数据 然后将数据请求回来做初始化
/**
 * H5页面微信分享朋友圈 && 朋友
 * @params {
 *   coverImg: String // 封面图片
 *   title: String // 分享标题
 *   summary: String // 分享摘要
 * } 
 */
export default function wxShare (params) {
  getSignature({ url: window.location.href.replace('file:', 'https:') }).then(res => {
    let v = res.data.data
    v.imgUrl = params.coverImg?.split(',')[0]
    v.title = params.title
    v.summary = params.summary
    initShareOptions(v)
  })

  function initShareOptions ({ appId, nonceStr, signature, timestamp, imgUrl, title, summary }) {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId, // 必填，公众号的唯一标识
      timestamp, // 必填，生成签名的时间戳
      nonceStr, // 必填，生成签名的随机串
      signature,// 必填，签名
      jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData'] // 必填，需要使用的JS接口列表
    });
    wx.ready(function () {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
      // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
      // 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      console.log('config信息验证成功')
      wx.updateTimelineShareData({
        title, // 分享标题
        link: window.location.href.replace('file:', 'https:'), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: function (e) {
          console.log('设置成功', e)
          // 设置成功
        }
      })
      wx.updateAppMessageShareData({
        title, // 分享标题
        desc: summary,
        link: window.location.href.replace('file:', 'https:'), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: function (e) {
          console.log('设置成功', e)
          // 设置成功
        }
      })
    });
    wx.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      console.error('config信息验证失败:', res)
    });
  }
}

// 文件暴露一个方法，然后import 之后直接调用并传递参数。
// 1.签名用的noncestr和timestamp必须与wx.config中的nonceStr和timestamp相同。
// 2.签名用的url必须是调用JS接口页面的完整URL。
// 3.出于安全考虑，开发者必须在服务器端实现签名的逻辑。
//
import { wxSdkInfo } from '@/api/moveActivity/index.js'
import { isWxEv } from '@/utils/validate.js'

// 加载微信sdk
function wxSdk() {
  const _script = document.getElementById('wz-sdk')
  if (_script) _script.remove()
  const wx = document.createElement('script')
  const s = document.getElementsByTagName('script')[0]
  wx.src = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js'
  wx.defer = true
  wx.id = 'wz-sdk'
  s.parentNode.insertBefore(wx, s)
}

export default async function () {
  if (isWxEv()) {
    await wxSdk()
    const { success, data } = await wxSdkInfo(window.location.href.split('#')[0])
    if (success) {
      const { appId, timestamp, nonceStr, signature } = data
      if (window.wx.config) {
        window.wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId, // 必填，公众号的唯一标识
          timestamp, // 必填，生成签名的时间戳
          nonceStr, // 必填，生成签名的随机串
          signature, // 必填，签名
          jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData'] // 必填，需要使用的JS接口列表
        })
      }

      window.wx.ready(function () {
        window.wx.updateTimelineShareData({
          title: '企知道·会员日-分享2亿创新金',
          link: 'https://appweb.qizhidao.com/activity/moveActivity',
          imgUrl: `https://wz-website-oss.chinaweizheng.com/file-resource/prod/qzd-activity/21.jpg`
        })
        window.wx.updateAppMessageShareData({
          title: '企知道·会员日-分享2亿创新金',
          desc: '认证可获得分享资格，最高可得18888',
          link: 'https://appweb.qizhidao.com/activity/moveActivity',
          imgUrl:  `https://wz-website-oss.chinaweizheng.com/file-resource/prod/qzd-activity/21.jpg`
        })
      })
      window.wx.error(function (res) {
        console.error('error:', res)
      })
    }
  }
}

