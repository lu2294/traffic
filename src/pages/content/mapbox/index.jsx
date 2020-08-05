import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
const Map = ReactMapboxGl({ accessToken: 'pk.eyJ1IjoibHh0aWFudGlhbiIsImEiOiJjaXd2ZjlkYnQwMTZvMnRtYWZnM2lpbHFvIn0.ef3rFZTr9psmLWahrqap2A' });

class MapGl extends Component {
    render() {
        const newStyle = {
            "version": 8,
            "sources": {
                "raster-tiles":
                {
                    "type": "raster",
                    "tiles": ['http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'],
                    "tileSize": 256,
                }
            },
            "layers":
                [{ "id": "tdt-img-tiles", "type": "raster", "source": "raster-tiles", "minzoom": 0, "maxzoom": 22 }]
        }
        return (
            <Map style={newStyle} containerStyle={{ height: '100vh', width: '100vw' }} center={[121.489918, 31.222091]}    zoom={[15]}         >
                <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                    <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                </Layer>
            </Map>
        )
    }
}
export default MapGl;