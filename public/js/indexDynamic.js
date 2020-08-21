var playerObj = null;
var timeoutHandler = "";
var errroHandled = false;
var queryParams = {};

$(function(){
  $('.data-loading').hide();
  getQueryParams();
  if(!validateParams())
  {
    return;
  }
  var flvIsReady = false,
  hlsIsReady = false,
  shiftUrlIsReady = false;
  showError("正在获取播放地址......");
  getVideoUrl('flv',function(data){
    flvIsReady = true;
    queryParams.videoUrl = data.url;
    func();
  });
  getVideoUrl('hls',function(data){
    queryParams.liveShiftSource = data.url;
    hlsIsReady = true;
    func();
  });
  getLiveShiftQueryUrl(function(data){
    queryParams.liveTimeShiftUrl = data.url + "&format=ts&lhs_start_unix_s_0=1526904775&lhs_end_unix_s_0=1526905375";
    shiftUrlIsReady = true;
    func();
  })
  var func = function()
  {
    if(flvIsReady && hlsIsReady && shiftUrlIsReady)
    {
      create();
    }
  }
})

var create = function(){
    createPlayer(function(player){
      playerObj = player;
      if(playerObj)
      {
        if(window.parent && window.parent.playerCreatedCallback)
        {
          window.parent.playerCreatedCallback(playerObj);
        }
        playerObj.on('error',function(){
            if(!errroHandled)
            {
              dispose();
              var frame = findFrame();
              if(frame)
              {
                $(frame).attr('src',locationUrl);
              }
              else
              {
                create();
              }
            }
            errroHandled = true;
            setTimeout(function(){
              errroHandled = false;
            },15000)
        });
      }
    });
}

var findFrame = function(){
  var frames = $(window.parent.document).find("iframe");
  for(var i=0;i<frames.length;i++)
  {
    var src = $(frames[i]).attr('src');
    if(src)
    {
      src = src.replace('./', "");
    }
    if(src == locationUrl || locationUrl.indexOf(src) > -1)
    {
      return frames[i];
    }
  }
  return "";
}

var dispose = function()
{
  if(playerObj)
  {
    playerObj.dispose();
    $('#J_prismPlayer').empty();
    playerObj = null;
  }
  if(timeoutHandler)
  {
    clearTimeout(timeoutHandler);
    timeoutHandler = null;
  }
}
    
function queryString(url) {
    var a, arr, b, i, search;
    url = decodeURIComponent(url);
    arr = url.split('?');
    if (arr.length !== 2) {
      return {};
    }
    search = arr[1];
    a = search.split('&');
    if (!a) {
      return {};
    }
    b = {};
    i = 0;
    $(a).each(function() {
      var p;
      p = a[i].split('=');
      if (p.length !== 2) {
        i++;
        return;
      }
      b[p[0]] = p[1].replace(/\+/g, " ");
      i++;
    });
    return b;
}

function getQueryParams()
{
  var search = queryString(window.location.href);
    queryParams.videoUrl = "data/newtest_2.mp4",
    queryParams.metaUrl = "data/newtest_2.json",
    queryParams.metaQueryUrl = "http://172.19.62.102:9090/apiBus/getMeta",
    queryParams.deviceId = "",
    queryParams.host = "172.19.61.106";//'qt1.alivecdn.com',"47.98.192.31";
    queryParams.hlsPort = "8900",
    queryParams.flvPort = "8900",
    queryParams.mock = 0,
    queryParams.startDateTime = 0,
    queryParams.hlsOffset = 300,
    queryParams.muted = 0,
    queryParams.vendor = "",
    queryParams.liveTimeShiftUrl = "",
    queryParams.liveShiftSource = "";
    queryParams.quality = "";
    queryParams.enableShift = 0;
    queryParams.enableLabel = 0;
    if(search)
    {
       queryParams.videoUrl = search.videoUrl || queryParams.videoUrl;
       queryParams.metaUrl = search.metaUrl || queryParams.metaUrl;
       queryParams.deviceId = search.deviceId || "";
       queryParams.mock = search.mock || queryParams.mock;
        if(queryParams.mock != 1)
        {
          queryParams.startDateTime = search.startDateTime || 0;
        }
       queryParams.hlsOffset = search.hlsOffset || queryParams.hlsOffset;
       queryParams.metaQueryUrl = search.metaQueryUrl || queryParams.metaQueryUrl;
       queryParams.host = search.host || queryParams.host;
       queryParams.app = search.app || queryParams.app;
       queryParams.hlsPort = search.hlsPort || queryParams.hlsPort;
       queryParams.flvPort = search.flvPort || queryParams.flvPort;
       queryParams.muted = search.muted || queryParams.muted;
       queryParams.vendor = search.vendor || queryParams.vendor;
       queryParams.quality = search.quality || queryParams.quality;
       queryParams.enableShift = search.enableShift || queryParams.enableShift;
       queryParams.enableLabel = search.enableLabel || queryParams.enableLabel;
    }
}

