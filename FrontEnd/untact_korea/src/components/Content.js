import * as d3 from 'd3';
import * as topojson from "topojson";

function Content() {
  return (
    <main>
      <script>
        function initialize(){
            d3_korea_map('#map')
        }
      </script>
      <div id="map"></div>
    </main>
  )
}

function d3_korea_map(_mapContainerId){
  console.log(1);
  var WIDTH, HEIGHT,
      MAP_CONTAINER_ID = _mapContainerId,
      KOREA_PROVINCE_OBJECT = 'skorea_provinces_2018_geo';

  var projection, path, svg,
      geoJson, features, bounds, center,
      map;
  var KOREA_JSON_DATA_URL = 'https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2018/json/skorea-provinces-2018-topo-simple.json';

  function create(){
      HEIGHT = window.innerHeight;
      WIDTH = window.innerWidth;

      projection = d3.geoMercator().translate([WIDTH / 2.5, HEIGHT / 2]);
      path = d3.geoPath().projection(projection);

      d3.select(MAP_CONTAINER_ID).html("");

      svg = d3.select(MAP_CONTAINER_ID).append("svg")
          .attr("width", WIDTH)
          .attr("height", HEIGHT);

      map = svg.append("g").attr("id", "map");

      d3.json(KOREA_JSON_DATA_URL).then(function(_data){
          geoJson = topojson.feature(_data, _data.objects[KOREA_PROVINCE_OBJECT]);
          features = geoJson.features;

          bounds = d3.geoBounds(geoJson);
          center = d3.geoCentroid(geoJson);

          var distance = d3.geoDistance(bounds[0], bounds[1]);
          var scale = HEIGHT / distance / Math.sqrt(2) * 1.2;

          projection.scale(scale).center(center);

          map.selectAll("path")
              .data(features)
              .enter().append( "path")
              .attr("class", function(d) { console.log(d);
                  return "municipality c " + d.properties.code;})
              .attr("d", path)
              .on("click", onclick)
              .on('mouseover', mouseover)
              .on('mouseout', mouseout);
      });
  }

  create();

  function onclick(d){
    console.log(d3.select(this)._groups[0][0].__data__.properties.name);
  }
  
  function mouseout(d){
    d3.select(this).style('fill', '#808080');
  }

  function mouseover(d){
    d3.select(this).style('fill', '#1483ce');
  }
}

export default Content;