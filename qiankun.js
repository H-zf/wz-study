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


// 初学乾坤
注册子服务，在父盒子中定义容器来放子服务
子服务为一个路由链接
在注册的时候可以在子容器中添加cookie，和vuex中的方法以及数据
