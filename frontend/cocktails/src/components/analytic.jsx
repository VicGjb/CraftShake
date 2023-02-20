import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import ReactGA from 'react-ga';
import { useEffect } from 'react';
import { sendAmplitudeData } from '../utilities/amplitude';
import { initAmplitude } from '../utilities/amplitude';

function initialiseAnalytics() {
  let TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_ID; 
  ReactGA.initialize(TRACKING_ID);
}

export function PageTracking() {
  let location = useLocation();
  let [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initialiseAnalytics();
    initAmplitude()
;    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      console.log("ANALYTIC search",location.search);
      console.log('ANALYTIC pathname', location.pathname);
      ReactGA.pageview(location.pathname + location.search);
      sendAmplitudeData('page_view', {'path':location.pathname+location.search})

    }
  }, [initialized, location.pathname]);
}

