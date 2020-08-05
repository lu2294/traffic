function PlayControl()
{
	
};

PlayControl.prototype.resetSpeedSet= function (){
    this.speedSet_1.className="plb_speed_box";
    this.speedSet_2.className="plb_speed_box";
    this.speedSet_3.className="plb_speed_box";
    this.speedSet_4.className="plb_speed_box";
    this.speedSet_5.className="plb_speed_box";
}
PlayControl.prototype.updatePlayState = function(){
    if(this.simcol.isPause){
        this.play.className="plb_play";
    }else{
        this.play.className="plb_pause";
    }
}

PlayControl.prototype.init= function (simCol){
    //视频
    var that=this;
    this.simcol=simCol;
    //box
    this.box=document.getElementById("plb_box");
    //按钮
    this.play=document.getElementById("plb_play");
    //进度条
    this.progress=document.getElementById("plb_progress");
    //进度色，灰色的部分
    this.bar=document.getElementById("plb_bar");
    //进度条按钮
    this.control=document.getElementById("plb_control");
    this.speedSet_1 =document.getElementById("plb_speed_1");
    this.speedSet_2 =document.getElementById("plb_speed_2");
    this.speedSet_3 =document.getElementById("plb_speed_3");
    this.speedSet_4 =document.getElementById("plb_speed_4");
    this.speedSet_5 =document.getElementById("plb_speed_5");

    this.plb_palytime =document.getElementById("plb_playtime_text");
    //全屏
    this.full=document.getElementById("plb_full");


   
    this.play.onclick=function(){
        that.simcol.isPause=!that.simcol.isPause;
        that.updatePlayState();
    }
    //灰色和控制按钮与video播放进度一致
    this.simcol.setTimeUpdateListener(function(playTime){
        let datsStr = DateTimeUtil.date2StrDisplay(new Date(playTime));
        that.plb_palytime.textContent=datsStr;
        let tPlayedTime=that.simcol.getPlayedTime()/1000;
        let tMaxTime=that.simcol.maxDuringTime/1000;

        //console.log(playTime);
        var scales=tPlayedTime/tMaxTime;
        that.bar.style.width=that.progress.offsetWidth*scales+"px";
        that.control.style.left=that.progress.offsetWidth*scales+"px";

    });
   
    //通过控制control来控制播放进度
    this.control.onmousedown=function(e){
        that.simcol.pause();
       
        that.updatePlayState();
      
        document.onmousemove=function(e){
            var leftv=e.clientX-that.progress.offsetLeft-5;
          
            if(leftv<=0){
              leftv=0;
            }
           
            if(leftv>=that.progress.offsetWidth){
             leftv=that.progress.offsetWidth;
            }
            that.control.style.left=leftv+"px";
        }

        document.onmouseup=function(){
      
            var scales=that.control.offsetLeft/that.progress.offsetWidth;
            
            let newTime=that.simcol.maxDuringTime*scales;
            that.simcol.setPlayOffsetTime(newTime);
            that.simcol.clearData();
            
            that.simcol.resume();
            that.updatePlayState();
            document.onmousedown=null;
            document.onmousemove=null;
            document.onmouseup=null;
        
         }
    }
    
    //速度变换
    this.speedSet_1.addEventListener("click",function(){
        that.simcol.replaySpeed=1;
        that.resetSpeedSet();
        this.className="plb_speed_selector";
    });
     //速度变换
    this.speedSet_2.addEventListener("click",function(){
        that.simcol.replaySpeed=2;
        that.resetSpeedSet();
        this.className="plb_speed_selector";
    });
     //速度变换
     this.speedSet_3.addEventListener("click",function(){
        that.simcol.replaySpeed=3;
        that.resetSpeedSet();
        this.className="plb_speed_selector";
    });
     //速度变换
     this.speedSet_4.addEventListener("click",function(){
        that.simcol.replaySpeed=4;
        that.resetSpeedSet();
        this.className="plb_speed_selector";
    });
     //速度变换
     this.speedSet_5.addEventListener("click",function(){
        that.simcol.replaySpeed=5;
        that.resetSpeedSet();
        this.className="plb_speed_selector";
    });
   
    //全屏切换
    this.full.addEventListener("click",function(){
        if ((document.fullScreenElement !== undefined && document.fullScreenElement === null)
        || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null)
        || (document.mozFullScreen !== undefined && !document.mozFullScreen)
        || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    },false)
   
}