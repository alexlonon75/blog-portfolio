// pages/ContactPage/ContactPage.jsx
import Contact from '../../components/Contact/Contact';
import PageContainer from '../../components/common/PageContainer';
import PageHeader from '../../components/common/PageHeader';

const ContactPage = () => {
  return (
    <PageContainer>
      <PageHeader title="Get in Touch" />
      <Contact />
    </PageContainer>
  );
};

export default ContactPage;