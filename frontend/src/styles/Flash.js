// styles/Flash.js

import styled from 'styled-components';

export const Message = styled.div`
    padding: 16px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

    &.success {
        background-color: #28a745;
        border: 2px solid #218838;
    }

    &.error {
        background-color: #dc3545;
        border: 2px solid #c82333;
    }

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
