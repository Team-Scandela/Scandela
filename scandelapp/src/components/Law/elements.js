// components/lawElements.js
import styled from 'styled-components';
import { Grey, DarkGrey, Yellow, DarkYellow, Black } from '../../colors';

export const LawsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${DarkGrey};
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
  font-size: 2.5rem;
  font-weight: bold;
  color: ${Yellow};
  text-align: center;
  margin-bottom: 20px;
  background: ${DarkGrey};
  background: linear-gradient(to right, ${Yellow}, ${DarkYellow});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 10px 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${Black};
`;

export const Description = styled.p`
  width: 100%;
  padding: 20px;
  background-color: ${Grey};
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
  background-color: ${DarkGrey};
  align-items: center;
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
  background-color: ${Grey};
  width: 100%;

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
  width: 100%;
  background-color: ${Grey};
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
  width: 100%;
  background-color: ${Grey};
`;

export const CaseStudySection = styled.div`
  background: #fff;
  padding: 20px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  background-color: ${Grey};
`;

export const ResourcesSection = styled.div`
  background: #fff;
  padding: 20px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  background-color: ${Grey};
`;

export const TestimonialSection = styled.div`
  background: #fff;
  padding: 20px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  background-color: ${Grey};
`;

export const NewsSection = styled.div`
  background: #fff;
  padding: 20px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  background-color: ${Grey};
`;
