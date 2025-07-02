// pages/PortfolioPage/PortfolioPage.jsx
import { useEffect } from 'react';
import Portfolio from '../../components/Portfolio/Portfolio';
import PageContainer from '../../components/common/PageContainer';
import PageHeader from '../../components/common/PageHeader';

const PortfolioPage = () => {
  useEffect(() => {
    document.title = 'Alex Lonon | Portfolio';
  }, []);

  return (
    <PageContainer>
      <PageHeader title="My Work" />
      <Portfolio />
    </PageContainer>
  );
};

export default PortfolioPage;