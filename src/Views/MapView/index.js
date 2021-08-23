import React, { useState } from 'react'
import Map from '../../components/Map'

export const MapView = () => {
  const [ polygons, setPolygon ] = useState(0)

  return (
    <div style={{display: 'flex'}}>
      <div style={{width: '20%', height: '100%'}}>
        <button
          onClick={()=>setPolygon(polygons+1)}
        >
          + Add polygon
        </button>
      </div>
      <Map
        polygons={polygons}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp"
        containerElement={<div style={{ height: `100vh`, flex: 1 }} />}
        loadingElement={<div style={{ height: `100vh`, flex: 1 }} />}
        mapElement={<div style={{ height: `100vh`, flex: 1 }} />}
      />
    </div>
  )
}
