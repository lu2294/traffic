// import L from 'leaflet'

import React, { Component } from 'react'
import { Button } from 'antd'
import { Map, ZoomControl, TileLayer } from 'react-leaflet'
import { react_geoengine,geoengine } from 'gas.gl'
import "./index.scss"

import { observer, inject } from "mobx-react"
const { default: ReactGeoEngine, HttpDatasource, resource, MemoryDatasource } = react_geoengine



// const styleOption = {
//   strokeWidth: 7,
//   // background: '#ff0000'
//   stroke: { domain: [0,1,2,3], range: ['#ff0000','#0000ff'] },
//   valueName: 'level',
//   pattern: {
//     src: resource.arrowSample, //url
//     patternWidth: 7, //模板宽度
//     patternHeight: 7, //模板高度
//     cropOffsetX: 0, //裁剪x轴起点
//     cropOffsetY: 0, //裁剪y轴起点
//     paddingX: 10, //x轴模板间距
//     paddingY: 0, //y轴模板间距
//   },
// }

// const simpleDs = new HttpDatasource({
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "geometry": {
//         "type":"LineString",
//         "coordinates":[
//           [120.15, 30.27],[120.16, 30.28],[120.17, 30.27],[120.16, 30.26],[120.158, 30.263]
//           ]
//         },
//       "properties": {
//         "level": 0
//       }
//     }
//   ]
// }
// )
@inject("map")
class MapIndex extends Component {

  constructor(props) {

    super(props)
  }
  componentDidMount() {

  }

  render() {
    const {tileUrl,zoom} = this.props.map
    return (<div>

      <Map
      zoomControl={false}
      worldCopyJump={true}
      className='roadCrossingMap'
      style={{height: '100%', width: '100%'}}
      center={[30.27, 120.15]}
      maxZoom={14}
      minZoom={2}
      zoom={zoom}>
      <TileLayer
        url={tileUrl}
        subdomains={['01', '02', '03', '04']}
      />
       {/* <ReactGeoEngine.PolylineLayer
        {...styleOption}
        ds={simpleDs}
        name="bubble"
        layerDBIndex={1}
        onHoverObject={(hoverObj)=>{console.log(hoverObj)}}
        onClickObject={(clickObj)=>{console.log(clickObj)}}
      /> */}
    </Map>
</div>
   )
  }
}
export default MapIndex