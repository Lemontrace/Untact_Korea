import React, {useState, useEffect } from "react";
import { RenderAfterNavermapsLoaded, NamerMap, NaverMap, Marker } from "react-naver-maps";


export function MapKorea(props) {

    const navermaps = window.naver.maps; 
    const {markerloc, onClick} = props;

    
    return <Marker 
    position={new navermaps.LatLng(Number(markerloc.위도), Number(markerloc.경도))}
    animation={navermaps.Animation.DROP}
    onClick={onClick} 
    key={i}
    />


}