import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import ReactGA from 'react-ga';
import { useEffect } from 'react';

function initialiseAnalytics() {
  let TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_ID; 
  ReactGA.initialize(TRACKING_ID);
}

export function PageTracking() {
  let location = useLocation();
  let [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initialiseAnalytics();
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      console.log("ANALYTIC",window.location.pathname )
      ReactGA.pageview(location.pathname);
    }
  }, [initialized, location.pathname]);
}