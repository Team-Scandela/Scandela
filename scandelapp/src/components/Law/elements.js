// components/lawElements.js
import styled from 'styled-components';

export const LawsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  height: 100vh;
  overflow-y: auto;
`;

export const ScrollableContainer = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding-right: 10px;
`;

export const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 20px;
  width: 80%;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
  width: 80%;
`;

export const LawCard = styled.a`
  background: #fff;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  text-decoration: none;
  color: black;
  flex: 1 1 200px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const LawSection = styled.div`
  background: #fff;
  padding: 20px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

export const SectionContent = styled.div`
  font-size: 1em;
`;

export const ImpactList = styled.div`
  margin-top: 10px;

  ul {
    padding-left: 20px;
  }

  li {
    margin-bottom: 5px;
  }
`;

export const FAQSection = styled.div`
  background: #fff;
  padding: 20px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%;
`;

export const CaseStudySection = styled.div`
  background: #fff;
  padding: 20px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%;
`;

export const ResourcesSection = styled.div`
  background: #fff;
  padding: 20px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%;
`;

export const TestimonialSection = styled.div`
  background: #fff;
  padding: 20px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%;
`;

export const NewsSection = styled.div`
  background: #fff;
  padding: 20px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%;
`;
