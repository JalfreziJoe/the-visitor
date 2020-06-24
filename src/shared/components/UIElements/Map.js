import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = props => {
  const mapref = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    new window.ol.Map({
      target: mapref.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lon, center.lat]),
        zoom: zoom,
      }),
    });
  }, [center, zoom]);

  return (
    <div
      ref={mapref}
      className={`map ${props.className}`}
      id="map"
      style={props.style}
    ></div>
  );
};

export default Map;
