
var VALID_MIN_TIMEDISTANCE=5000;//两个点有效的最小时间间隔，超过此间隔，则认为轨迹失踪

//ModelUtils
function GLTFUtil()
{
	
};
GLTFUtil.prototype.getMeshObj=function(gltfscene,meshName)
{
	gltfscene.traverse(function (gltf) {
		if(this.findObj!=null)return;
		 if (gltf instanceof THREE.Mesh) {
			 if(gltf.name==meshName)
				{
					//console.log('find cars');
					this.findObj=gltf;
				}
		 
		 }
	}.bind(this));
	return this.findObj;
}

function makeLabelCanvas(baseWidth, size, name,platecolor) {
    const borderSize = 2;
    const ctx = document.createElement('canvas').getContext('2d');
    const font =  `${size}px bold sans-serif`;
    ctx.font = font;
    // measure how long the name will be
    const textWidth = ctx.measureText(name).width;

    const doubleBorderSize = borderSize * 2;
    const width = baseWidth + doubleBorderSize;
    const height = size + doubleBorderSize;
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    // need to set font again after resizing canvas
    ctx.font = font;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
	if(platecolor==0)
	{
		ctx.fillStyle = 'blue';
	}else if(platecolor==1)
	{
		ctx.fillStyle = '#00cc66';
	}else if(platecolor==2)
	{
		ctx.fillStyle = "#ff9900";
	}else if(platecolor==3)
	{
		ctx.fillStyle = 'white';
	}else if(platecolor==4)
	{
		ctx.fillStyle = 'black';
	}
   
    ctx.fillRect(0, 0, width, height);

    // scale to fit but don't stretch
    const scaleFactor = Math.min(1, baseWidth / textWidth);
    ctx.translate(width / 2, height / 2);
	ctx.scale(scaleFactor, 1);
	ctx.fillStyle = 'white';
	if(platecolor==3)
	{
		ctx.fillStyle = 'black';
	}else if(platecolor==2)
	{
		ctx.fillStyle = "black";
	}else if(platecolor==1)
	{
		ctx.fillStyle = "black";
	}
  
    ctx.fillText(name, 0, 0);

    return ctx.canvas;
  }

//dateTimeStr
function DateTimeUtil()
{
	
};


DateTimeUtil.str2Date=function(dateStr)
{
	var dateStr = dateStr.split(',');
	var year =  parseInt(dateStr[0].substr(0,4));
	var month =  parseInt(dateStr[0].substr(4,2));
	var day =  parseInt(dateStr[0].substr(6,2));
	var hour =  parseInt(dateStr[0].substr(8,2));
	var min =  parseInt(dateStr[0].substr(10,2));
	var sec =  parseInt(dateStr[0].substr(12,2));
	var milsec =  parseInt(dateStr[0].substr(14,3));
	return new Date(year,month-1,day,hour,min,sec,milsec);
};

DateTimeUtil.num2Str=function(num,strLen)
{
	var numStr=""+num;
	var l=strLen-numStr.length;
	for( var i=0;i<l;i++){
		numStr="0"+numStr;
	}
	return numStr;

}
DateTimeUtil.date2Str=function(myDate)
{
	var dateStr=DateTimeUtil.num2Str(myDate.getFullYear(),4);
	dateStr = dateStr + DateTimeUtil.num2Str(myDate.getMonth()+1,2); 
	dateStr = dateStr+ DateTimeUtil.num2Str(myDate.getDate(),2);
	dateStr = dateStr+ DateTimeUtil.num2Str(myDate.getHours(),2);
	dateStr = dateStr+ DateTimeUtil.num2Str(myDate.getMinutes(),2);
	dateStr = dateStr+ DateTimeUtil.num2Str(myDate.getSeconds(),2);
	
	return dateStr;
};

DateTimeUtil.date2StrDisplay=function(myDate)
{
	var dateStr=DateTimeUtil.num2Str(myDate.getFullYear(),4);
	dateStr = dateStr+"/";
	dateStr = dateStr + DateTimeUtil.num2Str(myDate.getMonth()+1,2); 
	dateStr = dateStr+"/";
	dateStr = dateStr+ DateTimeUtil.num2Str(myDate.getDate(),2);
	dateStr = dateStr+"  ";
	dateStr = dateStr+ DateTimeUtil.num2Str(myDate.getHours(),2);
	dateStr = dateStr+":";
	dateStr = dateStr+ DateTimeUtil.num2Str(myDate.getMinutes(),2);
	dateStr = dateStr+":";
	dateStr = dateStr+ DateTimeUtil.num2Str(myDate.getSeconds(),2);
	
	return dateStr;
};



