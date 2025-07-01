// components/SecurityDashboard/SecurityDashboard.jsx
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const MetricCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 2rem;
  transition: ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  h3 {
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary};
    margin: 0;

    &::before {
      content: '▶ ';
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const StatusIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => {
    switch (props.status) {
      case 'good': return '#00aa00';
      case 'warning': return '#ffaa00';
      case 'error': return '#ff4444';
      default: return '#666666';
    }
  }};
  box-shadow: 0 0 8px ${props => {
    switch (props.status) {
      case 'good': return '#00aa0050';
      case 'warning': return '#ffaa0050';
      case 'error': return '#ff444450';
      default: return 'transparent';
    }
  }};
`;

const MetricValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.primary};
  margin: 1rem 0;
`;

const MetricLabel = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const MetricDetails = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.primary};

  &::before {
    content: '⟳ ';
    animation: spin 1s linear infinite;
    margin-right: 0.5rem;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const SecurityDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/security/dashboard`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        
        const data = await response.json();
        setDashboardData(data.overview);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [API_URL]);

  const getUptimeStatus = (uptime) => {
    if (uptime >= 99) return 'good';
    if (uptime >= 95) return 'warning';
    return 'error';
  };

  const getSSLStatus = (daysLeft) => {
    if (daysLeft > 30) return 'good';
    if (daysLeft > 7) return 'warning';
    return 'error';
  };

  const getSecurityStatus = (score) => {
    if (score >= 80) return 'good';
    if (score >= 60) return 'warning';
    return 'error';
  };

  if (loading) return <LoadingSpinner>Loading security metrics...</LoadingSpinner>;
  if (error) return <div>Error: {error}</div>;
  if (!dashboardData) return <div>No data available</div>;

  return (
    <DashboardContainer>
      <h2>Security Monitoring Dashboard</h2>
      <p style={{ color: '#a0a0a0', marginBottom: '2rem' }}>
        Real-time security metrics powered by n8n automation workflows
      </p>

      <DashboardGrid>
        <MetricCard>
          <MetricHeader>
            <h3>Website Uptime</h3>
            <StatusIndicator status={dashboardData.currentStatus ? 'good' : 'error'} />
          </MetricHeader>
          <MetricValue>{dashboardData.uptime24h}%</MetricValue>
          <MetricLabel>24-hour uptime</MetricLabel>
          <MetricDetails>
            Status: {dashboardData.currentStatus ? 'Online' : 'Offline'}
          </MetricDetails>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <h3>SSL Certificate</h3>
            <StatusIndicator status={getSSLStatus(dashboardData.sslDaysLeft)} />
          </MetricHeader>
          <MetricValue>{dashboardData.sslDaysLeft}</MetricValue>
          <MetricLabel>Days until expiry</MetricLabel>
          <MetricDetails>
            Grade: {dashboardData.sslGrade}
          </MetricDetails>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <h3>Security Headers</h3>
            <StatusIndicator status={getSecurityStatus(dashboardData.securityScore)} />
          </MetricHeader>
          <MetricValue>{dashboardData.securityScore}</MetricValue>
          <MetricLabel>Security score</MetricLabel>
          <MetricDetails>
            Grade: {dashboardData.securityGrade}
          </MetricDetails>
        </MetricCard>
      </DashboardGrid>

      <MetricDetails style={{ textAlign: 'center', marginTop: '2rem' }}>
        Last updated: {new Date(dashboardData.lastUpdated).toLocaleString()}
      </MetricDetails>
    </DashboardContainer>
  );
};

export default SecurityDashboard;
