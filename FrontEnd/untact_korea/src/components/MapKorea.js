import React, {useState, useEffect } from "react";
import { RenderAfterNavermapsLoaded, NamerMap, NaverMap, Marker } from "react-naver-maps";


export function MapKorea(props) {
    const navermaps = window.naver.maps; 
    const {markerloc} = props;

    if(props){
        return (
            <NaverMap
                id={"map"} // default: react-naver-map
                style={{
                    width: '100%', // 네이버지도 가로 길이
                    height: 600, // 네이버지도 세로 길이

                }}
                defaultCenter={{ lat: 37.554722, lng: 126.990833 }} // 지도 초기 위치
                zoom={8}
            >
            
            {
                markerloc.map((l, i) =>{
                    console.log("make marker: ", l);
                    return <Marker 
                    position={new navermaps.LatLng(Number(l.위도), Number(l.경도))}
                    animation={navermaps.Animation.DROP}
                    onClick={() => {
                        alert('여기는 ' + l.축제명 + "입니다")
                    }} 
                    key={i}
                    />
                })
            }
            
            </NaverMap>
        )
    }
    else{
        return (
            <NaverMap
            id={"map"} 
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