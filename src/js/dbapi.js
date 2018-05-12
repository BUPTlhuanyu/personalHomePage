/**
 * Created by lhy on 2018/5/1.
 */

var data=null,db=null;


/*
跨域:Jsonp （豆瓣的这个api不支持websocket，服务器有拦截）
*/
function josnp(){
    //josnp获取豆瓣电影正在热映的json数据
    var script = document.createElement('script');
    script.type = 'text/javascript';

    // 传参并指定回调执行函数为onBack
    script.src = 'https://api.douban.com/v2/movie/in_theaters?callback=onBack';
    document.head.appendChild(script);
}
// 回调执行函数,异步执行函数在全局作用域下调用所以定义在全局
function onBack(res) {
    data=res;
    //对数据进行处理，去除{}里面的字符串内容
    showImg(data);
}


//逐个appendchild
// var imageArr=[];
// function showImg(data){
//     var date=new Date();
//     var movLens=data.subjects.length;
//     for(var i=0;i<movLens;i++){
//         imageArr[i] = document.createElement('img');
//         //一开始为了解决chrome和firefox浏览器加载http资源受限的情况，由于通过https获取的src自动变为https，所以这里不再需要手动添加s了
//         // var imgSrc=addHttps(data.subjects[i].images.small,4,'s');
//         imageArr[i].src=data.subjects[i].images.small;
//         imageArr[i].style.maxHeight="377px";
//         imageArr[i].onerror=function(event){
//             //由于get不到图片，所以需要给用户提醒一下，哪些失败了
//             event.target.style.display="none";
//         };
//         db.appendChild(imageArr[i]);
//     }
//      console.log(new Date() - date);
// }

// 利用DocumentFragment，然后append
function showImg(data){
    var fragment=document.createDocumentFragment(),
        movLens=data.subjects.length,
        images=null;
    for(var i=0;i<movLens;i++){
        images = document.createElement('img');
        //一开始为了解决chrome和firefox浏览器加载http资源受限的情况，由于通过https获取的src自动变为https，所以这里不再需要手动添加s了
        // var imgSrc=addHttps(data.subjects[i].images.small,4,'s');
        images.src=data.subjects[i].images.small;
        //虽然这里只修改一个样式，但是还是应该养成良好的习惯：利用DOM2级样式中style特性下的cssText属性，一次修改多个样式，只需一次回流和重绘
        // images.style.maxHeight="377px";
        images.style.cssText +=";max-height:377px";
        images.onerror=function(event){
            //由于get不到图片，所以需要给用户提醒一下，哪些失败了
            event.target.style.display="none";
        };
        fragment.appendChild(images);
    }
    db.appendChild(fragment);
}

window.onload=function(){
    db=document.getElementById('db-cont');
    josnp();
};

