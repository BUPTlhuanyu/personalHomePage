/**
 * Created by lhy on 2018/5/4.
 */
//经过测试从IE5开始IE浏览器就支持XMLHttpRequest对象
function getAjax(url,fn){
    function createXHR(){
        try{
            return new XMLHttpRequest();
        }catch (e){

        }
    }
    var xhr=createXHR();
    xhr.open("get",url);
    xhr.send(null);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if((xhr.status<=200 && xhr.status<300)|| xhr.status==304){
                var data=JSON.parse(xhr.responseText);
                fn(data);
            }else{
                alert('unsuccessful'+xhr.status);
            }
        }
    };
}