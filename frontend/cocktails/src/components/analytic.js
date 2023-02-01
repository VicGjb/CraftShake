import React, { useEffect } from 'react';

const Analytics = () => {
  useEffect(() => {
    window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
    ga('create', process.env.GOOGLE_ANALYTICS_ID, 'auto');
    ga('send', 'pageview', window.location.pathname);
    console.log('HEY FROM GOOGLE ANALYTIC I SEE THE TRACK ID',process.env.GOOGLE_ANALYTICS_ID)
  }, []);

  return null;
};

export default Analytics;