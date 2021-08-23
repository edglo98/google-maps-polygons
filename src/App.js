import './App.css';
import { GoogleMap, Marker, withGoogleMap, withScriptjs, Polygon, Circle } from "react-google-maps"
import { useCallback, useRef, useState } from 'react';

function Mapitas() {
  const [coords, setCoords] = useState([
    { lat: 21.0153762, lng: -89.6404101 },
    { lat: 20.9967549, lng: -89.6111921 },
    { lat: 20.9595054, lng: -89.6322628, }
  ])

  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map(latLng => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
        setCoords(nextPath);
    }
  }, [setCoords]);

  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);


  console.log("The path state is", coords);

  return (
    <div className="App">
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 20.9802115, lng: -89.7029586 }}
      >
        {<Marker draggable position={{ lat: 20.9802115, lng: -89.7029586 }} />}
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
        />
        <Polygon
          path={coords}
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
          onMouseUp={onEdit}
          onDragEnd={onEdit}
          onLoad={onLoad}
          onUnmount={onUnmount}
        />
      </GoogleMap>
    </div>
  );
}

const MapApp = withScriptjs(withGoogleMap(Mapitas));

 const App = () => {
  return <MapApp
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDCfCGAAlPuiP4XU-FkgluJo98034y0h3g"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100vh` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
}

export default App
