import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import Logo from "./components/Logo";
import './styles/Logo.css'
import Content from "./components/Content";
import {KContent} from "./components/KContent";
import './styles/KContent.css'
import './styles/Content.css'

import {RenderAfterNavermapsLoaded} from 'react-naver-maps';
import * as d3 from 'd3';
import * as topojson from "topojson";


ReactDOM.render(
  <React.StrictMode>
    <Logo/>
    <Content/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
