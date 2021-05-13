import * as d3 from 'd3';
import * as topojson from "topojson";
import {useEffect} from "react";
import KContent from "./KContent";
import KoreaMap from "./KoreaMap";

export default function Content() {
  return (
    <main className={"content"}>
      <div id="full-map">
        <KoreaMap/>
      </div>

      <div className="plane-animation">
        <img className={"plane"} src="./plane.svg" alt="plane"/>
        <img className={"flying-route"} src="./flying-route.svg" alt="flying line"/>
      </div>

      <div className="local-map-border">
        <div className="local-map">
          <KContent/>
        </div>
      </div>
    </main>
  )
}