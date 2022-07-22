import ipsStore from './micro-store'
import Cookies from 'js-cookie'

function appsFun(prop) {
  const microApps = [
    {
      name: 'ips-sub',
      entry: process.env.ipsSubUrl,
      activeRule: '/ips'
    }
  ]

  const store = ipsStore(prop)
  return microApps.map(item => {
    return {
      ...item,
      container: '#ips-app', // 子应用挂载的div
      props: {
        routerBase: item.activeRule, // 下发基础路由
        token: Cookies.get('accessToken'),
        getGlobalState: store.getGlobalState // 下发getGlobalState方法
      }
    }
  })
}

export default appsFun
