/**
 * Created by lhy on 2018/5/4.
 */
//经过测试从IE5开始IE浏览器就支持XMLHttpRequest对象
function createXHR(){
    try{
       return new XMLHttpRequest();
    }catch (e){

    }
}
var xhr=createXHR();
xhr.open("get","",false);
xhr.send(null);
xhr.onreadystatechange=function(){
    if(xhr.readyState==4){
        if((xhr.status<=200 && xhr.status<300)|| xhr.status==304){

        }else{
            alert('unsuccessful'+xhr.status);
        }
    }
};