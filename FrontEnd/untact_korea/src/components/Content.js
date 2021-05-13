import * as d3 from 'd3';
import * as topojson from "topojson";

export default function Content() {
  return (
    <main className={"content"}>
      <div className="maps">
        <div className="full-map">
          <script>
            function initialize(){
            d3_korea_map('.full-map')
          }
          </script>
        </div>
        <div className="description">

        </div>
      </div>

      <div className="plane-animation">
        <img className={"plane"} src="./plane.svg" alt="plane"/>
        <img className={"flying-route"} src="./flying-route.svg" alt="flying line"/>
      </div>

      <div className="local-map-border">
        <div className="local-map">

        </div>
      </div>
    </main>
  )
  
}

function d3_korea_map(_mapContainerId){
  let WIDTH, HEIGHT;
  const MAP_CONTAINER_ID = _mapContainerId;
  const KOREA_PROVINCE_OBJECT = 'skorea_provinces_2018_geo';

  let projection, path, svg, geoJson, features, bounds, center, map;
  const KOREA_JSON_DATA_URL = 'https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2018/json/skorea-provinces-2018-topo-simple.json';

  function create(){
      HEIGHT = window.innerHeight;
      WIDTH = window.innerWidth;

      projection = d3.geoMercator().translate([WIDTH / 2.5, HEIGHT / 2]);
      path = d3.geoPath().projection(projection);

      svg = d3.select(MAP_CONTAINER_ID).append("svg")
          .attr("width", WIDTH)
          .attr("height", HEIGHT);

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
    console.log(d3.select(this)._groups[0][0].__data__.properties.name);
  }

  d3.select("#smap").html("");
  create(); 
}