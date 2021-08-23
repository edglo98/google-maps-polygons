import { GoogleMap, Marker, withGoogleMap, withScriptjs, Polygon, Circle } from "react-google-maps"
import { useCallback, useRef, useState } from 'react';

const DEFAULT_COORDS = [
  { lat: 21.0153762, lng: -89.6404101 },
  { lat: 20.9967549, lng: -89.6111921 },
  { lat: 20.9595054, lng: -89.6322628, }
]

function Map({polygons}) {


  const polygonsRef = useRef([])
  // const [polygonsRef, setRef] = useState([])
  // const polygonRef = useRef(null);
  // const listenersRef = useRef([]);

  // const onEdit = useCallback(() => {
  //   if (polygonRef.current) {
  //     const nextPath = polygonRef.current
  //       .getPath()
  //       .getArray()
  //       .map(latLng => {
  //         return { lat: latLng.lat(), lng: latLng.lng() };
  //       });
  //       setCoords(nextPath);
  //   }
  // }, [setCoords]);

  const onDragEnd= (num) => {
    polygonsRef.current[num].getPath().forEach(e=>console.log({lat: e.lat(), lng: e.lng()}))
  }

  return (
    <div className="App">
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 20.9802115, lng: -89.7029586 }}
      >
        {
        /* <Marker draggable position={{ lat: 20.9802115, lng: -89.7029586 }} />
        <Circle
          draggable
          editable
          defaultCenter={{
            lat: 21.0153762,
            lng: -89.6404101
          }}
          options={{
            fillColor: "#000",
            fillOpacity: 0.4,
            strokeColor: "#000",
            strokeOpacity: 1,
            strokeWeight: 1
          }}
          radius={2000}
        /> */
        }
        {
          [...Array(polygons).keys()].map( num => (
            <Polygon
              ref={e => polygonsRef.current[num] = e }
              key={num}
              path={DEFAULT_COORDS}
              draggable={true}
              editable={true}
              options={{
                fillColor: "#000",
                fillOpacity: 0.4,
                strokeColor: "#000",
                strokeOpacity: 1,
                strokeWeight: 1
              }}
              onClick={() => {
                alert("Hola")
              }}
              // onMouseUp={onEdit}
              onDragEnd={()=>onDragEnd(num)}
            />
          ))
        }
      </GoogleMap>
    </div>
  );
}

export default withScriptjs(withGoogleMap(Map));
