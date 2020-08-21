import React, { Component } from 'react';
import { inject, observer } from "mobx-react"
import mapboxgl from 'mapbox-gl';
import { drawLine } from '../../../utils/mapbox';
// import MapPop from '../../../components/mapPop';
import './index.scss';

@inject('CommonStore', "map", 'video', 'RoadIndicatorStore', 'echart')
@observer
class Map extends Component {
    constructor(props) {
        super(props);
        this.zoomStatus = true;
    }

    componentDidMount() {
        mapboxgl.accessToken = 'ec85d3648154874552835438ac6a02b2';
        if (!mapboxgl.supported()) {
            console.log('地图加载失败。');
        } else {
            //设置地图区域
            const bounds = [
                [118.21, 28.11], // Southwest coordinates，西南坐标
                [122.40, 31.33]  // Northeast coordinates，东北坐标
            ];
            new Promise((resolve, reject) => {
                const map = new mapboxgl.Map({
                    style: {
                        "version": 8,
                        "glyphs": "./font/{fontstack}/{range}.pbf",
                        "sources": {
                            "osm-tiles": {
                                "type": "raster",
                                'tiles': [
                                    "http://15.75.0.255:25003/v3/tile?x={x}&y={y}&z={z}"//内网地址，需要连内网
                                    // "http://106.14.5.29:25003/v3/tile?x={x}&y={y}&z={z}"
                                ],
                                'tileSize': 256
                            }
                        },
                        "layers": [{
                            "id": "simple-tiles",
                            "type": "raster",
                            "source": "osm-tiles"
                        }]
                    },
                    container: 'map',
                    zoom: 14,
                    maxZoom: 21,
                    minZoom: 0,
                    center: [121.486224, 31.233087],
                    // maxBounds: bounds
                });

                map.addControl(new mapboxgl.NavigationControl({ showCompass: true, visualizePitch: true, showZoom: true }), 'bottom-right')
                window.map = map;
                // 地图加载后，加载路名
                map.on('load', function () {
                    map.addSource("themes",
                        {
                            "type": 'raster',
                            "tiles": ['http://15.75.0.255:25777/v3/tile?z={z}&x={x}&y={y}'],//内网地址，需要连内网
                            'transparent': true,
                            "tileSize": 256,
                        });
                    map.addLayer({ "id": "themeLayer", "type": "raster", "source": "themes", });
                })
                resolve(map);
                console.log('地图加载成功。');
            }).then((map) => {
                map.on('zoomend', (e) => {
                    if (map.getZoom().toFixed(2) > 17.5) {
                        if (this.zoomStatus) {
                            map.addSource("themeLayers",
                                {
                                    "type": "raster",
                                    'tiles': [
                                        "http://15.75.0.255:25666/v3/tile?z={z}&x={x}&y={y}"//内网地址，需要连内网
                                    ],
                                    'tileSize': 256
                                });
                            map.addLayer({ "id": "themeLayers", "type": "raster", "source": "themeLayers", });
                            this.clearRoadLayer(); //清除事件图层
                            this.clearSpotLayer(); //清除事件图层
                            this.initTraffic();
                            // this.clearVideoLayer(); //清除视频图层
                            //大于17级别时展示，注意ID，避免ID重复，会报错
                            !map.getLayer('3d-model') && this.renderCrossRoad();
                            this.zoomStatus = false
                        }
                    } else {
                        if (!this.zoomStatus) {
                            if (map.getSource('themeLayers')) {
                                map.removeLayer('themeLayers');
                                map.removeSource('themeLayers');
                            }
                            map.getLayer('3d-model') && map.removeLayer('3d-model');
                            map.getLayer('tms-test') && map.removeLayer('tms-test');
                            this.zoomStatus = true;
                            this.props.CommonStore.queryEventData().then((data) => {
                                this.initSpot(data);
                            });
                            // this.initVideo2()
                            this.roadInit();
                        }
                    }
                })
                this.initTraffic();
                this.props.CommonStore.queryEventData().then((data) => {
                    this.initSpot(data);
                })

                this.props.CommonStore.querySelectAllRadar().then((data) => {
                    this.initVideo(data);
                    this.props.map.update(data, 'videoData')
                })
            })
        }

    }
    // 红绿灯
    initTraffic = () => {
        var map1 = window.map
      var modelOrigin = [121.483795, 31.240458]  // 添加模型的地理位置
      var modelAltitude = 0
      var modelRotate = [Math.PI / 2, 0, 0]
      var modelScale = 5.41843220338983e-8
      var sceneCarModels = new window.CarSceneModels();
      var modelTransform = {
        translateX: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin , modelAltitude).x,
        translateY: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin , modelAltitude).y,
        translateZ: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin , modelAltitude).z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        scale: modelScale
      }
      var THREE = window.THREE
      var customLayer = {
        id : '3d-models',
			type : 'custom',
			renderingMode : '3d',
			onAdd : function(map, gl) {
				this.camera = new THREE.Camera();
				this.scene = new THREE.Scene();
				// create two three.js lights to illuminate the model
				var directionalLight = new THREE.DirectionalLight(0xffffff);
				directionalLight.position.set(0, -10, 100).normalize();
				this.scene.add(directionalLight);

				var directionalLight2 = new THREE.DirectionalLight(0xffffff);
				directionalLight2.position.set(0, 10, 100).normalize();
				this.scene.add(directionalLight2);
				var light = new THREE.AmbientLight( 0x404040 ); // soft white light
				this.scene.add( light );

				// use the three.js GLTF loader to add the 3D model to the three.js scene
                var loader = new THREE.OBJLoader();
                let obj1 = require('../../../assets/3dmodels/bus.obj');
				loader.load(
                    obj1,
						function(object3d) {							
							// var model =object3d;							
							// var gtUtil=new GLTFUtil();
							var carObject3D=object3d.children[0];
							if(carObject3D !=null )
							{
								console.log(carObject3D,'lllllllllllllll');
								sceneCarModels.addModel('car_blue',carObject3D);
							}
							
						}.bind(this));
				this.map = map;

				// use the amap GL JS map canvas for three.js
				this.renderer = new THREE.WebGLRenderer({
					canvas : map.getCanvas(),
					context : gl,
					antialias : true
				});

				this.renderer.autoClear = false;
        },
        render: function(gl, matrix) {
          var rotationX = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(1, 0, 0),
            modelTransform.rotateX
          )
          var rotationY = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 1, 0),
            modelTransform.rotateY
          )
          var rotationZ = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 0, 1),
            modelTransform.rotateZ
          )

          var m = new THREE.Matrix4().fromArray(matrix)
          var l = new THREE.Matrix4()
            .makeTranslation(
              modelTransform.translateX,
              modelTransform.translateY,
              modelTransform.translateZ
            )
            .scale(
              new THREE.Vector3(
                modelTransform.scale,
                -modelTransform.scale,
                modelTransform.scale
              )
            )
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ)

          this.camera.projectionMatrix = m.multiply(l)
          this.renderer.state.reset()
          this.renderer.render(this.scene, this.camera)
        }
      }
      map1.on('style.load', function() {
        map1.addLayer(customLayer)
      })
    }
    clearVideoLayer = () => {
        const { videoMarkerList } = this.props.map;
        videoMarkerList.length && videoMarkerList.forEach((v) => {
            if (v) {
                v.remove()
            }
        })
    }
    initVideo2 = () => {
        const { update, videoData } = this.props.map;
        const map = window.map;
        let markerList = [];
        videoData.forEach((v) => {
            const lng = [v.lng, v.lat]
            const el = document.createElement('div');
            el.className = 'video-marker';
            const markerLayer = new mapboxgl.Marker(el).setLngLat(lng).addTo(map)
            markerList.push(markerLayer)
        })
        update(markerList, 'videoMarkerList');
    }
    initVideo = (data) => {
        const that = this;
        const { update } = this.props.map;
        const map = window.map;
        let markerList = [];
        data.forEach((v) => {
            const lng = [v.lng, v.lat]
            const el = document.createElement('div');
            el.className = 'video-marker';
            const markerLayer = new mapboxgl.Marker(el).setLngLat(lng).addTo(map);
            el.addEventListener('click', function (e) {
                that.props.video.closeVideoFirst();
                window['player'] && window['player'].removePlayer();
                if (e.target.className.indexOf('video-marker1') !== -1) {
                    el.className = e.target.className.replace('video-marker1', '');
                } else {
                    const classNameList = document.getElementsByClassName('video-marker');
                    for (let i = 0; i < classNameList.length; i++) {
                        classNameList[i].className = classNameList[i].className.replace('video-marker1', '')
                    }
                    that.props.echart.selectRadarVideoList(v.deviceId);
                    setTimeout(() => {
                        el.className = e.target.className + ' video-marker1';
                    }, 100)
                }
            });
            markerList.push(markerLayer)
        })
        update(markerList, 'videoMarkerList');
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.roadInit();
        }
    }
    clearRoadLayer = () => {
        const { lineList } = this.props.map;
        const map = window.map;
        lineList.length && lineList.forEach((v) => {
            if (map.getSource(v)) {
                map.removeLayer(v);
                map.removeSource(v);
            }
        })
    }
    // 初始化路段
    roadInit = () => {
        if (!this.zoomStatus) return false;
        const { update } = this.props.map;
        const { rdsegInfoList } = this.props.CommonStore;
        this.clearRoadLayer();
        const map = window.map;
        let list = [];
        rdsegInfoList.length > 0 && rdsegInfoList.forEach((v) => {
            const lng = [[v.startLng, v.startLat], [v.endLng, v.endLat]];
            const effIndex = Math.floor(v.effIndex);
            let color = '#02B877';
            if (1 < effIndex && effIndex < 31) {
                color = '#EA3132'
            } else if (30 < effIndex && effIndex < 61) {
                color = '#FEAB14'
            }
            drawLine(map, lng, color, 'line' + v.id);
            list.push('line' + v.id)
        });
        // drawLine(map, lng, color, 'line' + v.id);
        update(list, 'lineList');
    }
    clearSpotLayer = () => {
        const { spotMarkerList, spotMarkerList1 } = this.props.map;
        spotMarkerList.length && spotMarkerList.forEach((v) => {
            if (v) {
                v.remove()
            }
        })
        spotMarkerList1.length && spotMarkerList1.forEach((v) => {
            if (v) {
                v.remove()
            }
        })
    }
    // 初始化事件点位
    initSpot = (data) => {
        const { update } = this.props.map;
        this.clearSpotLayer();
        if (typeof data === 'undefined') return;
        const data1 = data.filter((v) => (v.eventStatus == '0'))
        const data2 = data.filter((v) => (v.eventStatus == '1'))
        const spotMarker1 = this.drawSpot(data1);
        const spotMarker2 = this.drawSpot(data2);
        update(data1, 'spotData1');
        update(data2, 'spotData2');
        update(spotMarker1, 'spotMarkerList');
        update(spotMarker2, 'spotMarkerList1');
    }
    // 地图定位事件
    drawSpot = (data) => {
        const map = window.map;
        const that = this;
        let list = []
        data.forEach((v) => {
            list.push({
                "type": "Feature",
                "color": v.eventstatus === '1' ? 'type1' : 'type2',
                "data": v,
                "properties":
                {
                    "marker-color": "#008000",
                    "marker-size": "medium",
                    "marker-symbol": "",
                    "name": ""
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [v.lng, v.lat]
                }
            })
        })
        let markerList = []
        var geojson = {
            "type": "FeatureCollection",
            "features": list

        };
        geojson.features.forEach(function (marker, k) {
            let el = document.createElement('div');
            let el1 = document.createElement('p');
            el.appendChild(el1);
            if (marker.color === 'type1') {
                el.className = 'marker';
            } else {
                el.className = 'marker1';
            }
            const markerLayer = new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).setPopup(
                new mapboxgl.Popup(
                    {
                        anchor: "bottom",
                        offset: [5, -10],
                        className: "popup"
                    }
                )
                    .setHTML(that.renderHtml(marker.data, k + 1)))
                .addTo(map)
            // if(marker.status){
            //     markerList.push(markerLayer)
            // }else{
            //     markerList1.push(markerLayer)
            // }
            markerList.push(markerLayer)
            // var el2 = document.createElement('span');
            // el1.appendChild(el2);
            // setTimeout(()=>{
            //     document.getElementById('button1').addEventListener('click', function (e) {
            //         alert('rrr')
            //     });
            // },2000)
        });
        return markerList
    };
    // 点击事件页面
    renderHtml = (data, i) => {
        window.show = (a) => {
            this.props.video.useSecondVideo(Number(a));
        }
        window.onShowVehicleShow = () => {
            this.props.RoadIndicatorStore.onShowVehicle({ jdchpzl: "沪EK7286", jdchpzldm: '02' });
        }
        return `<div class="popup-content">
            <ul>
                <li><span>事件类型 ：</span><span>${data.eventtitle}</span></li>
                <li><span>时间时间 ：</span><span>${data.dwAbsTime}</span></li>
                <li><span>所属路段 ：</span><span>河南中路</span></li>
                <li><span>事件状态 ：</span><span>${data.eventstatus == '0' ? '未处置' : '已处置'}</span></li>
            </ul>
            <div class="popup-content-bottom">
                <div onclick=show(${i}) >实时</div>
                <div style="color:gray">回放</div>
                <div onclick=onShowVehicleShow()>一车一档</div>
            </div>
        </div>`
        // ${data.eventstatus == '0' ? '' : '<div>完成处置</div>'}
    }
    // 3D车辆地图
    renderCrossRoad = () => {
        const map = window.map;
        var THREE = window.THREE;
        /* eslint-disable */
        window.cars = new window.CarTrackerColleciton();
        /* eslint-disable */
        window.sceneCarModels = new window.CarSceneModels();
        /* eslint-disable */
        window.simConfig = new window.SimConfig();
        window.simConfig.REQUEST_SVR = 'testdata/07301840.json';	//测试离线数据
        //simConfig.REQUEST_SVR="http://localhost:8080/urbansimulator/CarTrackerSvr";//数据服务
        /* eslint-disable */
        window.simController = new window.SimController();
        window.simConfig.WS_SVR = "ws://15.112.169.141:8080/urbansimulator/websocket";

        //window.simConfig.WS_SVR = "ws://15.112.169.141:58080/hppoc/webSocket/realTrack";
        simController.isRealTimePlay = true;//设置true就是开启实时
        window.simCarLayer = {
            id: '3d-model',
            type: 'custom',
            renderingMode: '3d',
            onAdd: function (map, gl) {
                this.camera = new THREE.Camera();
                this.scene = new THREE.Scene();
                // create two three.js lights to illuminate the model
                var directionalLight2 = new THREE.DirectionalLight(0xffffff);
                directionalLight2.position.set(70, 70, 1000).normalize();
                this.scene.add(directionalLight2);

                var directionalLight = new THREE.DirectionalLight(0xffffff);
                directionalLight.position.set(-1, 1, 1).normalize();
                this.scene.add(directionalLight);
                var light = new THREE.AmbientLight(0xffffff); // soft white light
                this.scene.add(light);
                let mtlLoader1 = require('../../../assets/3dmodels/car_normal.mtl');
                let mtlLoader2 = require('../../../assets/3dmodels/bus2.mtl');
                let mtlLoader3 = require('../../../assets/3dmodels/jiaobanche.mtl');
                let obj1 = require('../../../assets/3dmodels/car_normal.obj');
                let obj2 = require('../../../assets/3dmodels/bus2.obj');
                let obj3 = require('../../../assets/3dmodels/jiaobanche.obj');
                var mTLLoader = new THREE.MTLLoader('3dmodels/');
                mTLLoader.load(mtlLoader1, function (materials) {
                    materials.preload();
                    sceneCarModels.addMaterial('car_normal', materials);
                    new THREE.OBJLoader()
                        .load(obj1,
                            function (object3d) {
                                var model = object3d;
                                var carObject3D = object3d.children[0];
                                if (carObject3D != null) {
                                    sceneCarModels.addModel('car_normal', carObject3D);
                                }
                            }
                        );

                });
                mTLLoader.load(mtlLoader2, function (materials) {
                    materials.preload();
                    sceneCarModels.addMaterial('bus2', materials);
                    new THREE.OBJLoader()
                        .load(obj2,
                            function (object3d) {
                                var model = object3d;
                                var carObject3D = object3d.children[0];
                                if (carObject3D != null) {
                                    console.log(carObject3D);
                                    sceneCarModels.addModel('bus2', carObject3D);
                                }
                            }
                        );

                });
                mTLLoader.load(mtlLoader3, function (materials) {
                    materials.preload();
                    sceneCarModels.addMaterial('jiaobanche', materials);
                    new THREE.OBJLoader()
                        .load(obj3,
                            function (object3d) {
                                var model = object3d;
                                var carObject3D = object3d.children[0];
                                if (carObject3D != null) {
                                    console.log(carObject3D);
                                    sceneCarModels.addModel('jiaobanche', carObject3D);
                                }
                            }
                        );

                });
                this.map = map;

                // use the amap GL JS map canvas for three.js
                this.renderer = new THREE.WebGLRenderer({
                    canvas: map.getCanvas(),
                    context: gl,
                    antialias: true
                });

                this.renderer.autoClear = false;
                this.mapRenderUtils = new MapRenderUtils();
            },
            render: function (gl, matrix) {
                var renderCamera = this.mapRenderUtils.getRenderCamera(this.map);
                sceneCarModels.updateGLModelState(this.map, this.mapRenderUtils);
                this.renderer.state.reset();
                this.renderer.render(this.scene, renderCamera);

            }
        };
        window.playControl = new PlayControl();
        window.map.addLayer(simCarLayer);
        simController.startSimDate = DateTimeUtil.str2Date('202007301836000000');

        simController.maxDuringTime = 8 * 60 * 1000;
        simController.resetState();
        // playControl.init(simController);
        if (simController.isRealTimePlay) {
            requestAnimationFrame(doLoopRealTimeAnimator);  //开启动画
        } else {
            requestAnimationFrame(doLoopAnimator);  //开启动画
        }

        // });
        // window.playControl = new PlayControl(simController);
        // playControl.init(simController);
        window.tracker_ws = new window.Tracker_ws(simConfig);
        window.tracker_ws.start();
    }
    render() {

        return (
            <>
                <div id="map" className="map">
                </div>
                <div className="plb_container" style={{ display: 'none' }}>
                    <div id="plb_box" className="plb_box">
                        <div id="plb_play" className="plb_pause">
                        </div>
                        <div id="plb_progress">
                            <span id="plb_bar"></span>
                            <span id="plb_control"></span>
                        </div>
                        <div id="plb_speed" >
                            <span className="plb_speed_text">速度 </span>
                            <span id="plb_speed_1" className="plb_speed_selector">1</span>
                            <span id="plb_speed_2" className="plb_speed_box">2</span>
                            <span id="plb_speed_3" className="plb_speed_box">3</span>
                            <span id="plb_speed_4" className="plb_speed_box">4</span>
                            <span id="plb_speed_5" className="plb_speed_box">5</span>
                        </div>

                        <div id="plb_full"></div>
                        <div id="plb_playtime_box" >
                            <span id="plb_playtime_text">00:00:00-00:00:00</span>
                        </div>
                    </div>
                </div>

            </>

        );
    }
}

export default Map;