function TrackerPoint()
{
	this.gpsTime=0;
	this.x=0;
	this.y=0;
	this.mercatorX=0;
	this.mercatorX=0;
	this.speed=0;
	this.direction=0;
	this.angle=0;
	this.segLength;
};

TrackerPoint.prototype.setWithStr=function(s)
{
	var contentArray = s.split(',');
	this.gpsTime=DateTimeUtil.str2Date(contentArray[0]).getTime();
	this.x=contentArray[1]*1;
	this.y=contentArray[2]*1;
	this.speed==contentArray[3]*1;
	this.angle=contentArray[4]*1;

	var tCoordinate=[this.x,this.y];
	var tMercatorCoordinate = amapgl.MercatorCoordinate.fromLngLat(
		tCoordinate, 0);

	this.mercatorX=tMercatorCoordinate.x;
	this.mercatorY=tMercatorCoordinate.y;

	this.speed=contentArray[3]*1;
	
};

//class CarTraker，存放车辆	全量信息

function CarTracker(){
	this.trPoints = new Array();
	this.carid=null;
	this.plate=null;
	this.plateClass=0;
	this.carType=0;
	this.color=0;
	this.smoothStartPnt=null;
	this.smoothEndPnt=null;
	this.smoothStep=0; //平滑操作的步进
	this.firstFrameTime=0;

};
//增加轨迹点

CarTracker.prototype.addTrackerPoint=function(tp)
{
	var newTP= new TrackerPoint();
	newTP.setWithStr(tp);
	this.trPoints.push(newTP);


	//更新smooth的起终点，步进值复位为0,
	if(this.trPoints.length>2)
	{
		//考虑过去三个点，这样延误<2S
		this.smoothStartPnt=this.trPoints[this.trPoints.length-3];
		this.smoothEndPnt=this.trPoints[this.trPoints.length-2];
		this.smoothStep=0;

	}
	//如果是实时，则客户每辆车只保留最多5个轨迹点
	if(simController.isRealTimePlay){
		
		this.trPoints.splice(0, this.trPoints.length-5);
		
		
	}


};

CarTracker.prototype.getInterPoint= function(gpsTime)
{
	//找到gpsTime最邻近的两个确定点

	
	for(var i=1;i<this.trPoints.length;i++)
	{
		var curPoint=this.trPoints[i];
		//if(curPoint.gpsTime>=gpsTime && curPoint.gpsTime-gpsTime<VALID_MIN_TIMEDISTANCE)
		if(curPoint.gpsTime>=gpsTime)
		{
			var prePoint=this.trPoints[i-1];
			
			if(prePoint.gpsTime>gpsTime)return null;
				if(curPoint.gpsTime==prePoint.gpsTime)return prePoint;
				var retPoint=new TrackerPoint();
				var d1=(gpsTime-prePoint.gpsTime);
			
				var d2=curPoint.gpsTime-prePoint.gpsTime;
				var delta=d1/d2;		
				
				retPoint.mercatorX=prePoint.mercatorX+(curPoint.mercatorX-prePoint.mercatorX)*delta;
				retPoint.mercatorY=prePoint.mercatorY+(curPoint.mercatorY-prePoint.mercatorY)*delta;
				retPoint.gpsTime=gpsTime;
				retPoint.speed=curPoint.speed;

				
				var aDir= new THREE.Vector2( prePoint.mercatorX-curPoint.mercatorX, prePoint.mercatorY-curPoint.mercatorY );
				var tAngle=aDir.angle()*180/Math.PI+180;
				/*if(curPoint.speed<1){
					tAngle=curPoint.angle;
				}*/
				
				if(tAngle>180)
				{
					tAngle=360-tAngle;
				}else if(tAngle<-180)
				{
					tAngle=360+tAngle;
				}
				retPoint.angle=tAngle;
				//笛卡尔 x正为0  逆时针为正			
				return retPoint;
			 
		}
	}
	return null;
	
};

