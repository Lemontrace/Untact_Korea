import * as d3 from 'd3';
import * as topojson from "topojson";
import React, {useEffect, useState} from "react";
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';
import KContent from "./KContent";
import plane from "../styles/realplane.png";
import Toggle from 'react-toggle'
import { FcCloseUpMode, FcOldTimeCamera } from "react-icons/fc";
import "react-toggle/style.css" 

export default function Content() {
  const update = () => {
    d3_korea_map('#full-map');
  }

  useEffect(()=>{
    d3_korea_map('#full-map');
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
    }
  },[]);

  const [region, setRegion] = useState("경기도");
  const [filterValue, setFilter] = useState(true);

  const f = filterValue ? "문화 축제" : "관광지";

  return (
    <main className={"content"}>
      <div className="full-map-mapper">
        <center className={"logo"}>
          <div className="title">
            <h1>Pocket Korea</h1>
          </div>
        </center>
        <div id="full-map" className="full-map"></div>
        <label>
          <Toggle
            defaultChecked={filterValue}
            icons={{
              checked: <FcCloseUpMode/>,
              unchecked: <FcOldTimeCamera/>,
            }}
            onChange={() => {
              if(filterValue == false){
                console.log("now true!");
                setFilter(true);
              }
              else {
                console.log("now false!");
                setFilter(false);
              }
            }} />
          <div> 
            {f}
          </div>
        </label>
      </div>


      <Controller>
        <Scene duration={1000}>
        {/*  */}
        
          <Timeline
            target={
              <div className="heading">
                <div className="plane-animation">
                  <img className={"plane"} src={plane} alt="plane"/>
                  
                </div>
              </div>
            }
          >
            <Tween
              to={{ x: '100%' }}
            />
          </Timeline>
        
        </Scene>
      </Controller>
      <KContent place={region} filter={filterValue}/>
      <div id="history">
        <h2>내가 다녀간 장소</h2>
        <div className="histories">

        </div>
      </div>
    </main>
  )

  function d3_korea_map(_mapContainerId){
    let WIDTH, HEIGHT;
    const MAP_CONTAINER_ID = _mapContainerId;
    const KOREA_PROVINCE_OBJECT = 'skorea_provinces_2018_geo';
  
    let projection, path, svg, geoJson, features, bounds, center, map;
    const KOREA_JSON_DATA_URL = 'https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2018/json/skorea-provinces-2018-topo-simple.json';
  
    function create(){
        HEIGHT = window.innerHeight*0.65;
        WIDTH = window.innerWidth;
  
        projection = d3.geoMercator().translate([WIDTH*0.36, HEIGHT / 2]);
        path = d3.geoPath().projection(projection);
  
        svg = d3.select(MAP_CONTAINER_ID).append("svg")
            .style("width", "100%")
            .style("height", HEIGHT)
            .style("background-color", "#86BCE3")
            .style("text-align", "center");
  
        map = svg.append("g").attr("id", "map");
  
        d3.json(KOREA_JSON_DATA_URL).then(function(_data){
            geoJson = topojson.feature(_data, _data.objects[KOREA_PROVINCE_OBJECT]);
            features = geoJson.features;
  
            bounds = d3.geoBounds(geoJson);
            center = d3.geoCentroid(geoJson);
  
            const distance = d3.geoDistance(bounds[0], bounds[1]);
            const scale = HEIGHT / distance / Math.sqrt(2) * 1.2;
  
            projection.scale(scale).center(center);
  
            map.selectAll("path")
                .data(features)
                .enter().append( "path")
                .attr("class", function(d) { return "municipality c " + d.properties.code;})
                .attr("d", path)
                .on("click", onclick)
        });
    }
  
    function onclick(d){
      setRegion(d3.select(this)._groups[0][0].__data__.properties.name);
      window.scrollTo({
        top: 1200,
        behavior: 'smooth',
      });
    }
  
    d3.select("#full-map").html("");
    create(); 
  }

}

