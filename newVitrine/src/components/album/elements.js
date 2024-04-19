import styled from 'styled-components';
import { Black, Grey, Yellow, White } from '../../colors';

export const AlbumContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px;
    height: 500px;
    text-align: center;
    padding-top: 230px;
    padding-bottom: 230px;
`;

export const AlbumLine = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 10px;
    height: 500px;
    text-align: center;
    gap	: 50px;
`;

export const AlbumBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    text-align: center;
`;

export const AlbumPic = styled.img`
    width: 200px;
    border-radius: 10px;
`;

export const AlbumTitle = styled.h3`
    font-size: 35px;
    color: ${Black};
`;

export const AlbumText = styled.p`
    font-size: 20px;
    padding-top: 10px;
    color: ${Grey};
`;
