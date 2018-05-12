//经过测试从IE5开始IE浏览器就支持XMLHttpRequest对象
window.onload=function(){
    var audio=document.getElementsByTagName('audio')[0];
    var playControl=document.getElementsByClassName('stop-control')[0];
    var nextSongControl=document.getElementsByClassName("audio-left")[0];
    var volume=document.getElementById('volume');
    var songDetail=document.getElementById('songName');
    function createXHR(){
        try{
            return new XMLHttpRequest();
        }catch (e){

        }
    }
    var xhr=createXHR(),data=null;
    xhr.open("get","../source/JSON/musicJSON.json",true);
    xhr.send(null);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if((xhr.status>=200 && xhr.status<300)|| xhr.status==304){
                data=JSON.parse(xhr.responseText).result.tracks;
                music();
            }else{
                alert('unsuccessful'+xhr.status);
            }
        }
    };
    function music(){
        var len=data.length,stopState=1,
            originUrl="http://music.163.com/song/media/outer/url",
            currentData=data[parseInt(Math.random()*129)],
            currentSongId=currentData.id,
            songName=currentData.name,
            singerName=currentData.artists[0].name,
            volumeValue=1;
        //获取歌曲的ID
        function getSongId(data){
            return data[parseInt(Math.random()*129)].id;
        }
        //获取歌曲的URL
        function getSongUrl(originUrl,name,value){
            var url=originUrl;
            if(url.indexOf("?")==-1){
                url+="?";
            }else{
                url+="&";
            }
            url+=encodeURIComponent(name)+"="+encodeURIComponent(value)+".mp3";
            return url;
        }
        //开始播放，并且更换开始播放按钮的背景图片
        function Change(){
            songDetail.textContent=singerName+":"+songName;
            audio.src=getSongUrl(originUrl,'id',currentSongId);
            if(stopState){
                audio.play();
                playControl.className="play-control";
                stopState=!stopState;
            }else{
                audio.pause();
                playControl.className="stop-control";
                stopState=!stopState;
            }
        }
        function nextSong(){
            currentData=data[parseInt(Math.random()*129)];
            currentSongId=currentData.id;
            songName=currentData.name;
            singerName=currentData.artists[0].name;
            audio.src=getSongUrl(originUrl,'id',currentSongId);
            songDetail.textContent=singerName+":"+songName;
            audio.play();
            playControl.className="play-control";
            stopState=!stopState;
        }
        function volumeChange(){
            volumeValue=volumeValue==0?1:0;
            audio.volume=volumeValue;
            if(volumeValue){
                volume.className="volumeMore";
            }else{
                volume.className="volumeLess";
            }
        }
        playControl.addEventListener("click",Change);
        nextSongControl.addEventListener("click",nextSong);
        volume.addEventListener("click",volumeChange);
    }
};