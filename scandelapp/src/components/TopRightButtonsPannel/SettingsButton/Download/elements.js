import styled from 'styled-components';
import { Yellow, Black } from '../../../../colors';
import { MdDownload } from 'react-icons/md';

export const DownloadButton = styled(MdDownload)`
    display: flex;
    position: absolute;
    height: 100px;
    width: 100px;
    top: 150px;
    left: 170px;
    color: ${(props) => (props.isDark ? Yellow : Black)};

    &:hover {
        cursor: pointer;
        height: 110px;
        width: 110px;
        top: 145px;
        left: 165px;
    }
`;
