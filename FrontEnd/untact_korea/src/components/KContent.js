import React, {useEffect, useState} from "react";
import {MapKorea} from "./MapKorea";




export function KContent(props) {
    // prop : place{경기도, 경상남도, 부산광역시 등...}
    const [isLoading, setLoading] = useState(true);
    const [places, setPlaces] = useState();
    const axios = require("axios");
    const example = [{"축제명":"농악대축제","지역":"경기도","장소":"시민운동장","축제내용":"농악행사","홈피주소":"","위도":"37.4620073","경도":"126.8714551"},{"축제명":"농악대축제","지역":"경기도","장소":"시민운동장","축제내용":"농악행사","홈피주소":"","위도":"37.4620073","경도":"126.8714551"},{"축제명":"구름산예술제","지역":"경기도","장소":"시민회관","축제내용":"예술전시및행사","홈피주소":"","위도":"37.4776304","경도":"126.8646268"},{"축제명":"제14회 광명시평생학습축제","지역":"경기도","장소":"광명시 전역","축제내용":"학술 컨퍼런스 외","홈피주소":"http://lll.gm.go.kr/site/festival","위도":"37.4743772","경도":"126.8684796"},{"축제명":"제2회 밤일음식문화 거리 축제","지역":"경기도","장소":"밤일음식문화거리 내","축제내용":"음식점할인행사, 무료시식, 노래자랑, 초대공연 등","홈피주소":"","위도":"37.453842","경도":"126.860748"},{"축제명":"구름산예술제","지역":"경기도","장소":"시민회관","축제내용":"예술전시및행사","홈피주소":"","위도":"37.4776304","경도":"126.8646269"},{"축제명":"제16회 광명시평생학습축제","지역":"경기도","장소":"광명시 전역","축제내용":"학술 컨퍼런스 외","홈피주소":"http://lll.gm.go.kr/site/festival","위도":"37.474331","경도":"126.868457"},{"축제명":"제26회 오리문화제","지역":"경기도","장소":"광명시민체육관","축제내용":"오리이원익 영우참배/헌화식, 전시,체험마당, 먹거리장터, 학술행사 등","홈피주소":"www.gmcc.or.kr/","위도":"37.463301","경도":"126.870701"},{"축제명":"구름산예술제","지역":"경기도","장소":"시민회관","축제내용":"예술전시및행사","홈피주소":"","위도":"37.4790975","경도":"126.8648458"},{"축제명":"농악대축제","지역":"경기도","장소":"시민운동장","축제내용":"농악행사","홈피주소":"","위도":"37.46251877","경도":"126.8711648"},{"축제명":"소하도서관 책축제 팔짱, 책을 품다","지역":"경기도","장소":"소하도서관 광장 및 한내천 일대","축제내용":"프리마켓, 책축제, 전시, 공연, 체험","홈피주소":"http://www.gmlib.or.kr/soha","위도":"37.44545992","경도":"126.8879915"},{"축제명":"농악대축제","지역":"경기도","장소":"시민운동장","축제내용":"농악행사","홈피주소":"","위도":"37.4790975","경도":"126.8648458"},{"축제명":"구름산예술제","지역":"경기도","장소":"시민체육관","축제내용":"예술 전시 및 부대행사","홈피주소":"","위도":"37.46251877","경도":"126.8711648"},{"축제명":"제7회 목감천 친환경 축제","지역":"경기도","장소":"우리공원","축제내용":"주민자치프로그램 공연 및 목감천 가요제 등","홈피주소":"","위도":"37.4710361","경도":"126.8486332"},{"축제명":"평생학습도시 선언 20주년 컨퍼런스","지역":"경기도","장소":"광명시평생학습원","축제내용":"평생학습도시 선언 20주년 컨퍼런스 및 전시","홈피주소":"","위도":"37.4743772","경도":"126.8684796"},{"축제명":"(취소) 제11회 푸른 화성 지키기 환경자전거 대행","지역":"경기도","장소":"동탄센트럴파크","축제내용":"자전거 타기 행사","홈피주소":"","위도":"37.2037558152","경도":"127.0612102020"},{"축제명":"(취소) 제21회 화성 효 마라톤 대회","지역":"경기도","장소":"화성종합경기타운","축제내용":"마라톤 대회","홈피주소":"","위도":"37.1375437522","경도":"126.9242565293"}]
    let p = null;
    const {place} = props;
    console.log("plotkey: ", place);
    const URL = "http://13.125.7.202:56340/getFestivals"

    useEffect(() =>{
        // console.log("getting p");
        axios.get(URL, {
            params: {
                location: place
            }
        }).then(res =>{
            setPlaces(res.data);
            setLoading(false);
            // console.log("get p: ", res.data);
        })
        
    }, [])

    if (isLoading){
        return <div> Loading </div>
    }
    else{
        return (
            <main>
                <MapKorea markerloc={places}/>
            </main>
        )
    }
}




export default KContent;