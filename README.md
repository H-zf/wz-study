#### wz-study
#### special node安装不同版本的时候可以查找以往版本，下载msi后缀的文件进行安装
#### 1.vant 上拉加载下拉刷新
注意点：多次触发  需要在请求的时候设置loading为true 然后再load函数中判断是否为true 为true就return 下拉加载的时候有两个加载中是因为下拉也触发了refresh 再load函数中判断refresh为ture则return
#### 2.box-shadow 水平决定上下位移距离，垂直决定左右位移距离，设置inset就相反
#### 3.moment(new Date(时间戳))
#### 4. npm cache clean --force清除npm安装包缓存
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




