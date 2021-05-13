import React, { useEffect } from "react";
import { NaverMap, Marker } from "react-naver-maps";


export function MapKorea(props) {
    const navermaps = window.naver.maps; 
    const {markerloc} = props;
    let nmap = null;

    useEffect(()=>{
        console.log("loaded!!")
        nmap = document.getElementById("kmap")
        
        var cityhall = new navermaps.LatLng(37.5666805, 126.9784147),
        map = new navermaps.Map(nmap, {
            center: cityhall.destinationPoint(0, 500),
            zoom: 15
        }),
        marker = new navermaps.Marker({
            map: map,
            position: cityhall
        });

    var contentString = [
            '<div class="iw_inner">',
            '   <h3>서울특별시청</h3>',
            '   <p>서울특별시 중구 태평로1가 31 | 서울특별시 중구 세종대로 110 서울특별시청<br />',
            '       02-120 | 공공,사회기관 &gt; 특별,광역시청<br />',
            '       <a href="http://www.seoul.go.kr" target="_blank">www.seoul.go.kr/</a>',
            '   </p>',
            '</div>'
        ].join('');

    var infowindow = new navermaps.InfoWindow({
        content: contentString
    });

    navermaps.Event.addListener(marker, "click", function(e) {
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    });

    infowindow.open(map, marker);

        console.log(nmap);
        console.log(navermaps)
    })

    const infoWindowContent = [
        '<div class="iw_inner">',
        '   <h3>서울특별시청</h3>',
        '   <p>서울특별시 중구 태평로1가 31 | 서울특별시 중구 세종대로 110 서울특별시청<br />',
        '       <img src="' + '/img/example/hi-seoul.jpg" width="55" height="55" alt="서울시청" class="thumb" /><br />',
        '       02-120 | 공공,사회기관 &gt; 특별,광역시청<br />',
        '       <a href="http://www.seoul.go.kr" target="_blank">www.seoul.go.kr/</a>',
        '   </p>',
        '</div>'
    ].join('');

    const infoWindow = new navermaps.InfoWindow({
        position: new navermaps.LatLng(37.554722, 126.990833),
        content: infoWindowContent,
        /*maxWidth: 140,
        backgroundColor: "#eee",
        borderColor: "#2db400",
        borderWidth: 5,
        anchorSize: new window.N.Size(30, 30),
        anchorSkew: true,
        anchorColor: "#eee",

        pixelOffset: new window.N.Point(20, -20)*/
    });

    const showVid = () =>{
        console.log("click")
        infoWindow.open(navermaps);
    }

    if(props){
        return (
            <div id="kmap" style={{height: 600}}></div>
            // <NaverMap
            //     id={"kmap"} // default: react-naver-map
            //     style={{
            //         width: '100%', // 네이버지도 가로 길이
            //         height: 600, // 네이버지도 세로 길이

            //     }}
            //     defaultCenter={{ lat: 37.554722, lng: 126.990833 }} // 지도 초기 위치
            //     zoom={8}
            // >
            
            // {
            //     markerloc.map((l, i) =>{
            //         return <Marker 
            //         position={new navermaps.LatLng(Number(l.위도), Number(l.경도))}
            //         animation={navermaps.Animation.DROP}
            //         onClick={showVid} 
            //         key={i}
            //         />
            //     })
            // }
            
            // </NaverMap>
        )
    }
    else{
        return (
            <NaverMap
            id={"kmap"} 
            style={{
                width: '100%',
                height: 600,
            }}
            defaultCenter={{ lat: 37.554722, lng: 126.990833 }}
            zoom={8}
            >
            
            </NaverMap>
        )
    }
}