CarTracker.prototype.getRtSmoothPoint= function()
{
	
	if(this.smoothStartPnt==null || this.smoothEndPnt == null)return null;
	if(simController.averagePerFrame<=0)simController.averagePerFrame=30;

	if(this.smoothStep==0)
	{
		this.firstFrameTime=Date.now();
		
	}
	this.smoothStep=this.smoothStep+1;
	var TimeGap=Date.now()-this.firstFrameTime;


				var retPoint=new TrackerPoint();
				
			
				var delta=TimeGap/(this.smoothEndPnt.gpsTime-this.smoothStartPnt.gpsTime);
			
				
			
				this.smoothDelta=delta;
				var prePoint=this.smoothStartPnt;
				var curPoint=this.smoothEndPnt;
				
				retPoint.mercatorX=prePoint.mercatorX+(curPoint.mercatorX-prePoint.mercatorX)*delta;
				retPoint.mercatorY=prePoint.mercatorY+(curPoint.mercatorY-prePoint.mercatorY)*delta;
				retPoint.gpsTime=prePoint.gpsTime;
				retPoint.speed=prePoint.speed;

				var aDir= new THREE.Vector2( prePoint.mercatorX-curPoint.mercatorX, prePoint.mercatorY-curPoint.mercatorY );
				var tAngle=aDir.angle()*180/Math.PI+180;
				if(curPoint.speed<1){
					tAngle=curPoint.angle;
				}
				if(tAngle>180)
				{
					tAngle=360-tAngle;
				}else if(tAngle<-180)
				{
					tAngle=360+tAngle;
				}
				retPoint.angle=tAngle;
				//笛卡尔 x正为0  逆时针为正	
				this.smoothStep=this.smoothStep+1;		
				return retPoint;
		
	return null;
	
};
//CarTrackerColleciton  车辆和车辆轨迹点的集合

function CarTrackerColleciton()
{
	this.carTrackers= {};
	this.netDataUnprocessed=null;	//存在从网络上下载的数据未处理
	
};

 // 向集合中添加，车辆和轨迹点
CarTrackerColleciton.prototype.addCarTracker = function(carid,ctArray)
{
	//查询是否已经存在
	if(this.carTrackers[carid]!=null)
	{
		//该id已经存在，需要追加trackerPoint
		for(var j = 0,len=ctArray.tracker.length; j < len; j++) {
			this.carTrackers[carid].addTrackerPoint(ctArray.tracker[j]);
		}
		
	}else{
		var newCarTrck = new CarTracker();
		newCarTrck.carid=carid;
		newCarTrck.plate=ctArray.plate;
		newCarTrck.plateClass=ctArray.plateclass;
		newCarTrck.carType=ctArray.cartype;
		newCarTrck.color=ctArray.color;
		for(var j = 0,len=ctArray.tracker.length; j < len; j++) {
			newCarTrck.addTrackerPoint(ctArray.tracker[j]);
		}
		
		this.carTrackers[carid]=newCarTrck;
	}
	
};



//添加一批网络下载的车辆和轨迹数据
CarTrackerColleciton.prototype.setWithNetReturn = function(scene,carSceneModels,netret)
{
	//遍历缓冲数据，删除netret不存在的car，请空缓冲
	
	
	for (var oldcar in this.carTrackers) {		 
		if(netret[oldcar]==null)
		{
			var tCarModel=carSceneModels.carModels[oldcar];
			if(tCarModel!=null)
			{
				scene.remove(tCarModel.meshModel);	//从场景中移除model，避免进行绘制
			}
			
			delete this.carTrackers[oldcar];  //从车辆集合中轨迹中删除
			delete carSceneModels[oldcar];	  //模型缓冲中删除

		}
		
	}
	
	 for (var item in netret) {		 
		 this.addCarTracker(item,netret[item]);
		
	 }


};

//返回已接受的车辆集合中，每辆车最后的快照
CarTrackerColleciton.prototype.getRealTimeSnap = function(timeStamp)
{
	var carSnaps = {};
	for (var item in this.carTrackers) {
	   
	   
		var snapPoint = this.carTrackers[item].getRtSmoothPoint();
	   
		var tSnapCarTracker=new CarTracker();
		tSnapCarTracker.trPoints=snapPoint;
		tSnapCarTracker.carid=item;
		tSnapCarTracker.plate=this.carTrackers[item].plate;
		tSnapCarTracker.carType=this.carTrackers[item].carType;
		tSnapCarTracker.color=this.carTrackers[item].color;
		tSnapCarTracker.plateClass=this.carTrackers[item].plateClass;
		if(snapPoint!=null)
	   {
			carSnaps[item] = tSnapCarTracker;
			
	   }
	   
   }
   
	return carSnaps;
};

