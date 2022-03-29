#### wz-stydy

#### 1.vant 上拉加载下拉刷新
#### 注意点：多次触发  需要在请求的时候设置loading为true 然后再load函数中判断是否为true 为true就return 下拉加载的时候有两个加载中是因为下拉也触发了refresh 再load函数中判断refresh为ture则return
