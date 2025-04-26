import styled from 'styled-components';

export const Header = styled.header`
    display:inline-flex;
    background-color:#006BCF;
    position: sticky;
    top: 0;
    width: 100%;
    padding: 1rem;
    #logo {
    width: 10rem;
    }
`
export const MenuMobile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    text-align: right;
    background-color: #006BCF;
    height: 100vh;
    position: fixed;
    top: 0;
    right: ${({ open }) => (open ? '0' : '-100%')};
    width: 65%;
    padding: 20px;
    gap: 20px;
    z-index: 9999;
    transition: right 0.5s ease-in-out;

    ul {
        display: flex;
        flex-direction: column;
        gap: 20px;
        
        li a {
            color: white;
            font-size: 1.6rem;
            text-decoration: none;
            position: relative;
            padding: 5px 0;

            &::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 0;
                height: 5px;
                background: #000;
                border-radius: 5px;
                transition: width 1s ease-in-out;
            }

            &:hover::after {
                width: 100%;
            }
        }
    }
`

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9998;
    opacity: ${({ open }) => (open ? '1' : '0')};
    pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
    transition: opacity 0.3s ease-in-out;
`
export const MenuIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: auto;
`
export const ButtonRegister = styled.button`
    background-color:transparent;
    border: 1px solid white;
    padding: 1rem;
    border-radius: 0.5rem;
    width: 11rem;
    cursor: pointer;
    color: white;
    font-size: 1.4rem;
`