//返回指定的时间戳的车辆快照
CarTrackerColleciton.prototype.getCarStatesSnap = function(timeStamp)
{
	var carSnaps = {};
	 for (var item in this.carTrackers) {
		
		
		 var snapPoint = this.carTrackers[item].getInterPoint(timeStamp);
		
		 var tSnapCarTracker=new CarTracker();
		 tSnapCarTracker.trPoints=snapPoint;
		 tSnapCarTracker.carid=item;
		 tSnapCarTracker.plate=this.carTrackers[item].plate;
		 tSnapCarTracker.carType=this.carTrackers[item].carType;
		 tSnapCarTracker.color=this.carTrackers[item].color;
		 tSnapCarTracker.plateClass=this.carTrackers[item].plateClass;
		 if(snapPoint!=null)
		{
			 carSnaps[item] = tSnapCarTracker;
			 
		}
		
	}
	
	 return carSnaps;
};


//CarObject 用于渲染，没有历史轨迹数据，仅有一个明确的位置点和模型

function MapCarObject()
{
	this.name='';
	this.meshModel=null;
	this.trackerPoint= null;
};

//CarModels

function CarSceneModels()
{
	this.modelLibs = {};	//模型库，用于复用
	this.materials  = {};
	this.carModels = {};	//存放MapCarObject对象
};
CarSceneModels.prototype.addMaterial=function(name,material)
{
	this.materials[name]=material;
};
CarSceneModels.prototype.addModel=function(modelName,model)
{
	this.modelLibs[modelName]=model;
};
CarSceneModels.prototype.getMaterial=function(vehType,colorIndex)
{
	var modelName = this.getModelName(vehType);
	var vehMaterials=this.materials[modelName];
	if(vehType==0){
		if(colorIndex==1){
			return vehMaterials.materials.car_blue;
		}else if(colorIndex==2){
			return vehMaterials.materials.car_red;
		}else if(colorIndex==3){
			return vehMaterials.materials.car_black;
		}
		else{
			return vehMaterials.materials.car_white;
		}
	}else if(vehType==2){		
		var matArray = [];
		matArray.push(vehMaterials.materials.d1);
		matArray.push(vehMaterials.materials.d2);
		matArray.push(vehMaterials.materials.d3);
		return matArray;
	}else if(vehType==3){
		var matArray = [];
		matArray.push(vehMaterials.materials.d1);
		matArray.push(vehMaterials.materials.d2);
		matArray.push(vehMaterials.materials.d3);
		matArray.push(vehMaterials.materials.d4);
		return matArray;
	}
	else{
		modelName = this.getModelName(0);
		vehMaterials = this.materials[modelName]
		return vehMaterials.materials.car_white;
	}
	return null;
	
};

//按照车辆类型，返回车辆模型名称
CarSceneModels.prototype.getModelName=function(vehType){
	var usedCarObject='car_normal';
	if(vehType==2){
		usedCarObject='bus2';	
	}if(vehType==3){
		usedCarObject='jiaobanche';	
	}
	return usedCarObject;
}
 //根据时间快照，更新模型  curTimeTrackers是车辆轨迹快照 carTrack对象
CarSceneModels.prototype.updateModelState=function(scene,curTimeTrackers)
{
	//删除快照计算后已不存在的车辆(一般是随后追踪的gpstime < 快照时间)
	for (var oldcarName in this.carModels) {		 
		if(curTimeTrackers[oldcarName]==null)
		{
			
			scene.remove(this.carModels[oldcarName].meshModel);
			//delete this.carTrackers[oldcarName];  
			delete this.carModels[oldcarName];

		}
	}

	for (var carName in curTimeTrackers) {
		
		var trPoint=curTimeTrackers[carName].trPoints;
		
		var plateClass=curTimeTrackers[carName].plateClass;
		var plateStr=curTimeTrackers[carName].plate;
		var carType=curTimeTrackers[carName].carType;
		var vehColor=curTimeTrackers[carName].color;
		var existMapCar = this.carModels[carName];
		if(existMapCar==null)
		{
			//新增一个地图汽车模型
			var newMapCarObj=  new MapCarObject();
			newMapCarObj.name=carName;
			var modelName=this.getModelName(carType);
		
			var usedCarObject = this.modelLibs[modelName];	//暂时都使用蓝色模型 

			var thisMaterial=this.getMaterial(carType,vehColor);
			if(usedCarObject!=null){

				//var carMesh = new THREE.Mesh( usedCarObject.geometry, new THREE.MeshPhongMaterial({color: 0x777777,wireframe: false, transparent: true,side:2} ));
				
				var carMesh=null;
				if(thisMaterial!=null){
					carMesh = new THREE.Mesh( usedCarObject.geometry, thisMaterial);
				}else{
					carMesh = new THREE.Mesh( usedCarObject.geometry, new THREE.MeshPhongMaterial({color: 0x444444,wireframe: false, transparent: true,side:2} ));
				}
				
				
				
				newMapCarObj.meshModel = carMesh;
				newMapCarObj.trackerPoint = curTimeTrackers[carName].trPoints;
				this.carModels[carName]=newMapCarObj;
				
				
				//增加 billbord车牌显示信息
				if(plateStr.length>0){
					const canvas = makeLabelCanvas(150, 32, plateStr,plateClass);
					const texture = new THREE.CanvasTexture(canvas);
					texture.minFilter = THREE.LinearFilter;
					texture.wrapS = THREE.ClampToEdgeWrapping;
					texture.wrapT = THREE.ClampToEdgeWrapping;
				
					const labelMaterial = new THREE.SpriteMaterial({
					map: texture,
					transparent: true,
					opacity: 0.55
					});
					const label = new THREE.Sprite(labelMaterial);
					const labelBaseScale = 0.021;
					label.position.z= 3;

					label.scale.x = canvas.width  * labelBaseScale;
					label.scale.y = canvas.height * labelBaseScale;
					newMapCarObj.meshModel.add(label);
				}
				scene.add(newMapCarObj.meshModel);
				
			}
			
		}else
		{
			//更新已经存在的模型
			//if(curTimeTrackers[carName].trPoints.speed<1)
			//{
				//如果新的点速度过低，则角度不作改变
				
				
				//curTimeTrackers[carName].trPoints.angle=existMapCar.trackerPoint.angle;
				
				//curTimeTrackers[carName].trPoints.direction=existMapCar.trackerPoint.direction;
			//}				
			existMapCar.trackerPoint=curTimeTrackers[carName].trPoints;
		}
		
		
	}
	
};


