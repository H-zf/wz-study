#### wz-study
#### special node安装不同版本的时候可以查找以往版本，下载msi后缀的文件进行安装
#### 1.vant 上拉加载下拉刷新
注意点：多次触发  需要在请求的时候设置loading为true 然后再load函数中判断是否为true 为true就return 下拉加载的时候有两个加载中是因为下拉也触发了refresh 再load函数中判断refresh为ture则return
#### 2.box-shadow 水平决定上下位移距离，垂直决定左右位移距离，设置inset就相反
#### 3.moment(new Date(时间戳))
#### 4. npm cache clean --force清除npm安装包缓存 npm install --force
#### 5. 原生安卓，ios是可以和h5页面来进行通信的方法不一样
#### 6. vant 下拉刷新上拉加载 不需要修改原组件样式，只需要给父容器盒子添加overflow：auto就好了 
#### 7. 全局路由钩子中获取cookie字段，判断是否存在，不存在就跳转无权限页面，有则next()
#### 8. h5页面缓存可以设置meta字段，再route-view可以判断meta.keepalive并且再外层包裹一层keepalive组件，可以再全局路由中，从from（重点是这里从哪个组件来）中判断是否是缓存的组件，然后是就缓存组件的scrolltop位置。再组件中keepalive activated生命周期中将meta.scrolltop数据拿出来 nexttick中使用
#### 9.debugger不生效可能是自己的起项目mode模式为production 设置为devlopment即可
#### 10. webpack chunck entry 配置字符串和数组都只会生成一个boundle文件，数组是将多个入口文件打包成一个boundle文件，entry配置成对象，对象有几个属性就生成几个对应的chunck对应几个不同的boundle文件 既然有多个文件的输出  输出的时候一个name就不够定义了  所以就是[name] 变量的形式生成文件名。衍生出多页面打包，指定相同的模板html文件，用html-webpack-plugin来指定打包的chunks，使用两次就会生成两个html文件，并引入chuncks指定的打包好的js
#### 11. vscode 查看作者 安装githistory和GitLens
#### 12. git rebase 和 git merge的区别。rebase会将不同分支提供的commit都删除掉 然后再加入到当前分支的后面形成一个新的分支，提交的commit依旧存在。如果此时有冲突，解决冲突之后输入命令 git rebase   --continue 指令合并都是需要在合并到的分支上进行操作 例如dev 合到 master 就要切换到master进行rebase git rebase dev 有冲突时可以git rebase --abort 撤回操作，回到rebase之前的状态 也可以解决掉冲突然后使用git add . 然后再执行git rebase --continue 没有冲突就直接git push到远程。
#### 13. 使用svg画圆环 stroke-width stroke-dasharry stroke-linecap=round 利用圆的周长2pai r半径 然后stroke-dasharry是画虚线  第一个参数是实心的长度 第二个是虚线的长度 总长度是2pai r 所以就可以进行配比了 画两个圆是为了让底层的白色有个底边
#### 14. 使用TCaptcha.js可以进行划块的验证，划块验证原理就是使用划块验证之后会存在一个校验，然后会生成一个验证code，然后随着请求提交给后台，达到验证的效果，就是为了防止被恶意代码攻击，或者恶意使用用户cookie做坏事
#### 15. 组件封装在使用v-if和v-else来进行不同数据来渲染不同结构的时候。 可以进行组件的封装，js的逻辑中可以判断不同的数据传递给组件不同的数据就ok了 就不用再template结构中写v-if和v-else了
#### 16. 组件化思想：逻辑复杂进行拆分，降低复杂度，可以重复使用，易于测试，松散耦合，不利于研发维护
#### 17. pulicPath的定义是需要结合后台来进行配置的。定义好pulicPath访问资源的路径，然后我们后端肯定得将资源放在对应的路径文件夹上 不然就会访问不到
#### 18. node安装包时，提示no permission时 我们可以对node存在的文件夹右键获取管理员权限即可
#### 19. 安装react项目时应该首先全局安装 npm install -g create-react-app 出现报错提示tar的最新版本长时间没支持，则需要全局安装最新的tar npm install -g tar再来安装create-react-app
#### 20. 安装create-react-app时如果报错说“无法将“create-react-app”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。”，打开cmd 输入create-react-app --version 看看是否安装成功， 如果成功则打开powershell中来执行create-react-app --version来查看版本， 如果查询不到版本， 此时可以先window+X打开powershell 来执行命令 命令如下：set-ExecutionPolicy RemoteSigned 回复Y即可 如果powershell与vscode终端指令不同步可以尝试将vscode全部关闭再重新打开试试（获得权限很重要）create-react-app my-app --template typescript可以生成一个自带ts的项目
#### 21. 项目中引入react-router https://www.ruanyifeng.com/blog/2016/05/react_router.html
#### 22. 在v-html中判断点击的节点可以给class来或者id然后添加点击事件，在事件源参数中来判断e.target,给富文本的dom元素添加点击事件可以在useEffect以获取dom元素的方式添加点击事件，vue中在mounted中添加click
#### 23. 在滚动中判断某些div是否显示还是隐藏，可以添加scroll事件，然后判断scrolltop和clientHeight的大小对比 大于多少来设置一个变量，然后来控制显示隐藏
#### 24. 判断当前滚动的元素是否在当前页面可视区域中 
  let scrollItems = document.querySelectorAll('.scroll-item')
      for (let i = scrollItems.length - 1; i >= 0; i--) {
        // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
        let judge = wrapRef.current.scrollTop >= scrollItems[i].offsetTop - document.querySelector('.tabwrap')?.offsetHeight - 10
        if (judge) {
          tabRef.current._childFn(i);
          break
        }
      }
