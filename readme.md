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
+   背景图片，等图片的优化：利用tinypng在线工具对图片进行无损压缩。
+   数据的分组处理，由于浏览器单线程具有阻塞性，避免js处理获取的数据时间过长，阻塞页面用户的交互。
        并发协作：将一个长期运行的代码（“进程”）分割为多个步骤或者所多批任务，使得其他并发“进程”有机会将自己的运算插入到事件循环队列中交替运行。
        长期运行的“进程”运行时，页面上的其他代码都不能运行，包括不能有其他的 response(..)调用或 UI 刷新，甚至是像滚动、输入、按钮点击这样的用户事件。
        所以，要创建一个协作性更强更友好且不会霸占事件循环队列的并发系统，你可以异步地批处理这些结果。每次处理之后返回事件循环，让其他等待事件有机会运行。
        可以利用steTimeout(...,0)来实现。参考《js高级程序设计》第22章YieldingProcesses或者《你不知道的JS中》1.4.3协作
        另外：强力推荐一篇详解[事件循环和任务队列](https://www.jianshu.com/p/4516ad4b3048)的文章
+   对DOM执行集中添加操作
+   减少http请求
+   ajax缓存


#####   CSS
+   两列流式布局，三列流式布局，混合流式布局。未使用flex
+   利用max-width与min-width避免缩放对布局的影响。
+   清除浮动方法的比较，主要用了常用的clearfix清除浮动形成BFC块级上下文，隔离浮动的子元素。
+   清除浮动之后，利用footer的负外边距与兄弟元素的min-height:100%以及兄弟元素最后一个子元素的padding-bottom实现stickyfooter，footer始终保持在html底部。
+   浮动定位
+   页脚始终保持在html底部，min-height
+   水平垂直居中
+   媒体查询加流式布局实现移动端与PC端的响应式布局
+   css3的过渡效果transition

#####   js
+   利用豆瓣API，生成电影榜单:利用jsonp跨域，解决chrome等浏览器的阻止混合内容，取消逐个添加DOM，解决响应完成的一些异步问题。
+   网易云音乐歌曲获取，还没有实现跨站请求伪造(CSRF),伪造请求头,调用官方API，这里只是简单的获取歌单的API，然后获取页面的JSON数据存为
    本地的JSON数据，跳过了跨域这样的一个问题。
+   audio音频对象的使用
+   通过js改变伪类hover的样式:通过在css中写两个class然后，通过DOM的className或者classList选用class
+   利用canvas文字粒子效果：imageData对象，文字微粒化，随机粒子运动
+   ajax局部更新，promise异步编程管理(对应部分其实不需要promise，直接ajax的onreadystatechange事件就ok)
+   原生js实现简单的hash路由（回退未完成），vue-router的一种路由实现原理也是如此：在主vue文件中放置一个router-view，检测路径，然后将路径对应的组件渲染到router-view
+   在前端路由中，由于本网页不同界面有公共的组件，所以将重复组件即导航的点击事件一次性添加。解决方法有两个：
    1、在初始化路由的时候，需要先给路由添加路由表；为了不给元素重复添加相同的事件，可以在路由初始化的onload中添加一个回调函数，回调函数中给元素添加事件
    ```
        updateView:function(){
            this.currentHash = location.hash.slice(1)||"/";
            this.routesSet[this.currentHash] && this.routesSet[this.currentHash]();
        },
        init:function(){
            window.addEventListener('load', function (){
                this.updateView.bind(this)();
                /*弹框*/
                var navBarActive=document.getElementsByClassName('nav-bar-active')[0];
                var navActive=document.getElementsByClassName('nav-active')[0];
                navBarActive.onclick = function ()
                {
                    var style = navActive.style;
                    style.display = style.display == "block" ? "none" : "block";
                };
            }.apply(this));
            window.addEventListener('hashchange', this.updateView.bind(this));
        }
    ```
    2、在初始化路由的时候，需要先给路由添加路由表；可以利用在函数的执行过程中重写该函数，也就是惰性载入函数来解决这样的问题，但这样也就导致需要考虑一些其他的因素
    3、在初始化路由的时候，需要先给路由添加路由表；可以利用一个标志来标记状态，状态为true则添加事件（比如跳转到home，那么gohome里面的事件可以不重新添加），否则不需要重复添加
       如果是刷新的，那么需要重新添加事件，也就是改变状态。当然可能还有其他的一些细节需要考虑
+   封装对象：减少全局变量，实现复用，创建自己的小型代码库
+   利用安全模式，限制router方法只能用于创建对象，避免直接运行方法，将this指向windows出现访问不到属性的错误
+   利用sessionstorage保存当前歌曲json数据，解决页面跳转的时候换歌的bug，但是不够好，之后应该将music组件化对象化，然后将歌曲数据以及播放状态作为实例的数据保存下来。
    现在才发现以前代码写的很乱，没有完全面对对象重构的时候很不好改。
+   文档有滑动，文档中图片容器元素也有滑动的情况下利用getBoundingClientRect实现图片懒加载，注：HTML5的IntersectionObserver API也可实现图片懒加载。

#####
     gitnub.io的在线预览的经验：github不是CDN静态资源缓存代理所以想要动态添加外部css文件或者js文件是行不通的，所以这里静态导入了所有需要的css



![图片](https://github.com/BUPTlhuanyu/personalHomePage/blob/master/mainForPC-1.png)
![图片](https://github.com/BUPTlhuanyu/personalHomePage/blob/master/mainForPC-2.png)
![图片](https://github.com/BUPTlhuanyu/personalHomePage/blob/master/liveForPC-1.png)
![图片](https://github.com/BUPTlhuanyu/personalHomePage/blob/master/mainForMobile-1.png)
![图片](https://github.com/BUPTlhuanyu/personalHomePage/blob/master/mainForMobile-2.png)
![图片](https://github.com/BUPTlhuanyu/personalHomePage/blob/master/mainForMobile-3.png)
![图片](https://github.com/BUPTlhuanyu/personalHomePage/blob/master/mainForMobile-4.png)