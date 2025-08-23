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
    transform: scale(1.08);
    opacity: 0.95;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 25px #10b981, 0 0 50px #059669;
  }
  50% {
    box-shadow: 0 0 40px #34d399, 0 0 80px #059669, 0 0 100px #10b981;
  }
  100% {
    box-shadow: 0 0 25px #10b981, 0 0 50px #059669;
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: radial-gradient(
    circle,
    rgba(5, 150, 105, 0.12) 0%,
    rgba(255, 255, 255, 0) 70%
  );
`;

const SpinnerCircle = styled.div`
  position: relative;
  width: 220px;   /* bigger size */
  height: 220px;
  border-radius: 50%;
  background: conic-gradient(
    #0000 30%,
    #10b981 40%,
    #34d399 50%,
    #059669 60%,
    #047857 70%,
    #0000 80%
  );

  animation: ${rotate} 1.5s infinite linear, ${glow} 2s infinite ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: conic-gradient(
      transparent 0deg,
      transparent 180deg,
      rgba(16, 185, 129, 0.4) 180deg,
      rgba(16, 185, 129, 0.4) 360deg
    );
    animation: ${rotate} 3s infinite linear reverse;
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: conic-gradient(
      transparent 0deg,
      transparent 120deg,
      rgba(52, 211, 153, 0.25) 120deg,
      rgba(52, 211, 153, 0.25) 240deg,
      transparent 240deg,
      transparent 360deg
    );
    animation: ${rotate} 4s infinite linear;
    z-index: -2;
  }
`;

const Logo = styled.img`
  width: 140px;   /* larger logo */
  height: 140px;
  object-fit: contain;
  animation: ${pulse} 1.8s infinite ease-in-out;
  filter: drop-shadow(0 0 15px rgba(16, 185, 129, 0.7))
          drop-shadow(0 0 25px rgba(5, 150, 105, 0.5));
  z-index: 2; /* ensure it's above the spinner */
`;

export default function Spinner() {
  return (
    <SpinnerWrapper>
      <SpinnerCircle>
        <Logo src="/images/logos/green-logo.svg" alt="Logo" />
      </SpinnerCircle>
    </SpinnerWrapper>
  );
}
