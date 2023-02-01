import React from 'react';
import { Routing } from './components/router';
import ReactGA from 'react-ga';


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