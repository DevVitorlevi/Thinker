// styles/Flash.js

import styled from 'styled-components';

export const Message = styled.div`
    padding: 16px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    animation: slideIn 4s;

    @keyframes slideIn {    
        0% {
            transform: translateX(500px);
        }
        50%{
            transform: translateX(0);
        }
        100% {
            transform: translateX(500px);
        }
    }
    &.success {
        background-color: #28a745;
    }

    &.error { 
        background-color: #dc3545;
    }

    &.visible {
        transform: translateY(0);
    }
`;
