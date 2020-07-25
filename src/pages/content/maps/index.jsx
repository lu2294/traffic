import React, { Component } from 'react'
// import { center, zoom, CRS, clusterMaxZoom, clusterMinZoom} from 'config/defaultValue.config'

const L = window.L
class ZMap extends Component {
  // constructor(props) {
  //   super(props)
  // }
  componentDidMount() {
    this.initMainMap()
  }
  initMainMap() {
    try {
      const map = L.map("mainmap", {
        crs: L.CRS.EPSG3857, //要使用的坐标参考系统，默认的坐标参考系，互联网地图主流坐标系
        zoomControl: false,
        // minZoom: 1,
        attributionControl: false,
      }).setView([30.27, 120.15], 14);
      L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 17, //最大视图
        minZoom: 2, //最小视图
      }).addTo(map);
      window.mainMap = map;
      console.log('地图加载成功\n')
    } catch (e) {
      console.log('地图加载失败\n', e)
    }
  }

  render() {
    return (
      <div id='mainmap' style={{width:'100%',height:'100%'}}>
      </div>
    )
  }
}

export default ZMap