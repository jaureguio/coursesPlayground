import React from "react";
import styled from "styled-components";

const CloseIconWrapper = styled.svg`
  width: 100%;
  height: 100%;
`;

export const CloseIcon = () => (
  <CloseIconWrapper>
    <path
      d="M8.12505 7.78001L13.725 2.20001C14.025 1.90241 14.025 1.43121 13.725 1.15841C13.425 0.860811 12.95 0.860811 12.675 1.15841L7.07505 6.73841L1.45005 1.15841C1.15005 0.860811 0.675049 0.860811 0.400049 1.15841C0.100049 1.45601 0.100049 1.92721 0.400049 2.20001L6.00005 7.78001L0.400049 13.36C0.100049 13.6576 0.100049 14.1288 0.400049 14.4016C0.550049 14.5504 0.750049 14.6248 0.925049 14.6248C1.10005 14.6248 1.30005 14.5504 1.45005 14.4016L7.07505 8.82161L12.7 14.4016C12.85 14.5504 13.05 14.6248 13.225 14.6248C13.4 14.6248 13.6 14.5504 13.75 14.4016C14.05 14.104 14.05 13.6328 13.75 13.36L8.12505 7.78001Z"
      fill="#010101"
    />
  </CloseIconWrapper>
);