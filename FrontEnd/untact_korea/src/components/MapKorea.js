import React, { useEffect, useState } from "react";
import { NaverMap, Marker } from "react-naver-maps";
import s from "../styles/lighter.png"
const axios = require("axios");

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

const createString = (place, videoId) =>{
    return [
        '<div class="iw_inner">',
        '   <h3>', place.축제명, '</h3>',
        '   <iframe width="400" height="240" src="https://www.youtube.com/embed/', videoId, '" title="untactravel" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        '   <p>', place.장소, '<br />',
                place.축제내용, '<br />',
        '       <a href="', place.홈피주소,'>', place.홈피주소,'</a>',
        '   </p>',
        
        '</div>'
    ].join('');
}

const createMarkerandViewer = (map, navermaps, place) => {
    const URL = "http://3.35.61.16:50816/searchYoutube"
    let mplace = new navermaps.LatLng(place.위도, place.경도);
    let HOME_PATH = window.HOME_PATH || '.';
    let marker = new navermaps.Marker({
        map: map,
        position: mplace,
        title: place.축제명,
        splace: place.장소,
        detail: place.축제내용,
        animation: navermaps.Animation.DROP,
        icon: {
            url: s,
            size: new navermaps.Size(50, 52),
            origin: new navermaps.Point(0, 0),
            anchor: new navermaps.Point(25, 26)
        }
    });
    

    let infowindow = new navermaps.InfoWindow({content: ''});

    navermaps.Event.addListener(marker, "click", function(e) {
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            axios.get(URL, {
                params: {
                    keyword: place.축제명
                }
            }).then(res =>{
                infowindow.setContent(createString(place, res.data));
            });
        }
    });

    navermaps.Event.addListener(infowindow, "content_changed", function(e) {
        infowindow.open(map, marker);
    });


    navermaps.Event.addListener(marker, "rightclick", function(e) {
        console.log("hi");
    });

}