import React, { useEffect } from "react";
import { NaverMap, Marker } from "react-naver-maps";


export function MapKorea(props) {
    const navermaps = window.naver.maps; 

    const {markerloc} = props;
    let nmap = null;

    useEffect(()=>{

        console.log("loaded!!")
        nmap = document.getElementById("kmap")
        let map = new navermaps.Map(nmap, {
            center: new navermaps.LatLng(37.4666805, 126.8984147),
            zoom: 9
        })

        markerloc.map((m, l) => {
            console.log(m);
            createMarkerandViewer(map, navermaps, m)
        })
    })

    if(props){
        return (
            <div id="kmap" style={{height: 600}}></div>
        )
    }
}

const createString = (place) =>{
    return [
    '<div class="iw_inner">',
    '   <h3>', place.축제명, '</h3>',
    '   <p>', place.장소, '<br />',
            place.축제내용, '<br />',
    '       <a href="', place.홈피주소,'>', place.홈피주소,'</a>',
    '   </p>',
    '</div>'
    ].join('');
}

const createMarkerandViewer = (map, navermaps, place) => {
    let mplace = new navermaps.LatLng(place.위도, place.경도);
    
    let marker = new navermaps.Marker({
        map: map,
        position: mplace,
        title: place.축제명,
    });

    let infowindow = new navermaps.InfoWindow({
        content: createString(place)
    });

    // console.log(createString(place));
    navermaps.Event.addListener(marker, "click", function(e) {
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    });

    navermaps.Event.addListener(marker, "click", function(e) {
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    });

}