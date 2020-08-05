// import React, { useState, useEffect } from 'react'
// /**
//  * @property initalList: { lnglat, iconType, shadowType, popContent }[]
//  */
// const DrawLine = (data, color, id) => {
//   const [heatList, setHeatList] = useState(data)
//   const mainMap = window.mainMap
//   useEffect(() => {
//     mainMap.on('load', function () {
//         mainMap.addLayer({
//                 "id": id,
//                 "type": "line",
//                 "source": {
//                     "type": "geojson",
//                     "data": {
//                         "type": "Feature",
//                         "properties": {},
//                         "geometry": {
//                             "type": "LineString",
//                             "coordinates": data
//                         }
//                     }
//                 },
//                 "layout": {
//                     "line-join": "round",
//                     "line-cap": "round"
//                 },
//                 "paint": {
//                     "line-color": color,
//                     "line-width": 4
//                 }
//             });
//         });
//   }, [heatList])
//   return [heatList, setHeatList]
// }

// export default DrawLine