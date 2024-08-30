import styled from 'styled-components';

export const ImageContainer = styled.div`
  background-color: white;
  border: 1px solid black;
  display: inline-block;
  cursor: pointer;
  padding: 10px;
  text-align: center;
  position: relative;
  z-index: 10000;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 400px;
  height: 300px;
  position: relative;
`;

export const legendHeatmapImage = styled.div`
  width: 100px;
  height: 100px;
`;

export const closeButton = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
`;