#### 25. 很多时候的滚动都是使用的是setinterval 移动scrollTop的值
#### 26. bug： ios与安卓都存在cookie，然后打开一个容器来运行h5的时候会设置cookie提供给容器使用，ios设置的很及时在版本强更的时候能及时设置好cookie所以请求的时候就不会报没有登陆的错，安卓由于某种原因，组合使用内核，然后导致cookie没有及时塞进去，所以我们需要使用js的方法手动去安卓的某个地方取出来进行设置。设置cookie的时机，一般是进入路由的时候来判断，没有cookie就等设置好了之后再进入。
#### 27. react connect注入store中数据是联动的dispatch之后数据更新然后注入到组件中然后设置数据就可以了 ,先dispatch请求数据然后store中设置数据，然后再注入到组件中，然后解构出数据再使用就可
#### 28. 下拉刷新，上拉加载。只需要监听current的变化去请求数据，改变current就可以了
#### 29.  移动端的键盘弹起会推起定位的元素，解决办法是onresize事件，对比前后的窗口大小，来动态添加样式，安卓和ios处理办法一致 安卓是动态的将fixed的元素改成static元素，ios用display：none和display：block；
#### 30. vue中数据如果使用的couputed来进行收集的 然后修改的时候 如果数组中的数据没有变化是触发不了数据双向绑定的。因为computed是有缓存的  所以在进行数据接收的时候我们要created中使用data中的数据赋值接收，然后直接进行赋值就能触发数组的双向绑定.有个问题在created中来赋值时，时引用类型的时候会修改原始的数据，所以需要深拷贝。然后dialog中的数据没有重置，是因为组件本身就存在 显示隐藏只是display的切换而已
#### 31. git stash pop 有冲突的时候可以取消 git reset --hard
#### 32. 给input添加关闭按钮的时候要注意点击关闭的时候会触发input的失去焦点方法,可以使用settimeout来改改变变量 使用定时器延迟来关闭按钮
#### 33. vue和react中定时器settimeout都是在页面数据渲染完成之后再执行的 可以解决element-ui Popover 在切换的时候定位混乱的问题
#### 34. 原生与h5之间可以使用sessionstrorage来进行传值
#### 35. 在本项目中使用另外一个项目，在另外一个项目开发新功能需要验证的时候，可以将新功能开发完成打包好，然后在本项目中引入进来 js css都要切换引用地址
#### 36. nuxt中间件就类似于一个拦截器，所有操作都会先进入到这个拦截器中来进行过滤一遍 asyncdata created fetch 在nuxt中是既可能在服务器端又可能在客户端执行的生命周期
#### 37. dva 中定义的数据model得定义在pages中才能生效
#### 38. 一个项目引入另一个项目class一样会有样式冲突
#### 39. sessionStorage 存的值是undifine的时候 会返回一个字符串的undifine 在判断的时候需要注意一下
#### 40. react中可能在取值的时候取不到最新的值，可以使用useRef来存数据就ok了
#### 41. react hooks中也可以使用react.component来定义组件，使用生命周期函数来进行操作 也可定义FC（函数组件）

