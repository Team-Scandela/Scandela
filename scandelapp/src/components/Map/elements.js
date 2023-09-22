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
`;