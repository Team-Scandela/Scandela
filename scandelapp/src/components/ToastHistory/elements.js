import styled from 'styled-components';
import { Yellow, Black, White, Grey, DarkYellow, DarkGrey } from '../../colors';
import { IoNotifications } from "react-icons/io5";


/** Button who allows to open the toast history pannel */
export const ToastHistoryButton = styled.div`
    position: absolute;
    display: flex;
    width: 70px;
    height: 40px;
    top: 100px;
    left: ${(props) => (props.show ? '195px' : '0%')};
    border-radius: 0px 8px 8px 0px;
    cursor: pointer;

    background-color: ${(props) =>
        props.isDark ? Black : White };
    color: ${(props) => (props.isDark ? DarkYellow : Black)};
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.75);

    transition: all 0.5s ease-in-out;
    transform: ${(props) =>
        props.show ? 'translate(0%, -50%)' : 'translate(0%, -50%)'};

    &:hover {
        color: ${(props) => (props.isDark ? Yellow : Black)};
    }
`;

export const ToastHistoryButtonIcon = styled(IoNotifications)`
    position: absolute;
    display: flex;
    margin-left: 30px;
    margin-top: 5px;
    `;

/** History pannel */
export const ToastHistoryPannel = styled.div`
    position: absolute;
    display: flex;
    width: 210px;
    height: 440px;
    top: 300px;
    left: ${(props) => (props.show ? '0%' : '-210px')};
    border-radius: 0px 8px 8px 0px;

    background-color: ${(props) =>
        props.isDark ? Black : White };
    color: ${(props) => (props.isDark ? DarkYellow : Black)};
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.75);

    transition: all 0.5s ease-in-out;
    transform: ${(props) =>
        props.show ? 'translate(0%, -50%)' : 'translate(0%, -50%)'};
`;

/** Main text on the toast history pannel */
export const NotificationsText = styled.div`
    position: fixed;
    top: 2px;
    left: 5px;
    font-size: 25px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    transform: perspective(10px) rotateX(2deg);
    letter-spacing: 2px;
    padding: 10px;
    background: linear-gradient(to right, ${Yellow}, #ffd700);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
`;

/** Container of the notifications */
export const NotificationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    left: 10px;
    top: 50px;
    width: 190px;
    height: 380px;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isDark ? DarkGrey + 'FF' : Yellow + 'FF'};
`;

/** Container of the notification template */
export const NotificationTemplateContainer = styled.div`
    display: flex;
    position: absolute;
    width: 178px;
    height: 48px;
    left: 0px;
    top: ${(props) => props.y}px;
    border-radius: 5px;
    overflow: hidden;
    background-color: ${(props) => (props.isDark ? Grey + 'FF' : Grey + 'FF')};
    margin: 6px;
    border: 2px solid ${Black};
`;

/** Style of the notification description text */
export const DescriptionText = styled.p`
    position: relative;
    top: 7px;
    left: 5px;
    font-size: 13px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : Black)};
    font-weight: 500;
    max-width: 170px;
`;

/** Style of the notification time text */
export const TimeText = styled.p`
    position: absolute;
    top: 27px;
    left: 100px;
    font-size: 13px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : Black)};
    font-weight: 700;
`;