## 判断一个数据是否称之为状态（state） 组件封装中需要记住
1、变量如果是通过props从父组件中获取，就不是一个状态

2、如果这个变量可以通过其他的状态state或者属性props 通过数据处理得到，就不是一个状态

3、如果变量在render中没有使用到，那就不是一个state

4、变量在整个生命周期中都保持不变时，也不是一个状态　
#### 而Props对于使用它的组件来说，是只读的，要想修改Props，只能通过该组件的父组件修改。在组件状态上移的场景中，父组件正是通过子组件的Props, 传递给子组件其所需要的状态。
#### 状态是可变得，是组件用来维护的一套数据不能与外部数据进行混淆

#### 我们所说的异步的函数 是这样子来理解，比如setState是异步处理数据的，会丢进异步队列中去，继续执行下面的代码，在下面的代码中来获取异步修改的数据是取不到的，这就是异步函数处理数据
#### 42. onClick={ this.handleChange }这种形式来进行函数绑定时，是以回调函数来进行调用的哈。需要绑定上下文this才能在函数中使用this。onClick={ （）=> this.handleChange() }如果是这种形式来绑定函数。由于执行时（）=> 箭头函数会找到上层的this，此时的this就是render函数中的this所以通过this来调用handleChange时handleChange内部就能够来访问render中的this
#### 43. ios和安卓弹出键盘将input框遮挡住，有可能是运行内核的问题影响到了，更新一下内核会改善这样的问题。安卓收起键盘不失焦，判断不了是否收起键盘做处理。
#### 44. vue组件封装好之后要暴露一个install的方法，并接受一个VUE的参数，来调用vue.components来注册全局组件
#### 45. document.scrollingElement找到的是滚动的元素，设置scrolltop就可以进行滚动
#### 46. 弹出层禁止后面的元素滚动
    if (showCapitalRetention) {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        document.body.style.cssText += 'position:fixed;width:100%;top:-' + scrollTop + 'px';
    } else {
        let body = document.body;
        body.style.position = '';
        let top = body.style.top;
        document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
        body.style.top = '';
    }

#### 47. require除了引入包之外还可以引入本地的文件
#### 48. 在点击时来进行搜索，且页面有多个tab，使用component来设计的组件切换，此时可以设置ref，并且再切换的时候将ref的值进行缓存起来。然后再点击搜索的时候就可以拿到实例，再调用其方法进行搜索
#### 49. element-ui table支持拖动可以使用sortablejs来进行处理
#### 50. a标签打开会覆盖当前的页面可以回退，window打开的页面是新打开的页签
#### 51. vue-某个组件中需要watch值来请求接口的时候，如果有初始值也有传递进来的值，此时可以在组件内自定义一个变量，然后进行初始化，然后watch传递进来的值，然后赋值给自定义的变量然后再请求数据
#### 52. 在抽屉需要展开动画的时候可以动态改变height并结合css transition来处理
#### 53. react 18中安装 scss 直接下载node-sass@npm:dart-sass 将css文件改成scss文件即可

#### 54. react-ref可以设置回调函数，ref属性可以设置为一个回调函数，这也是官方强烈推荐的用法；这个函数执行的时机为：组件被挂载后，回调函数被立即执行，回调函数的参数为该组件的具体实例。


