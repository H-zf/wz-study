#### wz-stydy

#### 1.vant 上拉加载下拉刷新
注意点：多次触发  需要在请求的时候设置loading为true 然后再load函数中判断是否为true 为true就return 下拉加载的时候有两个加载中是因为下拉也触发了refresh 再load函数中判断refresh为ture则return
#### 2.box-shadow 水平决定上下位移距离，垂直决定左右位移距离，设置inset就相反
#### 3.moment(new Date(时间戳))
#### 4. npm cache clean --force清除npm安装包缓存
#### 5. 原生安卓，ios是可以和h5页面来进行通信的方法不一样
#### 6. vant 下拉刷新上拉加载 不需要修改原组件样式，只需要给父容器盒子添加overflow：auto就好了 
#### 7. 全局路由钩子中获取cookie字段，判断是否存在，不存在就跳转无权限页面，有则next()
#### 8. h5页面缓存可以设置meta字段，再route-view可以判断meta.keepalive并且再外层包裹一层keepalive组件，可以再全局路由中，从from（重点是这里从哪个组件来）中判断是否是缓存的组件，然后是就缓存组件的scrolltop位置。再组件中keepalive activated生命周期中将meta.scrolltop数据拿出来 nexttick中使用
