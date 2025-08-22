import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 20px #10b981, 0 0 40px #059669;
  }
  50% {
    box-shadow: 0 0 30px #34d399, 0 0 60px #059669, 0 0 80px #10b981;
  }
  100% {
    box-shadow: 0 0 20px #10b981, 0 0 40px #059669;
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: radial-gradient(
    circle,
    rgba(5, 150, 105, 0.1) 0%,
    rgba(255, 255, 255, 0) 70%
  );
`;

const xSpinner = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: conic-gradient(
    #0000 30%,
    #10b981 40%,
    #34d399 50%,
    #059669 60%,
    #047857 70%,
    #0000 80%
  );
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 12px), #000 0);
  mask: radial-gradient(farthest-side, #0000 calc(100% - 12px), #000 0);
  animation: ${rotate} 1.2s infinite linear, ${glow} 2s infinite ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: conic-gradient(
      transparent 0deg,
      transparent 180deg,
      rgba(16, 185, 129, 0.5) 180deg,
      rgba(16, 185, 129, 0.5) 360deg
    );
    animation: ${rotate} 3s infinite linear reverse;
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: conic-gradient(
      transparent 0deg,
      transparent 120deg,
      rgba(52, 211, 153, 0.3) 120deg,
      rgba(52, 211, 153, 0.3) 240deg,
      transparent 240deg,
      transparent 360deg
    );
    animation: ${rotate} 4s infinite linear;
    z-index: -2;
  }
`;

const Logo = styled.img`
  width: 400px;
  height: 400px;
  object-fit: contain;
  animation: ${pulse} 1.5s infinite ease-in-out;
  filter: drop-shadow(0 0 8px rgba(5, 150, 105, 0.5));
`;

export default function Spinner() {
  return (
    <SpinnerWrapper>
      <xSpinner>
        <Logo src="/images/logos/green-logo.svg" alt="Logo" />
      </xSpinner>
    </SpinnerWrapper>
  );
}