``` const [show, setShow] = useState<boolean>(false);

 const appref = (html: any) => {
  if(!html) return;
  let { offsetWidth, scrollWidth } = html;
  setShow(scrollWidth > offsetWidth);
 };
  
 useEffect(() => {
  console.log('useEffect');
 }, [])
  
 return <div>
  <div ref={ appref } className='tooltips'>2345678909876534567890987654345678876543234sdhjhdgfasjd</div>
  {show && <div>show</div> || <div>noshow</div>}
 </div>
``` 
#### 55. react给组件添加ref时，需要给组件使用React.forwardRef(HeaderComponent)包裹组件
#### 56. 浏览器页签切换时，页面中的定时器加速。重影问题
```
document.onvisibilitychange = () => {
    clearInterval(timeId);
    if(document.visibilityState === 'visible'){
        this.handleLeavePlay();
    }
}
```
#### 57. 移入显示tooltip改版 使用样式控制版本 （div隔着太近 鼠标移入移出太快会有问题）
```
<el-tooltip class="item" :popper-class="closeTooltip ? 'entranceTitle-pop' : 'entranceTitle-pop hidden'" effect="dark" placement="top">
    <div slot="content">
        {{ item.companyName }}
    </div>
    <div 
        class="item" 
        @mouseenter="handleEnterPurse" 
        @mouseleave="handleLeavePlay" 
        >{{ item.companyName }}</div>
</el-tooltip>
// script
 handleEnterPurse(e) {
    if(e.target.offsetWidth < e.target.scrollWidth){
        this.closeTooltip = true;
    } else {
        this.closeTooltip = false;
    }
},
handleLeavePlay() {
    this.closeTooltip = false;
}
// style
.el-tooltip__popper.entranceTitle-pop.hidden {
    display: none;
}
```
#### 58. context的应用 需要使用的时候需要将context文件引入到需要使用的文件中
```
 // app.tsx
  <ThemeContext.Provider value={ contextValue }>
      <div onClick={ handleChangeVlaue }>点击我改变contextValue</div>
      <Header ref={appref} name="namenamenamename"></Header>
      <Footer></Footer>
    </ThemeContext.Provider>
```

