import React, { useEffect } from 'react';

const Analytics = () => {
  useEffect(() => {
    window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
    ga('create', 'UA-XXXXX-Y', 'auto');
    ga('send', 'pageview');
  }, []);

  return null;
};

export default Analytics;