一个建设中的个人网站
====

[主页](http://htmlpreview.github.io/?https://github.com/BUPTlhuanyu/personalHomePage/blob/master/client/src/index.html)

#####
    前端+后台项目见develop_lhy分支
    操作步骤：
        第一步：OS系统下：
                cd Applications/mongodb/bin
                ./mongod
                开启Mongodb。
        第二步：npm run dev
               后台服务开启,数据库连接
        第三步：浏览器打开client/src/index.html

####
    前端页面：打算写两个版本，原生js版本以及vue版本或者react版本
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
+   图片懒加载不使用函数防抖的原因，函数防抖原理：监听事件，事件一旦触发就执行闭包返回的函数也就是回调函数，如果在定时器设定的延时时间内触发了这个事件，回调函数执行并且清楚先前
    的定时器，重新设定定时器，如果这里一直不停的滚动屏幕，那么定时器的函数永远不会执行，后面的图片一直都不会无法赋值真正的src，所有这里需要用到函数节流，函数节流相当于函数防抖
    的一种增强版，通过date对象，设定一个时间，对比事件触发的时候两次事件发生的时间间隔如果超过了设定的时间，那么图片加载函数一定执行一次，也就是函数节流一定会得到执行，但是
    要满足前面提到的两次事件触发的间隔满足条件。


####
    后端：nodejs + MongoDB/MySQL + express
    开启数据库连接操作：
    OS系统下：
    cd Applications/mongodb/bin
    ./mongod

+   创建后端目录结构，安装npm包
+   后台解决跨域问题：routes/index.js会将
    ```
        app => {
            app.use('/test', test);
        }
    ```
    export到app.js中作为app的中间件，其中test函数就是一个中间件函数，并且'/test'表示当请求的路径是/test的时候，就会加载中间件test。
    test函数为：
    ```
        const router = express.Router()
        router.get('test_v1', function (req, res) {
            res.send('GET request to the homepage');
        });
    ```
    如果请求的路径是/test/test_v1则执行后面对的函数返回GET...，如果代码非常简单，完全可以 app.get('/',....),如果路由比较复杂，使用 express.Router() 更合适。
    跨域方法：后端写法
    ```
        app.all('*', (req, res, next) => {
            res.header("Access-Control-Allow-Origin", req.headers.Origin || req.headers.origin || 'https://localhost');
            if (req.method == 'OPTIONS') {
                res.send(200);
            } else {
                next();
            }
        });
    ```
    所有路径都会匹配这个中间件。
+   完成book接口：只支持get请求
    第一步：创建mongodb文件夹，并且创建db.js文件，利用mongoose连接数据库。
    第二步：在后台入口文件app.js文件中引入db.js文件中的db，此时开始连接数据库，并监听一系列的连接事件
    第三步：接口编写，数据录入数据库
           文件夹介绍: InitData文件夹存放初始数据，
                      models用于存放数据库相关操作方法的脚本文件，
                      controller文件夹用于调用models中的方法获取数据，并对数据进行一些筛选或者其他操作，并将数据返回给响应res
                      具体思路参考MVC



#####
     gitnub.io的在线预览的经验：github不是CDN静态资源缓存代理所以想要动态添加外部css文件或者js文件是行不通的，所以这里静态导入了所有需要的css



![图片](https://github.com/BUPTlhuanyu/personalHomePage/blob/master/mainForPC-1.png)
![图片](https://github.com/BUPTlhuanyu/personalHomePage/blob/master/mainForPC-2.png)
![图片](https://github.com/BUPTlhuanyu/personalHomePage/blob/master/liveForPC-1.png)
![图片](https://github.com/BUPTlhuanyu/personalHomePage/blob/master/mainForMobile-1.png)
![图片](https://github.com/BUPTlhuanyu/personalHomePage/blob/master/mainForMobile-2.png)
![图片](https://github.com/BUPTlhuanyu/personalHomePage/blob/master/mainForMobile-3.png)
![图片](https://github.com/BUPTlhuanyu/personalHomePage/blob/master/mainForMobile-4.png)