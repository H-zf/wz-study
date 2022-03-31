#### wz-stydy
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
#### 10. webpack chunck entry 配置字符串和数组都只会生成一个boundle文件，数组是将多个入口文件打包成一个boundle文件，entry配置成对象，对象有几个属性就生成几个对应的chunck对应几个不同的boundle文件 既然有多个文件的输出  输出的时候一个name就不够定义了  所以就是[name] 变量的形式生成文件名
