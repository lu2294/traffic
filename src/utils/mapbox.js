export const drawLine = (map, data, color, id) => {
    if (map) {
        // map.on('load', function () {
            map.addLayer({
                "id": id,
                "type": "line",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            "coordinates": data
                        }
                    }
                },
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": color,
                    "line-width": 6
                }
            });
        // });
    }

}

export const drawSpot = (map, mapboxgl, color, data) => {
    let list = []
    data.forEach((v)=>{
        list.push({
            "type": "Feature",
            "color": v.eventStatus ? 'type2': 'type1',
            "data":v,
            "properties":
            {
                "marker-color": "#008000",
                "marker-size": "medium",
                "marker-symbol": "",
                "name": "杭州"
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
        "features":list
            
    };
    geojson.features.forEach(function (marker) {
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
            ) // add popups
                .setHTML(renderHtml(marker.data)))
            .addTo(map)
        markerList.push(markerLayer)
        // var el2 = document.createElement('span');
        // el1.appendChild(el2);
        // el.addEventListener('click', function (e) {
        //     console.log(e)
        // });

    });
    return markerList
};

function renderHtml(data) {
    return `<div class="popup-content">
        <ul>
            <li><span>事件类型 ：</span><span>${data.eventtitle}</span></li>
            <li><span>事件时间 ：</span><span>${data.dwAbsTime}</span></li>
            <li><span>所属路段 ：</span><span>杨高南路</span></li>
            <li><span>事件状态 ：</span><span>${data.eventStatus == 1? '已处置' :'未处置'}</span></li>
        </ul>
        <div class="popup-content-bottom">
            <div>实时</div>
            <div>回放</div>
            <div>一车一档</div>
            <div>完成处置</div>
        </div>
    </div>`
}
