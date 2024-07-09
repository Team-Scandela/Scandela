import React from 'react';
import { InfoSectionContainer, InfoParagraph } from './elements';

const InfoSection = () => {
    return (
        <InfoSectionContainer>
            <InfoParagraph>
                Here you can find detailed statistics and rankings for your city's lighting performance.
                This section includes data on energy efficiency, environmental impact, maintenance costs,
                and the quality of lighting. Use the filters to view the data over different periods and compare
                your city's performance with other cities.
            </InfoParagraph>
        </InfoSectionContainer>
    );
};

export default InfoSection;
