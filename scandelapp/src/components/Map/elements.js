import styled from 'styled-components';

export const LassoOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) =>
        props.isLassoActive ? 'rgba(0, 0, 0, 0.3)' : 'transparent'};
    pointer-events: none;

    /* Rendre le composant responsive */
    @media (max-width: 768px) {
        width: 50%;
        height: 50%;
        top: 25%;
        left: 25%;
    }

    @media (max-width: 576px) {
        width: 80%;
        height: 80%;
        top: 10%;
        left: 10%;
    }
`;