CarSceneModels.prototype.updateGLModelState=function(glmap,mapRenUtil)
{
	
	 for (var item in this.carModels) {
		
		 var aCarModel = this.carModels[item];
		 if(aCarModel!=null)
		{
			//更新模型的位置状态
			let meshPosiiton=new THREE.Vector3(aCarModel.trackerPoint.mercatorX,aCarModel.trackerPoint.mercatorY,0);
			
			//let extraModel2MetorScale=0.011;//模型可能不是米制单位，需要增加一个缩放
			let extraModel2MetorScale=1;
			mapRenUtil.updateModelTranslate(glmap,aCarModel.meshModel,meshPosiiton,extraModel2MetorScale);
			
			
			//if(aCarModel.trackerPoint.speed>2)
			//{
				
				 //aCarModel.meshModel.rotation.z= -aCarModel.trackerPoint.direction;
				//aCarModel.meshModel.rotation.z= -Math.PI/2-aCarModel.trackerPoint.angle * Math.PI / 180;
				
				aCarModel.meshModel.rotation.z= aCarModel.trackerPoint.angle * Math.PI / 180;	
					
			//}
			
			 //aCarModel.meshModel.updateMatrix();
			
			
		}
	}
	
	
	
}


//mapScene
function MapRenderUtils()
{
	this.mapCenter=null;
	this.sceneAsMercatorCoordinate=null;
	this.scale=0;
}

MapRenderUtils.prototype.getRenderCamera= function(glmap)
{
	const fov = 36.86989764584402;
				
	const aspect = glmap.getCanvas().width/glmap.getCanvas().height;  // the canvas default
	const scrHeight=glmap.getCanvas().height;
	const scaleZ=scrHeight/1024;
	const near = 0.001;
	const far = 50;
	let tcamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	

	var rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), glmap.getPitch()*Math.PI/180);
	var rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), -glmap.getBearing()*Math.PI/180);
	var mapRotateT = rotationZ.multiply(rotationX);
	var upNew = new THREE.Vector3(0, 1, 0);

	var sceneAsMercatorCoordinate = amapgl.MercatorCoordinate.fromLngLat(glmap.getCenter());
	var mapMeterScale = sceneAsMercatorCoordinate.meterInMercatorCoordinateUnits();
	var mapZoomer=glmap.painter.transform.zoom;

	var powValue=1;
	if(mapZoomer>=16)
	{
		mapZoomer=mapZoomer-16;
		powValue = 65536;
		mapMeterScale=mapMeterScale*powValue;
		
	}else if(mapZoomer>=8)
	{
		mapZoomer=mapZoomer-8;
		powValue = 256;
		mapMeterScale=mapMeterScale*powValue;
	}else{
		powValue = 1;
		mapMeterScale=mapMeterScale*powValue;
		
	}
	var cameraPositionZ=0.5/Math.tan(fov*Math.PI/360)  ;
	
	cameraPositionZ = cameraPositionZ/ Math.pow(2,mapZoomer);
	cameraPositionZ = cameraPositionZ*scaleZ;
	var positonNew = new THREE.Vector3(0, 0, cameraPositionZ);
	upNew=upNew.clone().applyMatrix4(mapRotateT);
	positonNew=positonNew.clone().applyMatrix4(mapRotateT);
	

	tcamera.position.x=positonNew.x;
	tcamera.position.y=positonNew.y;
	tcamera.position.z=positonNew.z;
	tcamera.up=upNew;
	tcamera.lookAt(0,0,0);

	tcamera.updateProjectionMatrix();
	return tcamera;

}

