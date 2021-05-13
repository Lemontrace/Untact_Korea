import React, {useEffect, useState} from "react";
import {MapKorea} from "./MapKorea";




export function KContent(props) {
    // prop : place{경기도, 경상남도, 부산광역시 등...}
    const [isLoading, setLoading] = useState(true);
    const [places, setPlaces] = useState();
    const axios = require("axios");
    const [region, setRegion] = useState(props.place);
    const { place } = props;
    console.log("plotkeyprop: ", props.place);
    
    const URL = "http://3.35.61.16:50816/getFestivals"

    useEffect(() =>{
        // console.log("getting p");
        axios.get(URL, {
            params: {
                location: place
            }
        }).then(res =>{
            setPlaces(res.data);
            setLoading(false);
            console.log("get new region: ", region);
        })
        setRegion(place)
    }, [place])

    

    if (isLoading){
        console.log("loading!!");
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