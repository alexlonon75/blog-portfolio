// pages/PortfolioPage/PortfolioPage.jsx
import { useEffect } from 'react';
import Portfolio from '../../components/Portfolio/Portfolio';

const PortfolioPage = () => {
  useEffect(() => {
    document.title = 'Alex Lonon | Portfolio';
  }, []);

  return (
    <div>
      <h1>My Work</h1>
      <Portfolio />
    </div>
  );
};

export default PortfolioPage;