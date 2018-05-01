/**
 * Created by lhy on 2018/5/1.
 */


var data=null,db=null;
var imageArr=[];
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

//一开始试图将每个img的src变为https，由于通过https获取的src自动变为https，所以这里不再需要手动添加s了
// function trim(str){ //删除左边的空格
//     return str.replace(/(^\s*)|(\s*$)/g, "");
// }
//
// //给字符串str指定位置position添加字符串str2
// function addHttps(str1,position,str2){
//     trim(str1);
//     var reg=new RegExp("\(\.\{"+position+"\}\)");
//     str2='$1'+str2;
//     return str1.replace(reg, str2);
// }

function showImg(data){
    var movLens=data.subjects.length;
    for(var i=0;i<movLens;i++){
        imageArr[i] = document.createElement('img');
        //一开始为了解决chrome和firefox浏览器加载http资源受限的情况，由于通过https获取的src自动变为https，所以这里不再需要手动添加s了
        // var imgSrc=addHttps(data.subjects[i].images.small,4,'s');
        imageArr[i].src=data.subjects[i].images.small;
        imageArr[i].style.maxHeight="377px";
        imageArr[i].onerror=function(event){
            //由于get不到图片，所以需要给用户提醒一下，哪些失败了
            event.target.style.display="none";
        };
        db.appendChild(imageArr[i]);
    }
}
window.onload=function(){
    db=document.getElementById('db-cont');
    josnp();
};

