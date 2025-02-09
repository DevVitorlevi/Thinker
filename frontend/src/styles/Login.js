import styled from 'styled-components'
export const Container = styled.div` 
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    font-family: 'Josefin Sans', sans-serif; /* Aplica a fonte apenas aqui */
    border: 1px solid black;
    
`
export const Imagediv = styled.div`
    background-color: #C87BDA;
    .font{
        position: absolute;
        top: 2%;
        left: 15px;
        color:white;
        font-size: 24px;
        font-weight: 600;
    }
    height: 30vh;
    img{
        width: 200px;
        margin: auto;
        display: block;
    }
` 
export const Formdiv = styled.div`
        height: 70vh;
        
`
