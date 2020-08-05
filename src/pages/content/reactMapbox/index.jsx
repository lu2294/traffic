import React, { Component } from 'react';
import { inject } from "mobx-react"
import mapboxgl from 'mapbox-gl';
// import courselistData from 'testdata/07301840.json';
import { drawLine, drawSpot } from '../../../utils/mapbox';
import './index.scss';

@inject("map")
class Map extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { update } = this.props.map;
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
                                    "http://106.14.5.29:25003/v3/tile?x={x}&y={y}&z={z}"
                                    //  "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
                    zoom: 18,
                    maxZoom: 23,
                    minZoom: 0,
                    center: [121.486224, 31.233087],
                    // maxBounds: bounds
                });
                window.map = map;
                resolve(map);
                console.log('地图加载成功。');
            }).then((map) => {
                //     drawLine(map, [
                //         [121.486641, 31.232309],
                //         [121.486984, 31.230841],
                //         [121.487327, 31.229667],
                //         [121.487327, 31.229373],
                //         [121.48973, 31.221593],
                //     ], '#58b878', 'line1');

                //     drawLine(map, [
                //         [121.475197, 31.232767], [121.479403, 31.226896], [121.489702, 31.202085]
                //     ], 'red', 'line2');

                //     drawLine(map, [
                //         [121.475197, 31.232767], [121.473403, 31.223896]
                //     ], 'red', 'line22');
                //    const spotMarkerList =  drawSpot(map, mapboxgl, 'red');
                //    update(spotMarkerList,'spotMarkerList')



                let blue_car = '3dmodels/car_blue4.obj';

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
                window.simCarLayer = {
                    id: '3d-model',
                    type: 'custom',
                    renderingMode: '3d',
                    onAdd: function (map, gl) {
                        this.camera = new THREE.Camera();
                        this.scene = new THREE.Scene();
                        // create two three.js lights to illuminate the model
                        var directionalLight = new THREE.DirectionalLight(0xffffff);
                        directionalLight.position.set(0, -70, 1000).normalize();
                        this.scene.add(directionalLight);

                        var directionalLight2 = new THREE.DirectionalLight(0xffffff);
                        directionalLight2.position.set(0, 70, 1000).normalize();
                        this.scene.add(directionalLight2);
                        var light = new THREE.AmbientLight(0x404040); // soft white light
                        this.scene.add(light);

                        // use the three.js GLTF loader to add the 3D model to the three.js scene
                        var loader = new THREE.OBJLoader();
                        loader.load(
                            '3dmodels/car_blue4.obj',
                            function (object3d) {
                                var model = object3d;
                                var gtUtil = new GLTFUtil();
                                var carObject3D = object3d.children[0];
                                if (carObject3D != null) {
                                    sceneCarModels.addModel('car_blue', carObject3D);
                                }

                            }.bind(this));
                        this.map = map;

                        // use the amap GL JS map canvas for three.js
                        this.renderer = new THREE.WebGLRenderer({
                            canvas: map.getCanvas(),
                            context: gl,
                            antialias: true
                        });

                        this.renderer.autoClear = false;
                        /* eslint-disable */
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
                map.on('style.load', function () {
                    //addrasterLayer();
                    map.addLayer(simCarLayer);
                    simController.startSimDate = DateTimeUtil.str2Date('202007301836000000');

                    simController.maxDuringTime = 8 * 60 * 1000;
                    simController.resetState();
                    // playControl.init(simController);
                    requestAnimationFrame(doLoopAnimator);  //开启动画

                });
                window.playControl  = new PlayControl(simController);
                playControl.init(simController);

            })
        }

    }

    render() {
        return (
            <>
                <div id="map" className="map">
                </div>
                <div className="plb_container" style={{display:'none'}}>
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