import React, { useEffect, useState } from "react";
import { NaverMap, Marker } from "react-naver-maps";


export function MapKorea(props) {
    const navermaps = window.naver.maps; 

    const {markerloc} = props;
    const [markers, setMarkers] = useState(props.markerloc);
    let nmap = null;

    useEffect(()=>{

        setMarkers(markerloc);
        console.log("loaded!!")
        nmap = document.getElementById("kmap")
        let map = new navermaps.Map(nmap, {
            center: new navermaps.LatLng(markerloc[5].위도, markerloc[5].경도),
            zoom: 9
        })

        markerloc.map((m, l) => {
            // console.log(m);
            createMarkerandViewer(map, navermaps, m)
        })
    }, [markerloc])

    if(props){
        return (
            <div className="local-map-border">
                <div id="kmap" className="local-map">

                </div>
            </div>
        )
    }
}

const createString = (place) =>{
    return [
    '<div class="iw_inner">',
    '   <h3>', place.축제명, '</h3>',
    '   <iframe width="400" height="240" src="https://www.youtube.com/embed/gM_yCmE8snY" title="untactravel" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
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
        animation: navermaps.Animation.DROP
    });

    let infowindow = new navermaps.InfoWindow({
        content: createString(place)
    });

    // console.log(createString(place));
    navermaps.Event.addListener(marker, "click", function(e) {
        console.log("infowindow: ", infowindow.content);
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    });

    navermaps.Event.addListener(marker, "rightclick", function(e) {
        console.log("hi");
    });

}