MapRenderUtils.prototype.updateModelTranslate= function(glmap,modelObj,modelposMecator,extraSacle)
{
	var powValue=1;
	var sceneAsMercatorCoordinate = amapgl.MercatorCoordinate.fromLngLat(glmap.getCenter());
	var mapMeterScale = sceneAsMercatorCoordinate.meterInMercatorCoordinateUnits();
	var mapZoomer=glmap.painter.transform.zoom;
	if(mapZoomer>=16)
	{
		mapZoomer=mapZoomer-16;
		powValue = 65536;
		mapMeterScale=mapMeterScale*powValue;
		modelObj.scale.x=mapMeterScale*extraSacle;
		modelObj.scale.y=mapMeterScale*extraSacle;
		modelObj.scale.z=mapMeterScale*extraSacle;
		modelObj.position.x=(modelposMecator.x-sceneAsMercatorCoordinate.x)*powValue;
		modelObj.position.y=-(modelposMecator.y-sceneAsMercatorCoordinate.y)*powValue;
		modelObj.position.z=modelposMecator.z*sceneAsMercatorCoordinate.meterInMercatorCoordinateUnits()*powValue;

	}else if(mapZoomer>=8)
	{
		mapZoomer=mapZoomer-8;
		powValue = 256;
		mapMeterScale=mapMeterScale*powValue;
		modelObj.scale.x=mapMeterScale*extraSacle;
		modelObj.scale.y=mapMeterScale*extraSacle;
		modelObj.scale.z=mapMeterScale*extraSacle;
		modelObj.position.x=(modelposMecator.x-sceneAsMercatorCoordinate.x)*powValue;
		modelObj.position.y=-(modelposMecator.y-sceneAsMercatorCoordinate.y)*powValue;
		modelObj.position.z=modelposMecator.z*sceneAsMercatorCoordinate.meterInMercatorCoordinateUnits()*powValue;
	}else{
		powValue = 1;
		mapMeterScale=mapMeterScale*powValue;
		modelObj.scale.x=mapMeterScale*extraSacle;
		modelObj.scale.y=mapMeterScale*extraSacle;
		modelObj.scale.z=mapMeterScale*extraSacle;
		modelObj.position.x=(modelposMecator.x-sceneAsMercatorCoordinate.x)*powValue;
		modelObj.position.y=-(modelposMecator.y-sceneAsMercatorCoordinate.y)*powValue;
		modelObj.position.z=modelposMecator.z*sceneAsMercatorCoordinate.meterInMercatorCoordinateUnits()*powValue;
	}

	
}

MapRenderUtils.prototype.getRenderMatrix= function(mapCenterCoordinate,matrix)
{
	this.mapCenter=mapCenterCoordinate;
	var modelOrigin = [ mapCenterCoordinate.lng, mapCenterCoordinate.lat ];
	var modelAltitude = 0;
	var modelRotate = [ 0, 0, 0 ];

	this.sceneAsMercatorCoordinate = amapgl.MercatorCoordinate.fromLngLat(
			modelOrigin, modelAltitude);
	this.scale=this.sceneAsMercatorCoordinate.meterInMercatorCoordinateUnits();
	var modelTransform = {
			translateX : this.sceneAsMercatorCoordinate.x,
			translateY : this.sceneAsMercatorCoordinate.y,
			translateZ : this.sceneAsMercatorCoordinate.z,
			rotateX : modelRotate[0],
			rotateY : modelRotate[1],
			rotateZ : modelRotate[2],
			/* Since our 3D model is in real world meters, a scale transform needs to be
			 * applied since the CustomLayerInterface expects units in MercatorCoordinates.
			 */
			scale : this.sceneAsMercatorCoordinate.meterInMercatorCoordinateUnits()
		};

	var rotationX = new THREE.Matrix4().makeRotationAxis(
			new THREE.Vector3(1, 0, 0), modelTransform.rotateX);
	var rotationY = new THREE.Matrix4().makeRotationAxis(
			new THREE.Vector3(0, 1, 0), modelTransform.rotateY);
	var rotationZ = new THREE.Matrix4().makeRotationAxis(
			new THREE.Vector3(0, 0, 1), modelTransform.rotateZ);

	var m = new THREE.Matrix4().fromArray(matrix);
	var l = new THREE.Matrix4().makeTranslation(
			modelTransform.translateX, modelTransform.translateY,
			modelTransform.translateZ).scale(
			new THREE.Vector3(modelTransform.scale,
					-modelTransform.scale, modelTransform.scale))
			.multiply(rotationX).multiply(rotationY).multiply(
					rotationZ);
	return m.multiply(l);
	
}