```
// context
import React from 'react';
const ThemeContext = React.createContext({
  username: '',
  messageDetail: '',
});
export default ThemeContext 
```
#### 59. 项目一般升级webpack的时候我们先将webpack对应的插件先进行安装，然后build一下文件，然后看报错需要重新更新哪些插件。
#### 60. 在递归的算法中，可以使用传递引用类型的数据，使用值传递类型数据，判断容易出问题。
#### 61. babel的三个作用 一是代码转换 二是打补丁添加相关不兼容的api 三是源码转换。
#### 62. 对于已经存在的项目添加eslint得在一个新版本上线之后在进行统一添加，成本最低.
#### 63. 对于数字首字母不能为0 且只能输入数字时，可以使用正则 
```
   oninput="value = value.replace(/^[0]+[0-9]*$/gi, '').replace(/[^\d.]/g, '')"
```
#### 64. css在编译时经历的几个阶段
```
  1. 手写源生 CSS
  2. 使用预处理器 Sass/Less
  3. 使用后处理器 PostCSS
  4. 使用 css modules
  5. 使用 css in js
  
  postcss 做了哪些工作 stylelint支持less和scss，给样式做一个校验的工作
  postcss-pxtorem 也依赖postcss的parse
  插件： 1. autoprefixer 自动添加兼容样式
         2. StyleLint 给样式做一个检验的工作
         3. cssnano 给样式做一个优化的功能
```
#### 65. Eslint的学习与使用
```https://baijiahao.baidu.com/s?id=1713737414231260655&wfr=spider&for=pc
   http://t.zoukankan.com/guangzan-p-14057876.html参考该链接内容来熟悉三者之间的关系
  vscode中存在eslint插件，npm中存在eslint包。两者有什么区别？
  vscode中的eslint方便你直接看到错误。顺便会帮你修复简单的错误。npm包中eslint报错了会停止webpack编译，直到你修复
  vscode的中的插件是做一些规范，不会对你的程序有影响
  
  项目.vscode文件夹下setting.json文件设置之后优先级会高于vscode设置中的setting.json
   .eslintrc.js 不仅作用于 vscode 中 eslint 插件，还作用与 eslint-loader。
   .prettierrc 配置文件会影响 vscode 的 prettier 插件，且优先级高于在 vscode settings.json 中的 prettier 插件配置
```
#### 66. nuxt seo处理分页时，都是使用的a标签，然后使用location.href = '' 地址链接然后拼接page=1, page=2来进行实现
#### 67. css word-break: normal;按照浏览器的默认换行，标点符号不能分开换行
#### 68. 判断某个元素是否在可视区域中 然后设置另外一个元素的显示隐藏
```
  let ele = document.querySelector('.expert-audit');
  if(!ele)return;
  let bottomSuctionEle = document.querySelector('.bottom-suction');
  let bottomSuctionEleHeight = bottomSuctionEle && bottomSuctionEle.offsetHeight || 0;
  let headerLinkHeight = isApp() ? 0 : 53;
  let clientHeight = document.documentElement.clientHeight;
  let { bottom, top } = ele.getBoundingClientRect();
  if(bottom > headerLinkHeight && top < clientHeight - bottomSuctionEleHeight){
      handleBottomSuction(false);
  } else {
      handleBottomSuction(true);
  }
```
#### 68. react实时获取dom height做处理
```
const contentRef = (html) => {
    if (!html) return;
    let { scrollHeight } = html;
    html.firstChild.style.textIndent = '24px';
    handleShowMoreIcon(scrollHeight > 342);
};
```
#### 69. 动态加载div内容使用innerHTML 和 dangerouslySetInnerHTML __html 动态加载时，如果数据中存在图片的时候，如果图片比较大，加载的比较慢，则获取的height就不准确，展开和收起就不准确
#### 70. 移动端与pc端实现互相跳转的逻辑，在移动端中做pc的跳转，在pc端实现移动端的跳转，要判断useAgent是pc还是移动端
#### 71. 上传文件的时候是可以使用filereader来读取图片的宽高的，使用promise来做处理，再上传到服务器
#### 72. 1px的line
```
  margin-top: 12px;
  width: 200%;
  height: 1px;
  background-color: #e3e3e3;
  transform: scale(0.5);
  transform-origin: 0;
```
#### 73. 原生与h5同步，h5点击之后给原生，原生修改之后调用h5传过去的回调，进行同步
#### 74. nuxt做静态化，数据在服务器端请求回来就直接渲染，不要在客户端做处理，否则静态化不成功。判断是否成功做成静态化，我们可以在源代码上看是否在body中生成div或者a标签，如果只是数据则不成功（如果数据在服务器端请求在渲染的时候也是在服务器端做的则body中就会使用到这个数据渲染的结果）
#### 75. a标签下载同域名下设置download属性可以设置文件名，如果不同域名则设置不成功
```
   const x = new window.XMLHttpRequest()
      x.open('GET', fileUrl, true)
      x.responseType = 'blob'
      x.onload = () => {
        const url = window.URL.createObjectURL(x.response)
        const a = document.createElement('a')
        a.href = url
        a.download = name
        a.click()
      }
      x.send()
      // 二进制流使用a标签下载
      const link = document.createElement('a')
      let blob = new Blob([res.data], {
        type: 'application/vnd.ms-excel'
      })
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      link.download = `${this.errorReportTitle}.xlsx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
```
#### 76. dom设置样式input 禁用 是diabled=disabled
#### 77. 兄弟元素可以使用+来写样式应该可以避免第一个元素加margin和padding的问题
#### 78. 我的电脑的IP地址为192.168.1.88，路由器的WAN（广域网）端口自动探测到广州电信分配给它的一个公网IP地址，如121.33.117.131。当我的电脑开机后，与路由器连接上，路由器会分配一个端口号给我这条连接，如分配给我的是1444。当我要打开网页时，我的电脑发送一个数据包到路由器默认网关192.168.1.1，当这个数据包到达路由器的时候，路由器会进行折解数据包的过程，提取出这个数据包的头部源IP地址192.168.1.88:1444，路由器通过查看NAT表，将数据包的头部源IP地址改为121.33.117.131:1444,并以56.23.5.2:80(www访问的端口号为80)为目的地址将数据包发送到目的网络的服务器上，服务器做出回应时，以56.23.5.2:80为源IP地址，121.33.117.131:1444为目的地址将数据包发送到路由器上，路由器再查NAT表，找到121.33.117.131:1444对应的内部地址192.168.1.88:1444，于是服务器发回的数据包就发送到了我的电脑上，而不是局域网（LAN）内其他主机上。公网上的服务器只知道IP地址为121.33.117.131的路由器在与它通信，并不知道是我的电脑在与它通信，这对于保护局域网内的主机是有好处的。
#### 79. 下载excel文件的时候，打开有问题时，可以加.csv的后缀来看下文件，文件中如果是正常的格式，则可以看到异常的记录，如果不正常是乱码的现象，就要看是否是文件的格式转换不对，然后可以在请求头上来要求返回的格式是blob或者其他的格式(requestType)
#### 80. img和pdf如果需要预览，则可以使用a标签进行预览
```
let imgSrc = downloadUrl
let el = document.createElement('a')
el.target = '_blank'
el.href = imgSrc
document.body.append(el)
el.click()
el.remove()

