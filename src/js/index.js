window.onload=function(){
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
            musicImg.style.cssText=";background:url("+songPic+")no-repeat center;background-size:cover;";
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


    /*canvas*/
    var myCanvas = document.getElementById('myCanvas');
    // 写字：也可以创建一个类与下面的canvas类似
    // 先预设一个画布
    var cache = document.createElement('canvas');
    cache.width=myCanvas.clientWidth;
    cache.height=myCanvas.clientHeight;
    var ShapeBuilder={
        //初始化字的对齐方式等，我认为middle 与 center比较好计算一点
        init:function(width, height){
            this.width = width;
            this.height = height;
            this.ctx = cache.getContext('2d');
            //画布(0,0)位置在字的中心，所以用middle以中线为基准，center字居中
            this.ctx.textBaseline = 'middle';
            this.ctx.textAlign = 'center';
        },
        //获取位置之前必须先要写入文字。 这里的size=40是默认值
        write:function(words, x, y, size){
            //清除之前写的字。
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.font='bold '+size+'px'+' Arial';
            this.ctx.fillText(words, x, y);
            //记录当前文字的位置，方便计算获取像素的区域
            this.x = x;
            this.y = y;
            this.size = size;
            this.length = words.length;
        },
        getPositions:function(){
            //因为imgData数据非常的大，所以尽可能的缩小获取数据的范围。
            var xStart = this.x - (this.length / 2) * this.size,
                xEnd = this.x + (this.length / 2) * this.size,
                yStart = this.y - this.size / 2,
                yEnd = this.y + this.size / 2,
                //getImageData(起点x, 起点y, 宽度, 高度);data一维数组中存的是每个像素的RGBA的值
                //例如data[0]-data[3]是一个像素的R,G,B,A的值；A范围是0-255,0表示透明的，大于0表示可见
                //对文字抽取的像素点的信息存储在getImageData返回的imageData对象的data属性中
                data = this.ctx.getImageData(xStart, yStart, this.size * this.length, this.size).data;
            //即对文字抽取的像素点进行抽样的间隔，也就是每gap个像素取一个像素
            var gap = 1;
            var positions = [], x = xStart, y = yStart;
            for(var i = 0;i < data.length; i += 4 * gap){
                //判断这个像素是否可见，如果可见存入文字微粒化后的数组中，否则丢弃
                if(data[i+3] > 0){
                    positions.push({x:x, y:y});
                }
                //抽样取像素点
                x += gap;
                //如果当前x大于xEnd说明到了下一行，此时x从头开始，y变成下一行，增加抽样间隔
                if(x >= xEnd){
                    x = xStart;
                    y += gap;
                    i += (gap - 1) * 4 * (xEnd - xStart);
                }
            }
            return positions;
        }
    };

    function Particle(x, y, size, color, xEnd, yEnd, e){
        e=e||60;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color ||  'hsla('+Math.random() * 360+', 90%, 65%, 1);';
        this.xEnd = xEnd;
        this.yEnd = yEnd;

        //经过e帧之后到达目标地点
        this.e = e;
        //计算每一帧走过的距离
        this.dx = (xEnd - x) / e;
        this.dy = (yEnd - y) / e;
    }
    Particle.prototype={
        constructor:Particle,
        go:function(){
            //到目的后保持不动 （其实这里也可以搞点事情的）
            if(--this.e <= 0) {
                this.x = this.xEnd;
                this.y = this.yEnd;
                return ;
            }
            this.x += this.dx;
            this.y += this.dy;
        },
        render:function(ctx){
            this.go();
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.size,0,360,false);
            ctx.fillStyle = this.color;
            ctx.fill();//画实心圆
            ctx.closePath();
            return true;
        }
    };
    //开始绘制
    var canvas = {
        init:function(){
            //设置一些属性
            this.setProperty();
            //创建微粒
            this.createParticles();
            //canvas的循环
            this.loop();
        },
        setProperty:function(){
            //创建渲染上下文
            this.ctx = myCanvas.getContext('2d');
            //给渲染上下文设置尺寸
            this.width = myCanvas.clientWidth;
            this.height = myCanvas.clientHeight;
            //
            this.particles = [];
        },
        createParticles:function(){
            //dots已经获取到了字的坐标点
            //每一个微粒的目标地点都是dots的坐标
            //每一个微粒都随机出生在画布的某个位置
            for(var i = 0; i < dots.length; i++){
                var color=~~(Math.random()*100);
                this.particles.push(
                    new Particle(Math.random() * this.width, Math.random() * this.height,
                        1,'rgba(255,255,255,1)',
                        dots[i].x,dots[i].y ,30)
                );
            }
        },
        loop:function(){
            //每一帧清除画布，然后再渲染微粒
            requestAnimationFrame(this.loop.bind(this));
            this.ctx.clearRect(0, 0, this.width, this.height);
            for(var i = 0; i < this.particles.length; i++){
                this.particles[i].render(this.ctx);
            }
        }
    };
    //粒子目标文字 words;
    var words="欢迎来到我的主页";
    //给预设的画布初始化，创建渲染上下文,给渲染上下文设置高宽
    ShapeBuilder.init(cache.width,cache.height);
    //给粒子添加文字内容,文字所在的位置坐标
    ShapeBuilder.write(words,cache.width/2,cache.height/2,40);
    //获取文字内容的坐标
    var dots=ShapeBuilder.getPositions();
    canvas.init();
};