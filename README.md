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
#### 13. 使用svg画圆环 stroke-width stroke-dasharry stroke-linecap=round 利用圆的周长2pai r半径 然后stroke-dasharry是画虚线  第一个参数是实心的长度 第二个是虚线的长度 总长度是2pai r 所以就可以进行配比了