// 预览的时候如果下载的name与链接的名字不一致，可以在链接后缀添加?fname=某个名字就可以了
```
#### 81. vconsole在使用时只需要new就可以出现空白有可能是你项目中布局不对
#### 82. 后台管理多页签的布局分析
  ```
    1. 首先每个路由中应该都会存在tabs页签 面包屑等组件
    2. 其次在侧边栏点击路由时，统一保存一份tabs信息（在页面中监听路由的变化，变化之后就添加一份数据到tabs中）在必须渲染的组件中来监听路由，做增删改查
    3. 删除的逻辑处理分析（删除成功之后回调，先判断删除的是不是active元素，是则取tabs中的数据，如果存在则跳转，不存在则代表tabs中没有数据，则跳转到默认路由）
  ```
#### 83. react 开发移动端可以选择react-vant antd-mobile 5.0.0 zarm
#### 84. 在项目中需要引入一些比较常用的第三方库时体积比较大时，可以将文件放在static中（文件打包的输出文件夹中），使用CopyWebpackPlugin插件打包到dist指定的文件夹中，在html中直接使用script来引入使用绝对路径引入"/"，可以事先使用build打包一次 看看文件夹中的文件地址
```
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
      
      在项目中可以使用相对路径来进行文件查找都是可以的
```
#### 85. npm安装包时，可以先删除node_moudles然后清理下npm的缓存npm cache clean --force
#### 86. babel-plugin-import是按需来加载组件，正常是引入组件和样式，这个插件是来帮你做了这层处理
#### 87. @是别名配置~是相对的概念 例如@配置别名地址是src ~@/assets是相对于src文件下的assets文件中的
#### 88. nuxt：https://blog.csdn.net/qq_38290251/article/details/106519985 项目中的配置比较详细
#### 89. vue template https://vue3js.cn/vue-template-explorer/#%3Cdiv%20id%3D%22app%22%3E%7B%7B%20msg%20%7D%7D%3C%2Fdiv%3E
#### 90. 背景跟着屏幕宽度变化设置
```
  background: url('~@/assets/image/innovate/banner.png') no-repeat center center;
  background-size: cover;
```
#### 91. 时间格式化可以定义一个模板`{h}/{d}`然后将时间算出来一个一个替换
#### 92. 浏览器刷新会将会话级别的cookie进行清除，持久级别不会清除
#### 93. 毛玻璃效果样式
```
background: rgba(24, 86, 226, 0.3);
backdrop-filter: blur(12px);
```
#### 94. docker容器，容器即服务。docker打包镜像开启服务步骤；
```
  1. 打包生成jar包
  2. 执行dockerFile文件
  3. 构成镜像
  4. 打tag，推送到远程仓库
  5. 拉去远程镜像，安装构建包，启动服务
  docker网络
  docker不对外开放，可以进行端口映射来进行访问
  一处安装，到处运行
  和以前后台的流程
  .yml语法
  include：
  - project: 'qzdapp/qzd-cicd-template'
    ref: master,
    file: '/.gitlab/ci/qzd.gitlab-ci.yml'
