export const drawLine = (map, data, color, id) => {
    // var map = window.mainMap;
    if (map) {
        map.on('load', function () {
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
        });
    }

}

export const drawSpot = (map, mapboxgl, color, id) => {
    let markerList = []
    var geojson = {
        "type": "FeatureCollection",
        "features":
            [
                {
                    "type": "Feature",
                    "color": 'type1',
                    "properties":
                    {
                        "marker-color": "#008000",
                        "marker-size": "medium",
                        "marker-symbol": "",
                        "name": "杭州"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [121.475197, 31.232767]
                    }
                },
                {
                    "type": "Feature",
                    "color": 'type2',
                    "properties":
                    {
                        "marker-color": "#008000",
                        "marker-size": "medium",
                        "marker-symbol": "",
                        "name": "杭州"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [121.487324, 31.229663]
                    }
                },
            ]
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
                .setHTML(renderHtml(1)))
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
            <li><span>事件类型 ：</span><span>交通事故</span></li>
            <li><span>事件时间 ：</span><span>2020.6.18 18:30</span></li>
            <li><span>所属路段 ：</span><span>杨高南路</span></li>
            <li><span>事件状态 ：</span><span>事故车</span></li>
        </ul>
        <div class="popup-content-bottom">
            <div>实时</div>
            <div>回放</div>
            <div>一车一档</div>
            <div>完成处置</div>
        </div>
    </div>`
}