function validateParams()
{
    if(queryParams.mock)
    {
      return true;
    }
    if(queryParams.deviceId=="")
    {
       showError("deviceId参数不能为空");
       return false;
    }
    if(queryParams.metaQueryUrl=="")
    {
       showError("结构化查询URL(metaQueryUrl)不能为空");
       return false;
    }
    if(queryParams.host=="")
    {
       showError("地址调度host不能为空");
       return false;
    }
    return true;
}

function showError(err)
{
    $('.data-loading').hide();
    $('.error').show();
    $('.error p').html(err);
}

var convertResult = function(body)
{
  data = JSON.parse(data);
  if(data.statusCode == "200" && data.body)
  {
    var body = JSON.parse(data.body);
    return {
       Code:  0,
       Msg:  "OK",
       Content:body.data
    };
  }
  else
  {
    console.log(data);
    return {
       Code:  data.statusCode !=0 ? data.statusCode: 1,
       Msg:  data.errorMessage,
       Content:[]
     };
  }
}

function handleMeta(result,success)
{
  var resultData = {
     Code:  1,
     Msg:  "OK",
     Content:[]
  };
  
  if(!result || result.status != 200 || !result.data)
  {
     success(resultData);
     return;
  }
  else
  {
    if(result.data.length == 0)
    {
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

function getVideoUrl(protocol, callback)
{
  var clientIp = "";
  var data = {
    vendor:queryParams.vendor,
    protocol:protocol,
    clientIp:clientIp||""
  };
  var port = (protocol == 'hls' ? queryParams.hlsPort: queryParams.flvPort);
  var url = 'http://' + queryParams.host + (port?":" + port:"") + "/v2/play/device/"+queryParams.deviceId  + (queryParams.quality?"?type="+queryParams.quality:"");
    $.ajax({
        type: "post",
        url: url,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(data),
        success: function (result) {
          if(result.error)
          {
            showError("获取"+protocol + "播放地址失败</br>" + result.error);
          }
          else
          {
            $('.data-loading').hide();
            callback(result);
          }
        },
        error:function(error){
          var msg = error && error.responseText ? error.responseText : url;
          showError("获取"+protocol + "播放地址失败</br>" + msg);
       }
      });
}

function getLiveShiftQueryUrl(callback)
{
  var clientIp = "";
  var data = {
    vendor:queryParams.vendor,
    protocol:'hls',
    clientIp:clientIp || ""
  };

  var url = 'http://' + queryParams.host + (queryParams.hlsPort?":" + queryParams.hlsPort:"") + "/v2/query/device/"+queryParams.deviceId + (queryParams.quality?"?type="+queryParams.quality:"");
    $.ajax({
        type: "post",
        url: url,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(data),
        success: function (result) {
          if(result.error)
          {
            showError("获取直播时间轴查询地址失败</br>" + result.error);
          }
          else
          {
            $('.data-loading').hide();
            callback(result);
          }
        },
        error:function(error){
          var msg = error && error.responseText ? error.responseText : url;
          showError("获取直播时间轴查询地址失败</br>" + msg);
       }
      });
}

function getMeta(data,success,error)
{
    data.stream = queryParams.deviceId;
    $.ajax({
        type: "post",
        url: queryParams.metaQueryUrl,
        data: data,
        success: function (result) {
          $('.data-loading').hide();
          handleMeta(result,success);
        },
        error:function(){
          var resultData = {
             Code:  1,
             Msg:  "OK",
             Content:[]
          };
          success(resultData);
       }
      });
}

var getFormateDate = function(timestamps) {
  var date = new Date(timestamps),
      year = date.getFullYear(),
      month = date.getMonth() + 1;
  if (month <= 9) {
    month = '0' + month;
  }
  let day = date.getDate();
  if (day <= 9) {
    day = '0' + day; 
  }
  let hour = date.getHours();
  if (hour <= 9) {
    hour = '0' + hour;
  }
  let minute = date.getMinutes();
  if (minute <= 9) {
    minute = '0' + minute;
  }
  let second = date.getSeconds();
  if (second <= 9) {
    second = '0' + second;
  }
  return year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
}

var getFacePic = function(value)
{
  console.log(value);
}


function createPlayer(readyCallback)
{
    if(playerObj)
    {
        playerObj.dispose();
        $('#J_prismPlayer').empty();
        playerObj = null;
    }

    
    var option = {
    id: "J_prismPlayer",
         autoplay: true,
         isLive:true,
         source: queryParams.videoUrl,
         liveTimeShiftUrl:queryParams.enableShift == 1 ? queryParams.liveTimeShiftUrl : "",
         liveShiftSource:queryParams.liveShiftSource,
         liveStartTime:getFormateDate(new Date(new Date().getTime() - 2 * 60 * 60 * 1000)),
         liveOverTime:getFormateDate(new Date(new Date().getTime() + 2 * 60 * 60 * 1000)),
         playsinline:true,
         width:"100%",
         height:"100%",
         controlBarVisibility:"hover",
         useH5Prism:true, //启用H5播放器
         useFlashPrism:false,
         useHlsPluginForSafari:true,
         source: queryParams.videoUrl,
         trackLog:false,
         maxMaxBufferLength:10,
         maxBufferLength:10,
         maxBufferSize:20*1000,
         enableStashBufferForFlv : true, //是否启用播放缓存，只在直播下起作用
         stashInitialSizeForFlv : 32,
         hlsFragChangedEmpty:true,
         recreatePlayer:function(){
           create();
         },
         skinLayout: [ // false | Array, 播放器使用的ui组件，非必填，不传使用默认，传false或[]整体隐藏
            {name: 'bigPlayButton', align: 'blabs', x: 30, y: 80},
            {name: 'H5Loading', align: 'cc'},
            {name: 'errorDisplay', align: 'tlabs', x: 0, y: 0},
            { name: 'infoDisplay' },
            {name: 'tooltip', align: 'blabs', x: 0, y: 56},
            {name: 'controlBar',align: 'blabs',x: 0,y: 0,children: [
                {name: "progress", align: "blabs", x: 0, y: 44},
                {name: "playButton", align: "tl", x: 15, y: 12},
                {name:"liveDisplay", align:"tl", x: 15, y:6}
              ]
            }
          ],
         ai:{
              label:queryParams.enableLabel==1,
              waitMetaDataTime:0,
              meta:{
                getMeta:function(data,success,error){
                  getMeta(data,success,error);
                }
              },
              displayAttrs:{
                header:'姓名',
                证件号码:"text",
                性别:"text",
                年龄:"text",
                人脸大图:getFacePic,
                人脸小图:getFacePic,
                颜色: 'text',
                类型: 'text',
                位置: 'text',
                品牌: 'text',
                发型: 'text',
                运动: 'text',
                姿态: 'text',
                上衣颜色: 'text',
                上衣款式: 'text',
                下衣颜色: 'text',
                下衣款式: 'text'
              }
          }     
    };
    if(queryParams.mock == 1)
    {
      $('.data-loading').show();
      $.getJSON(queryParams.metaUrl,function(data){
      $('.data-loading').hide();
         option.ai.boxes = data;
         return new Aliplayer(option, (player)=>{
            player.on('ready',()=>{
              if(muted == 1)
              {
                player.mute();
              }
           });
           readyCallback(player);
         });
      })
    }
    else
    {
        return new Aliplayer(option, (player)=>{
           player.on('ready',()=>{
              if(muted == 1)
              {
                player.mute();
              }
           });
           readyCallback(player);
        });
    }
  }
