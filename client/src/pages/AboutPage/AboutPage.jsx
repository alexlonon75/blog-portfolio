// pages/AboutPage/AboutPage.jsx
import About from '../../components/About/About';
import PageContainer from '../../components/common/PageContainer';
import PageHeader from '../../components/common/PageHeader';

const AboutPage = () => {
  return (
    <PageContainer>
      <PageHeader title="About Alex Lonon" />
      <About />
    </PageContainer>
  );
};

export default AboutPage;