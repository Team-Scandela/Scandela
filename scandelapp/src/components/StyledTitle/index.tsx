import React from 'react';
import { TitleContainer } from './elements';

const StyledTitle = ({ children }: { children: React.ReactNode }) => {
    return <TitleContainer>{children}</TitleContainer>;
};

export default StyledTitle;
