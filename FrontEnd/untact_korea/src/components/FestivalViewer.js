import React, {useState, useEffect } from "react";
import { RenderAfterNavermapsLoaded, NamerMap, NaverMap, Marker } from "react-naver-maps";


export function MapKorea(props) {

    const navermaps = window.naver.maps; 
    const {markerloc, onClick} = props;


    const infoString = [
        '<div class="iw_inner">',
        '   <h3>', markerloc.축제명,'</h3>',
        '   <p>서울특별시 중구 태평로1가 31 | 서울특별시 중구 세종대로 110 서울특별시청<br />',
        
        '       <a href="',markerloc.홈피주소,  , '</a>',
        '   </p>',
        '</div>'
    ].join('');


    var infowindow = new navermaps.InfoWindow({
        content: infoString
    });
    
    navermaps.Event.addListener(marker, "click", function(e) {
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    });
    
    infowindow.open(map, marker);


    return <Marker 
    position={new navermaps.LatLng(Number(markerloc.위도), Number(markerloc.경도))}
    animation={navermaps.Animation.DROP}
    onClick={onClick} 
    key={i}
    />


}