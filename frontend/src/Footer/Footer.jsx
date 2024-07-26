import React from 'react';
import styled, { keyframes } from 'styled-components';

const waveAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const fadeInAnimation = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FooterContainer = styled.footer`
  background-color: #b5c9af;
  color: #333;
  padding: 0.5rem 0; // Reduced padding
  position: relative;
  overflow: hidden;
  font-family: Didot, serif;
`;

const WaveBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 15px; // Reduced height
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.3' d='M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,202.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
  background-size: 50% 100%;
  animation: ${waveAnimation} 20s linear infinite;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Logo = styled.h2`
  font-size: 1.2rem; // Reduced font size
  margin: 0;
  color: #333;
  animation: ${fadeInAnimation} 1s ease-out;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; // Reduced gap
  animation: ${fadeInAnimation} 1s ease-out 0.3s backwards;
`;

const ContactItem = styled.a`
  margin: 0;
  font-size: 0.8rem; // Reduced font size
  color: #333;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 3px; // Reduced gap
  &:hover {
    color: #555;
  }
  i {
    font-size: 0.9rem; // Reduced icon size
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <WaveBackground />
      <ContentContainer>
        <Logo>Meal Master</Logo>
        <ContactInfo>
          <ContactItem href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </ContactItem>
          <ContactItem>Aniyah Bunn</ContactItem>
          <ContactItem href="mailto:aniyahcamile@gmail.com">
            <i className="fas fa-envelope"></i> aniyahcamile@gmail.com
          </ContactItem>
          <ContactItem href="https://github.com/aniyahb" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i> aniyahb
          </ContactItem>
        </ContactInfo>
      </ContentContainer>
    </FooterContainer>
  );
};

export default Footer;
