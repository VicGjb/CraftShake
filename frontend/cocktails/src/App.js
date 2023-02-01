import React from 'react';
import { Routing } from './components/router';
import {RouteChangeTracker} from './components/router';
import ReactGA from 'react-ga';
import RouteMiddleware from './components/RouteMiddleware';

let TRACKING_ID = process.env.GOOGLE_ANALYTICS_ID; 
ReactGA.initialize(TRACKING_ID);

function App() {
  return (
    <>
      <Routing/>
      {/* <RouteMiddleware/> */}
    </>
      
  );
}

export default App;