var playerObj = null;

$(function(){
    playerObj = createPlayer(function(player){
      playerObj.on('ready',function(){
        console.log('ready可以调用播放器的方法了');
      });

      playerObj.on('play',function(){
        console.log('开始播放(play)');
      });

      playerObj.on('pause',function(){
         console.log('暂停播放(pause)');
       });

      playerObj.on('error',function(){
         console.log('播放错误(error)');
       });
    });
})


function handleMeta(result,success)
{
  var resultData = {
     Code:  1,
     Msg:  "OK",
     Content:[]
  };
  
  if(!result || result.status != 200 || !result.data)
  {
     console.log('获取结构化数据出错');
     success(resultData);
     return;
  }
  else
  {
    if(result.data.length == 0)
    {
      console.log('没有结构化数据');
      success(resultData);
    }
    else
    {
      success({
         Code:  0,
         Msg:  "OK",
         Content:result.data
      });
    }
    
  }
}

function getMeta(data)
{
    var deviceId = '1234488444444444';
    data.stream = deviceId;
    $.ajax({
        type: "post",
        url: 'http://172.19.62.102:9090/apiBus/getMeta',
        data: data,
        success: function (result) {
          console.log(result);
          $('.data-loading').hide();
          handleMeta(result,success);
        },
        error:function(){
          console.log('获取结构化数据出错');
          var resultData = {
             Code:  1,
             Msg:  "OK",
             Content:[]
          };
          success(resultData);
       }
      });
}

function generateSoruce(deviceId)
{
  var host ='qt1.alivecdn.com',
    port = "8084",
    app = 'citybrain',
    hlsOffset = 150;
  var source = "http://" + host + ":"+ port + "/" + app + "/" + deviceId + '.m3u8';
  source = source + "?lhs_offset_unix_s_0="+hlsOffset + '&st=' + new Date().valueOf();
  return source;
}

function createPlayer(source)
{
    if(playerObj)
    {
        playerObj.dispose();
        $('#J_prismPlayer').empty();
        playerObj = null;
    }
    var deviceId = '1234488444444444',
        videoUrl = generateSoruce(deviceId); //deviceId
    
    return new Aliplayer({
        id: "J_prismPlayer",
         autoplay: true,
         isLive:true,
         playsinline:true,
         width:"100%",
         height:"100%",
         controlBarVisibility:"hover",
         useH5Prism:true, //启用H5播放器
         useFlashPrism:false,
         useHlsPluginForSafari:true,
         source:'http://common.qupai.me/player/qupai.mp4',
         trackLog:false,
         ai:{
              label:true,
              meta:{
                getMeta:function(data,success,error){
                  getMeta(data,success,error);
                }
              },
              displayAttrs:{
                header:'姓名',
                证件号码:"text",
                性别:"text",
                年龄:"text"
              }
          }     
      }, (player)=>{
         player.on('ready',()=>{
         });
    });
}
