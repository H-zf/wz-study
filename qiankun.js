// micro-store 
import { initGlobalState } from 'qiankun'
import Vue from 'vue'
// import Cookies from 'js-cookie'

function microStore(nuxt) {
  
  // 父应用的初始state
  const storeStauts = nuxt.store.state.micro // 这是主容器中的一个数据
  const initialState = Vue.observable(storeStauts) // 做一个监听

  const actions = initGlobalState(initialState)

  // 监听修改主容器中的数据做修改的操作 一个同步到vuex中 一个是同步actions中
  actions.onGlobalStateChange((newState, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    // for (const key in newState) {
    //   initialState[key] = newState[key]
    // }
    nuxt.store.commit('micro/SET_DATA', newState)
  })

  // 定义一个获取state的方法（函数）下发到子应用
  actions.getGlobalState = (key) => {
    // 有key，表示取globalState下的某个子级对象
    // 无key，表示取全部
    return key ? initialState[key] : initialState
  }

  return actions
}

export default microStore
// micro
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
 // 子容器修改数据会被监听到，然后下发到子容器，通过方法来进行数据的获取
export default appsFun


// 初学乾坤
注册子服务，在父盒子中定义容器来放子服务
子服务为一个路由链接
在注册的时候可以在子容器中添加cookie，和vuex中的方法以及数据
可以共享父容器的store
https://www.jianshu.com/p/36f415bd2cbe
