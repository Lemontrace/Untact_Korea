import React, {createElement, useEffect, useState} from "react";
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

        let x, y;
        if (markerloc.length == 0) {
            x = 37.474331;
            y = 126.868457;
        } else if (markerloc[0].지역 == '세종특별자치시' 
                    || markerloc[0].지역 == '광주광역시') {
            x = markerloc[0].위도;
            y = markerloc[0].경도;
        } else {
            x = markerloc[5].위도;
            y = markerloc[5].경도;
        }

        let map = new navermaps.Map(nmap, {
            center: new navermaps.LatLng(x, y),
            zoom: 9
        });

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
    let description = place.축제내용;
    if (description.length > 35) {
        description = description.substr(0, 32) + "...";
    }
    return [
        '<div class="iw_inner" style="margin:10%">',
        '   <h3>', place.축제명, '</h3>',
        '   <iframe width="100%" height="240" src="https://www.youtube.com/embed/', videoId, '" title="untactravel" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        '   <p><b>장소</b>: ', place.장소, '<br />',
               '<b>축제내용</b>: ' ,description, '<br />',
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
                insertHistory(marker.title, res.data);
            });
        }
    });

    /* 방문 기록 저장 */
    function insertHistory(place, youtubeID) {
        let div = document.createElement('div');

        if(typeof(place) == "string") {
            let h3 = document.createElement('h3');
            h3.append(place);
            div.append(h3);
            div.setAttribute("style", `background-image: url('https://i.ytimg.com/vi/${youtubeID}/mqdefault.jpg');`);
        }
        else
            div.append('place');

        document.getElementsByClassName("histories")[0].append(div);
    }

    navermaps.Event.addListener(infowindow, "content_changed", function(e) {
        infowindow.open(map, marker);
    });



    navermaps.Event.addListener(marker, "rightclick", function(e) {
        console.log("hi");
    });
}