function doLoopRealTimeAnimator(timestamp)
{
	let nowTime = Date.now();

	let timeInterval=nowTime-simController.lastDrawTime;

	if(timeInterval > simConfig.TIME_PERFRAME){
		if(cars.netDataUnprocessed!=null)
		{
			cars.setWithNetReturn(simCarLayer.scene,sceneCarModels,cars.netDataUnprocessed);
			cars.netDataUnprocessed=null;
		}

		let tLastDrawTime=simController.lastDrawTime ;
		simController.lastDrawTime = nowTime;//处理帧刷新逻辑 
		var carSnaps = cars.getRealTimeSnap();	
		sceneCarModels.updateModelState(simCarLayer.scene,carSnaps);       //根据时间快照，更新模型     	
		map.triggerRepaint();
	}

	requestAnimationFrame(doLoopRealTimeAnimator);
}
function doLoopAnimator(timestamp)
{ 
	let nowTime = Date.now();

	let timeInterval=nowTime-simController.lastDrawTime;
	if(timeInterval > simConfig.TIME_PERFRAME){
		simController.lastDrawTime = nowTime;//处理帧刷新逻辑 
		let isSkipFrame=false;	
		if(simController.isPause)
		{
			isSkipFrame=true;
		}else if(simController.isPlayOver())
		{
			isSkipFrame=true;
		}
		if(simController.isLoading)
		{
			isSkipFrame=true;
		}

		if(!isSkipFrame){
			simController.nextToTimeMill(timeInterval*simController.replaySpeed); //播放控制，移动到下一个毫秒单位

			var bRequestData=false;
			let startRequestTime=0;
			let endRequestTime=0;
			if(simController.dataDateTime_start==0)
			{
				//首次下载
				bRequestData=true;
				startRequestTime = simController.startSimDate.getTime();
				endRequestTime = simController.startSimDate.getTime()+simConfig.DATA_REQUEST_INTELVAL*1000;
			}else
			{
				if((simController.dataDateTime_end-simController.playTimeMill) < simConfig.PRE_REQUESTTIME*1000)
				{
					//非首次下载
					bRequestData=true;
					startRequestTime = simController.dataDateTime_end;
					endRequestTime = simController.dataDateTime_end+simConfig.DATA_REQUEST_INTELVAL*1000;
				}else if(simController.playTimeMill<simController.dataDateTime_start)
				{
					bRequestData=true;
					startRequestTime = simController.playTimeMill-60000;
					endRequestTime = startRequestTime+simConfig.DATA_REQUEST_INTELVAL*1000;
				}

			}

			if(bRequestData)
			{
					//let varBounds = map.getBounds();
				let xmin=map.getCenter().lng-0.02;
				let xmax=map.getCenter().lng+0.02;
				let ymin=map.getCenter().lat-0.02
				let ymax=map.getCenter().lat+0.02;
				
				let requestURL=simConfig.REQUEST_SVR+"?starttime="+DateTimeUtil.date2Str(new Date(startRequestTime-60000))+"&endtime="+DateTimeUtil.date2Str(new Date(endRequestTime+60000));

				requestURL = requestURL+"&xmin="+xmin+"&ymin="+ymin+"&xmax="+xmax+"&ymax="+ymax;
				//requestURL="testdata/DataSmoothInterp0729.json";
				
				console.log(requestURL);
				simController.isLoading=true;
				//DateTimeUtil.date2Str(thisRequestTime)+".json";
				//下载模拟数据
				var that=this;
				$.ajax({
					
					url: requestURL,
					success: function( result ) {
						cars.setWithNetReturn(simCarLayer.scene,sceneCarModels,result);
						simController.isLoading=false;
					}
					});
				simController.dataDateTime_start=startRequestTime;
				simController.dataDateTime_end=  endRequestTime;
			}else{
				var carSnaps = cars.getCarStatesSnap(simController.playTimeMill);
				sceneCarModels.updateModelState(simCarLayer.scene,carSnaps);       //根据时间快照，更新模型     	
				map.triggerRepaint();
				if(simController.timeUpdateFunction)
				{
					simController.timeUpdateFunction(simController.playTimeMill);
				}
				
			}
		}
	}
	requestAnimationFrame(doLoopAnimator);
	
}


