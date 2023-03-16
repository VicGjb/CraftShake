import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import ReactGA from 'react-ga';
import { useEffect } from 'react';
import { sendAmplitudeData } from '../Amplitude/amplitude';
import { initAmplitude } from '../Amplitude/amplitude';

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

