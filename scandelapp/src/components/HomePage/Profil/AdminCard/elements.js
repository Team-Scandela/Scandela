import styled from 'styled-components';
import {
    Yellow,
    Black,
    DarkGrey,
    DarkYellow,
    White,
    Grey,
    LightDarkGrey,
    Red,
} from '../../../../colors';

import { AiOutlineUserDelete } from 'react-icons/ai';

export const UserCardTitle = styled.div`
    position: absolute;
    user-select: none;
    top: 5px;
    font-weight: bold;
    font-size: 20px;
`;

export const UserCardRights = styled.div`
    position: absolute;
    user-select: none;
    top: 30px;
    font-size: 15px;
`;

export const UserCardEmail = styled.div`
    position: absolute;
    user-select: none;
    top: 55px;
    font-size: 15px;
`;

export const UserCardDelete = styled(AiOutlineUserDelete)`
    position: absolute;
    right: 10px;
    top: 5px;
    font-size: 30px;
    color: ${DarkYellow};
    opacity: 1;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;
