import styled from 'styled-components'
export const Container = styled.div` 
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    font-family: 'Josefin Sans', sans-serif; /* Aplica a fonte apenas aqui */
    border: 1px solid black
    
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
    height: 20vh;
    img{
        width: 150px;
        margin: auto;
        display: block;
    }
` 
export const Formdiv = styled.div`
        height: 70vh;
        .titulo{
            font-size: 24px;
            color: #5A6582;
            font-weight: 600;
            margin-top:25px;
            margin-left: 10px;
        }    
        
`
export const Divider = styled.div`
    display: flex;
    align-items: center;
    justify-content:center ;
    text-align: center;
    width: 100%;
    margin: 20px 0;

    &::before,
    &::after {
        content: "";
        flex: 10;
        border-bottom: 2px solid #ccc; /* Cor da linha */
        margin:4px; /* Espaço entre o texto e as linhas */
    }
    `;

export const Text = styled.span`
    font-size: 14px;
    color: #5a6285; /* Cor do texto */
    `;
