import React from 'react';
import { useNavigate } from 'react-router-dom';
import StyledTitle from '../StyledTitle';
import { BlockPremiumContainer, BlockPremiumRedirectButton } from './elements';

const BlockPremium = () => {
    const navigate = useNavigate();

    const redirectToHomepage = () => {
        navigate('/homepage');
    };

    return (
        <BlockPremiumContainer>
            <StyledTitle>
                Page réservée aux utilisateurs premium et/ou administateur
            </StyledTitle>
            <BlockPremiumRedirectButton onClick={redirectToHomepage}>
                Retourner à la page d'accueil
            </BlockPremiumRedirectButton>
        </BlockPremiumContainer>
    );
};

export default BlockPremium;
