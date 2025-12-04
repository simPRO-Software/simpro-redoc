import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

export const AlertGlobalStyle = createGlobalStyle`
  .fade-enter {
    opacity: 0;
    transform: translateY(-10px);
  }

  .fade-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .fade-exit {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-exit-active {
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
`;

const BadgeCopyBox = styled.div`
  border: 2px solid #ffdd00;
  border-radius: 0.75rem;
  display: flex;
  position: fixed;
  padding: 1rem;
  top: 0.5rem;
  right: 27.5%;
  z-index: 50;
  height: 2rem;
  align-items: center;
  background-color: #333333;
`;

const CheckIcon = styled(() => (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
    <title>tasks</title>
    <path
      fill="#FFDD00"
      d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM13 26l-6.625-8.625 2.938-3.063 3.688 4.688 11.563-9.438 1.438 1.438-13 15z"
    ></path>
  </svg>
)).attrs({
  className: 'copy-icon',
})`
  padding: 4px;
`;
const Message = styled.span`
  letter-spacing: 0.05em;
  margin-left: 1rem;
  color: #ffdd00 !important;
  font-weight: normal;
`;

interface AlertProps {
  message: string;
  showAlert: boolean;
  setShowAlert: (show: boolean) => void;
}

export default function Alert(props: AlertProps) {
  const { message, showAlert, setShowAlert } = props;

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 1500);
    }
  }, [showAlert, setShowAlert]);

  return (
    <CSSTransition in={showAlert} timeout={300} classNames="fade" unmountOnExit>
      <BadgeCopyBox>
        <CheckIcon />
        <Message className="alert-message">{message}</Message>
      </BadgeCopyBox>
    </CSSTransition>
  );
}
