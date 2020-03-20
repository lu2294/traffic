// import L from 'leaflet'
import React, { Component } from 'react'
import { Button } from 'antd'
import { observer, inject } from "mobx-react";
const L = window.L

@inject("map")
class MapIndex extends Component {

  constructor(props) {

    super(props)
    this.map = null;
    this.layer1 = null;
    this.layer2 = null;
    this.layer3 = null;
    this.heatLayer  = null;
  }
  componentDidMount() {

    let normalm1 = L.tileLayer.chinaProvider('Geoq.Normal.Map', { maxZoom: 18, minZoom: 5 });
    let normalm2 = L.tileLayer.chinaProvider('Geoq.Normal.Color', { maxZoom: 18, minZoom: 5 });
    let normalm3 = L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue', { maxZoom: 18, minZoom: 5 });
    let normalm4 = L.tileLayer.chinaProvider('Geoq.Normal.Gray', { maxZoom: 18, minZoom: 5 }); let normalm5 = L.tileLayer.chinaProvider('Geoq.Normal.Warm', { maxZoom: 18, minZoom: 5 }); let normalm6 = L.tileLayer.chinaProvider('Geoq.Normal.Cold', { maxZoom: 18, minZoom: 5 });       /**        * 天地图内容        */       let normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', { maxZoom: 18, minZoom: 5 }), normala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', { maxZoom: 18, minZoom: 5 }), imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', { maxZoom: 18, minZoom: 5 }), imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', { maxZoom: 18, minZoom: 5 }); let normal = L.layerGroup([normalm, normala]), image = L.layerGroup([imgm, imga]);       /**        * 谷歌        */       let normalMap = L.tileLayer.chinaProvider('Google.Normal.Map', { maxZoom: 18, minZoom: 5 }), satelliteMap = L.tileLayer.chinaProvider('Google.Satellite.Map', { maxZoom: 18, minZoom: 5 });       /**        * 高德地图        */       let Gaode = L.tileLayer.chinaProvider('GaoDe.Normal.Map', { maxZoom: 18, minZoom: 5 }); let Gaodimgem = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', { maxZoom: 18, minZoom: 5 }); let Gaodimga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', { maxZoom: 18, minZoom: 5 });
    let Gaodimage = L.layerGroup([Gaodimgem, Gaodimga]);
    let baseLayers =
    {
      "智图地图": normalm1, "智图午夜蓝": normalm3, "智图灰色": normalm4,
      "智图暖色": normalm5, "谷歌地图": normalMap,
      "谷歌影像": satelliteMap, "高德地图": Gaode, "高德影像": Gaodimage,
    }
    setTimeout(() => {
      this.map = L.map("maps", { center: [31.88, 118.89], zoom: 11, layers: [Gaode], zoomControl: false });
      L.control.layers(baseLayers, null).addTo(this.map);
      L.control.zoom({ zoomInTitle: '放大', zoomOutTitle: '缩小' }).addTo(this.map);


      var circle = L.circle([31.88, 118.88], 500, { color: 'red', fillColor: '#f03', fillOpacity: 0.5 }).addTo(this.map);
    }, 200)


  }
  mapLine = () => {
    this.clearAll();
    let latlngs = [[31.88, 118.432], [31.99, 118.56], [31.76, 118.65]];
    this.layer1 = L.polyline(latlngs, { color: 'blue' }).addTo(this.map);
  }
  mapLink = () => {
    this.clearAll();
    let markers = [];
    let pulseIcon = L.icon.pulse({
      iconSize: [12, 12],
      color: 'red'
    });
    const clist = ['#dc1818','#4517b5','#202021','#e0d00e']
    const lng = [[31.818, 118.32], [31.999, 118.586], [31.769, 118.685]];
    lng.map((v,k) => {
      markers.push(L.marker(v, { icon: L.icon.pulse({
        iconSize: [12, 12],
        color: clist[k] || 'red'
      }) }));
    })
    this.layer3 = L.featureGroup(markers).addTo(this.map);
  }
  yaoLink = () => {
    this.clearAll();
    let markers = [];
    let pulseIcon = L.icon.pulse({
      iconSize: [12, 12],
      color: 'red'
    });
    const lng = [31.76172, 117.198982];
    this.map.setView(lng, 12)
    markers.push(L.marker(lng, { icon: pulseIcon }));
    this.layer2 = L.featureGroup(markers).addTo(this.map).bindPopup(this.createHtml).openPopup();;
  }
  redLink = () => {
    this.clearAll();
    let a = '31';
    let b = '118';
    let c = [];
    for(let i=1;i<3000;i++){
      let d = Math.floor(Math.random() * (1000 - 1)) + 1;
      c.push([Number(`${a}.${d}`),Number(`${b}.${d}`)])
    }
    this.heatLayer = L.heatLayer(c,
       {radius: 25,color:'red'}).addTo(this.map);
  }
  clearAll = () => {
    if (this.layer1) {
      this.map.removeLayer(this.layer1);
    }
    if (this.layer2) {
      this.map.removeLayer(this.layer2);

    }
    if (this.layer3) {
      this.map.removeLayer(this.layer3);

    }
    if (this.heatLayer ) {
      this.map.removeLayer(this.heatLayer);

    }
  }
  createHtml = () => {
    const html = `
    <div class="pic-div">
    </div>
    `
    return html
  }
  render() {
    return (<>
      <div id="maps">

      </div>
      <div className="button-map">
        <Button type="primary" onClick={this.mapLine}>地图划线</Button>

        <Button type="primary" onClick={this.mapLink} style={{ 'display': 'block', marginTop: '5px' }}>地图聚点</Button>
        <Button type="primary" onClick={this.redLink} style={{ 'display': 'block', marginTop: '5px' }}>热力图</Button>
        <Button type="primary" onClick={this.yaoLink} style={{ 'display': 'block', marginTop: '5px' }}>姚老师</Button>
      </div>

    </>)
  }
}
export default MapIndex