<!-- 数组    可以理解为 -->
    include: [{
      project: 'qzdapp/qzd-cicd-template',
      ref: master,
      file: '/.gitlab/ci/qzd.gitlab-ci.yml'
    }]

 include：
    project: 'qzdapp/qzd-cicd-template'
    ref: master,
    file: '/.gitlab/ci/qzd.gitlab-ci.yml'
<!-- 对象    可以理解为 -->
include： {
    project: 'qzdapp/qzd-cicd-template'
    ref: master,
    file: '/.gitlab/ci/qzd.gitlab-ci.yml'
}

stages:
  - build_dev
  - test  
  - deploy_dev
  - build_test
  
<!--     可以理解为 -->
stages: ['build_dev', 'test', 'deploy_dev', 'build_test']
${ENV}这些都是运维配置的变量
stages分为很多阶段
每个stage分为有很多jobs 执行每个阶段时，job都是并行
每个stage执行成功下一个stage才能和上一个执行完的job进行并行处理
名称与执行的过程按照下图中进行参考
![Snipaste_2022-07-09_14-08-59](https://user-images.githubusercontent.com/69661225/178094169-cfc2e5e7-05a9-44a3-a723-409f03a5f5cc.png)
https://fizzz.blog.csdn.net/article/details/123855607?spm=1001.2014.3001.5502 // 参考来理解cicd
```
#### 95. 老虎机简易实现版本，改变父元素使用trasition all 和 transform translateY 定时器得每次修改定时器时间越来越慢。数据可以复制几份，取数据得同一数据得最后一个数据得索引。(每次translateY得距离就是每个滚动元素得height)
#### 96. 一般的前端鉴权方式，js-cookie 来进行cookie的设置，登陆成功使用cookie来进行存取值，退出登陆则清空数据。也可以在vuex中存取一份数据
#### 97. 没有使用nuxt来进行开发时，vuex中存储的数据再刷新的时候，vuex中的数据会消失，需要重新初始化，再nuxt中则在中间件中来使用vuex来存取数据，每次进入路由都会进入到中间件，所以你刷新也会重新进入你的中间件来存值 nuxt.config.js中router配置中添加middleware属性来添加middleware文件夹下的文件
#### 98. 邀请码之间的业务，邀请码后面会存在一个邀请码，在url上添加，在登陆的时候也会带这个参数，登陆完成之后也会带着这个参数到对应的页面中，然后再确定你是否是拉新用户，如果在被邀请的用户中进行跳转，跳转到另外一个界面中也可进行登录,此时不可能在所有的链接上都拼接上邀请码所以此时需要在进入到邀请页面的时候，就需要创建一个唯一id与邀请的人的id关联
```
场景：A用户邀请B用户
A用户id映射出VA（虚拟id） // 不使用A的真实id是因为有安全问题
然后在邀请的界面将A用户的VA拼接参数
B用户被邀请，打开链接
此时可以通过url上的VA找到是谁邀请的
存在问题：
B打开页面之后到处跳转打开了很多页签，但是不可能每个链接上都带上A用户的虚拟id VA
所以此时就需要根据用户登陆设备来生成一个唯一的标识，uuid。
此时B用户打开的所有页面中都有相同的uuid，此时只需要在B打开的邀请页面的时候，将uuid与A用户的VA进行关联认证，那就可以知道被邀请人是谁了
唯一的变数就是uuid，这个唯一且过期时间很长才能保证数据的准确性
此时在设置uuid的时候需要判断cookie中是否存在uuid存在就直接设置该值，不存在就重新生成一个uuid并且设置cookie值

同一台设备上打开两个邀请页面都会请求uuid与虚拟用户相关联的请求，后台只会保存最新的uuid与虚拟id相关联
```
#### 99. const ctx = require.context('./modules')引入的是modules文件夹中的所有js







