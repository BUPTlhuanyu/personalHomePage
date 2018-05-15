window.onload=function(){
    (function(){
        /*弹框*/
        var navBarActive=document.getElementsByClassName('nav-bar-active')[0];
        var navActive=document.getElementsByClassName('nav-active')[0];
        navBarActive.onclick = function ()
        {
            var style = navActive.style;
            style.display = style.display == "block" ? "none" : "block";
        };
        /*获取音乐资源*/
        var audio=document.getElementsByTagName('audio')[0];
        var playControl=document.getElementsByClassName('stop-control')[0];
        var nextSongControl=document.getElementsByClassName("audio-left")[0];
        var volume=document.getElementById('volume');
        var songDetail=document.getElementById('songName');
        var audioCurTime=document.getElementById('audioCurTime');
        var audioTotalTime=document.getElementById('audioTotalTime');
        var musicImg=document.getElementById('music-img');
        var progressBarBg=document.getElementById('progressBarBg');
        var progressDot=document.getElementById('progressDot');
        var progressBar=document.getElementById('progressBar');
        var musicUrl="../source/JSON/musicJSON.json";
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
        getAjax(musicUrl,music);
        function music(musicData){
            var data=musicData.result.tracks,len=data.length,stopState=1,
                originUrl="http://music.163.com/song/media/outer/url",
                volumeValue=1;
            function init(){
                //getCurrentData
                var currentData=data[parseInt(Math.random()*(len-1))],
                    currentSongId=currentData.id,
                    songName=currentData.name,
                    singerName=currentData.artists[0].name,
                    songPic=currentData.album.picUrl;
                //loadMusic
                audio.src=getSongUrl(originUrl,'id',currentSongId);
                //loadPic
                musicImg.style.cssText=";background:url("+songPic+")no-repeat center;";
                //showDetail
                songDetail.textContent=singerName+":"+songName;


            }
            function formatTime(minutes,seconds){
                minutes=minutes<10?('0'+minutes):(minutes);
                seconds=seconds<10?('0'+seconds):(seconds);
                return minutes+":"+seconds;
            }
            function showTotalTime(){
                //showTotalTime
                var totalMinutes=parseInt(audio.duration/60);
                var totalSeconds=Math.round(audio.duration-60*totalMinutes);
                audioTotalTime.textContent=formatTime(totalMinutes,totalSeconds);
            }
            function showCurrentTime(){
                //showCurrentTime
                var currentMinutes=parseInt(audio.currentTime/60);
                var currentSeconds=Math.round(audio.currentTime-60*currentMinutes);
                audioCurTime.textContent=formatTime(currentMinutes,currentSeconds);
                //progress
                var pos=progressBarBg.clientWidth*audio.currentTime/audio.duration;
                progressBar.style.cssText="width:"+pos+"px";
                progressDot.style.cssText="left:"+pos+"px";
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
                init();
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
            function autoNext(){
                nextSong();
            }
            function timeSelect(event){
                var eventPos=event.offsetX,
                    totalWidth=progressBarBg.clientWidth;
                //offsetX得到的鼠标位置会出现为-1的情况
                eventPos=eventPos<0?0:eventPos;
                audio.currentTime=audio.duration*eventPos/totalWidth;

            }
            init();
            audio.addEventListener("timeupdate",showCurrentTime);
            audio.addEventListener("canplay",showTotalTime);
            audio.addEventListener("ended",autoNext);
            playControl.addEventListener("click",Change);
            nextSongControl.addEventListener("click",nextSong);
            volume.addEventListener("click",volumeChange);
            progressBarBg.addEventListener("click",timeSelect);
        }
        /*获取图书资源*/
        var bookUrl="../source/JSON/myBooks.json";
        var asideBar=document.getElementsByClassName("aside-bar")[0];
        var bookKeys=document.getElementById('keys');
        var maskStated=false,getStated=false;
        getAjax(bookUrl,book);
        function book(bookData){
            var data=bookData.books,fragment=document.createDocumentFragment(),
                bookLens=data.length,
                items=null;
            function showKeys(){
                maskStated=true;
                mdOverlay.style.cssText="display: block;";
                mask.style.cssText="display: block;";
                if(!getStated){
                    var items=null,keyFragment=document.createDocumentFragment();
                    for(var i=0;i<bookLens;i++){
                        items = document.createElement('li');
                        items.textContent=data[i].name+':'+data[i].key;
                        items.onerror=function(event){
                            event.target.style.display="none";
                        };
                        keyFragment.appendChild(items);
                    }
                    bookKeys.appendChild(keyFragment);
                    getStated=!getStated;
                }
            }
            for(var i=0;i<bookLens;i++){
                items = document.createElement('a');
                items.href=data[i].bookUrl;
                items.target="blank";
                items.textContent=data[i].name;
                items.onerror=function(event){
                    event.target.style.display="none";
                };
                fragment.appendChild(items);
            }
            items = document.createElement('span');
            items.addEventListener("click",showKeys);
            items.textContent="get keys";
            fragment.appendChild(items);
            asideBar.appendChild(fragment);
        }
        function closeMask(){
            if(maskStated){
                mdOverlay.style.cssText="display: none;";
                mask.style.cssText="display: none;";
            }
        }
        var maskClose=document.getElementById('mask-close');
        var mdOverlay=document.getElementsByClassName('md-overlay')[0];
        var mask=document.getElementById('mask');
        maskClose.addEventListener("click",closeMask);
    })();
};