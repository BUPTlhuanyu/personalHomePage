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
    script.src = 'http://api.douban.com/v2/movie/in_theaters?callback=onBack';
    document.head.appendChild(script);
}

// 回调执行函数,异步执行函数在全局作用域下调用所以定义在全局
function onBack(res) {
    data=res;
    alert(JSON.stringify(data));
    showImg(data);
}

function showImg(data){
    var movLens=data.subjects.length;
    for(var i=0;i<movLens;i++){
        imageArr[i] = document.createElement('img');
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