//SimController 仿真模拟控制对象
function SimConfig()
{
	this.TIME_PERFRAME = 30;	//刷新频率 60ms/一帧
	this.PRE_REQUESTTIME=3;  //还剩多少秒播放时间，就要开始请求,单位 (秒)
	this.DATA_REQUEST_INTELVAL=300;	//请求轨迹点的间隔时间 ，单位秒
	this.REQUEST_SVR="http://localhost:8080/urbansimulator/CarTrackerSvr";
	this.WS_SVR="ws://127.0.0.1:8083/urbansimulator/websocket";
}



function SimController()
{
	
	//this.lastTime = Date.now();    
	this.isRealTimePlay=true;	//是否是实时模式
	this.isLoading=false;
	this.isPause = false;
	this.startSimDate=0;
	this.playTimeMill=0;
	this.lastDrawTime=Date.now();

	this.replaySpeed = 1; //播放倍率，1代表实际 2代表两倍速度 ……
	this.dataDateTime_start=0;	//已下载数据的起点时间
	this.dataDateTime_end=0;	//已下载数据的终点时间
	this.maxDuringTime=10*60*1000;; //最大的回放时间
}
//暂停播放
SimController.prototype.pause= function()
{
	this.isPause = true;
}


//继续播放
 SimController.prototype.resume= function()
{
	this.isPause = false;
}


//设置播放的时间 毫秒单位，最小为0
SimController.prototype.resetState=function()
{
	this.playTimeMill = this.startSimDate.getTime();
	this.lastDrawTime=Date.now();
}

//移动播放的时间轴 毫秒单位，支持负值
SimController.prototype.nextToTimeMill=function(timeMill)
{
	this.playTimeMill = this.playTimeMill+timeMill;
}
//获取正在播放的实际时间 unix tm单位

SimController.prototype.getPlayDateTM=function()
{
	return this.playTimeMill;
}
//获取已经播放的时间 毫秒
SimController.prototype.getPlayedTime=function()
{
	let v=this.playTimeMill-this.startSimDate.getTime();
	if(v<0)v=0;
	return v;
}

SimController.prototype.setTimeUpdateListener=function(fun)
{
	this.timeUpdateFunction=fun;
}



SimController.prototype.setPlayOffsetTime=function(pTime)
{
	this.playTimeMill=this.startSimDate.getTime()+pTime;
}
//是否已经播放完毕
SimController.prototype.isPlayOver=function()
{
	
	if(this.playTimeMill>=this.startSimDate.getTime()+this.maxDuringTime)return true;
	return false;
}

SimController.prototype.clearData=function()
{
	//this.dataDateTime_start=0;	
	//this.dataDateTime_end=0;
	if(this.playTimeMill>this.dataDateTime_end)
	{
		for (var oldcar in cars.carTrackers) {
			delete cars.carTrackers[oldcar];  
		}	
		for (var cname in sceneCarModels.carModels) {
		
			let tmesh = sceneCarModels.carModels[cname];  
			simCarLayer.scene.remove(tmesh.meshModel);
			delete sceneCarModels.carModels[cname];  
		}	
	}
		 
}
function Tracker_ws(ws_config)
{
	this.websocket= null;
	this.config=ws_config;
	

}

Tracker_ws.prototype.start=function(){

	this.websocket = new WebSocket(this.config.WS_SVR);

	//连接发生错误的回调方法
	this.websocket.onerror = function () {
		console.log("WebSocket连接发生错误");
	};

	var that=this;
	//连接成功建立的回调方法
	this.websocket.onopen = function () {
	
		console.log("WebSocket连接成功");
		var message = { 
			action: "start", 
			starttimer:"20200805193015",
			xmin:112.11,
			ymin:36.17,
			xmax:112.11,
			ymax:36.15
		};
		that.websocket.send(JSON.stringify(message));
	}

	//接收到消息的回调方法
	this.websocket.onmessage = function (event) {
		var netData=JSON.parse(event.data);		
		cars.netDataUnprocessed=netData;
	}

	//连接关闭的回调方法
	this.websocket.onclose = function () {
		console.log("WebSocket连接关闭");
	}

	//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
	window.onbeforeunload = function () {
		that.websocket.close();
	}
}



