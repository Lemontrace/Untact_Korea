import React, {useState, useEffect } from "react";
import { RenderAfterNavermapsLoaded, NamerMap, NaverMap } from "react-naver-maps";

function Content() {


  return (
    <main>
      <div id="map">

      </div>  
      <NaverMap id="mapsimple" style={{
        width: '100%',
        height: '600px',
      }} />


    </main>
  )
}



export default Content;