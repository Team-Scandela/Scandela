import styled from 'styled-components';

export const PopupContainer = styled.div`
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  width: 100%;
  background-color: #FFD700; /* Yellow */
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-weight: bold;
`;

export const DescriptionBox = styled.div`
  width: 100%;
  background-color: #000; /* Black */
  color: #fff;
  padding: 10px;
  text-align: left;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #000;
  padding: 0;
`;
