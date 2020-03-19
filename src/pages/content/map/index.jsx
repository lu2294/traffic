// import L from 'leaflet'
import React, { Component } from 'react'

class MapIndex extends Component {
  componentDidMount() {
    const L = window.L
    let normalm1 = L.tileLayer.chinaProvider('Geoq.Normal.Map', { maxZoom: 18, minZoom: 5 });
    let normalm2 = L.tileLayer.chinaProvider('Geoq.Normal.Color', { maxZoom: 18, minZoom: 5 });
    let normalm3 = L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue', { maxZoom: 18, minZoom: 5 });
    let normalm4 = L.tileLayer.chinaProvider('Geoq.Normal.Gray', { maxZoom: 18, minZoom: 5 }); let normalm5 = L.tileLayer.chinaProvider('Geoq.Normal.Warm', { maxZoom: 18, minZoom: 5 }); let normalm6 = L.tileLayer.chinaProvider('Geoq.Normal.Cold', { maxZoom: 18, minZoom: 5 });       /**        * 天地图内容        */       let normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', { maxZoom: 18, minZoom: 5 }), normala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', { maxZoom: 18, minZoom: 5 }), imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', { maxZoom: 18, minZoom: 5 }), imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', { maxZoom: 18, minZoom: 5 }); let normal = L.layerGroup([normalm, normala]), image = L.layerGroup([imgm, imga]);       /**        * 谷歌        */       let normalMap = L.tileLayer.chinaProvider('Google.Normal.Map', { maxZoom: 18, minZoom: 5 }), satelliteMap = L.tileLayer.chinaProvider('Google.Satellite.Map', { maxZoom: 18, minZoom: 5 });       /**        * 高德地图        */       let Gaode = L.tileLayer.chinaProvider('GaoDe.Normal.Map', { maxZoom: 18, minZoom: 5 }); let Gaodimgem = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', { maxZoom: 18, minZoom: 5 }); let Gaodimga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', { maxZoom: 18, minZoom: 5 });
    let Gaodimage = L.layerGroup([Gaodimgem, Gaodimga]);
    let baseLayers =
    {
      "智图地图": normalm1, "智图多彩": normalm2, "智图午夜蓝": normalm3, "智图灰色": normalm4,
      "智图暖色": normalm5, "智图冷色": normalm6, "天地图": normal, "天地图影像": image, "谷歌地图": normalMap,
      "谷歌影像": satelliteMap, "高德地图": Gaode, "高德影像": Gaodimage,
    }
    setTimeout(() => {
      let map = L.map("maps", { center: [31.59, 120.29], zoom: 11, layers: [normalm5], zoomControl: false });
      L.control.layers(baseLayers, null).addTo(map);
      L.control.zoom({ zoomInTitle: '放大', zoomOutTitle: '缩小' }).addTo(map);


      var circle = L.circle([31.59, 120.29], 500, { color: 'red', fillColor: '#f03', fillOpacity: 0.5 }).addTo(map);
    }, 200)

    // let mapOptions = {
    //   attributionControl: false
    // }
    // let mymap = L.map('maps', mapOptions).setView([51.505, -0.09], 13);
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    // { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(mymap);
  }
  render() {
    return (<div id="maps"> </div>)
  }
}
export default MapIndex