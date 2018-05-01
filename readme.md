一个建设中的个人网站
====

[主页](http://htmlpreview.github.io/?https://github.com/BUPTlhuanyu/personalHomePage/blob/master/src/index.html)

####
    打算写两个版本，原生js版本以及vue版本或者react版本
    原生js版本主要存在的问题有
+   异步管理，将使用定时器，事件处理程序，以及es6的promise，generator，async管理异步流程
+   数据的双向绑定
+   原生js的路由管理
+   CSS文件的划分，布局，效果等等分离文件，主要利于开发
+   js文件，申明文件以及调用文件分离
    性能优化
+   webpack抽取文件，合并js文件与css文件，加快线上网站的加载速度
+   背景图片，等图片的优化
+   数据的分组处理，由于浏览器单线程具有阻塞性，避免js处理获取的数据时间过长，阻塞页面用户的交互
+   对DOM执行集中添加操作
+   减少http请求
+   ajax缓存


#####   CSS
+   两列流式布局，三列流式布局，混合流式布局。未使用flex
+   清除浮动方法的比较，主要用了常用的clearfix的布局
+   浮动定位
+   页脚始终保持在html底部，min-height
+   水平垂直居中

#####   js
+   利用豆瓣API，生成电影榜单:利用jsonp跨域，解决chrome等浏览器的阻止混合内容，取消逐个添加DOM，解决响应完成的一些异步问题。
+   利用qq音乐API，为音乐播放器提供资源

![图片](main.png)
![图片](life.png)