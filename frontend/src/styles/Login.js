import styled from 'styled-components'
export const Container = styled.div` 
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    font-family: 'Josefin Sans', sans-serif; /* Aplica a fonte apenas aqui */   
    
`
export const Imagediv = styled.div`
    background-color: #C87BDA;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .font{
        position: absolute;
        top: 5%;
        left: 15px;
        color:white;
        font-size: 24px;
        font-weight: 600;
        z-index: 999999;
    }
    height: 25vh;   
    img{
        width: 190px;
        display: block;
        object-fit: contain;
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
export const Form = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width:100%;   
    form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 30px;
    
    }
    .inputs{
        position: relative;
    }
    .required{
        color: red;
        font-size: 15px;
        margin-top: 5px;
        display: block;
    }
    .input{
        max-width:25rem;
        min-width: 20rem;
        height: 40px;
        background-color: #F6F7FB;
        outline: 0;
        border: 0;
        border-radius: 15px;
        text-indent: 10px;
    }
    ::placeholder{
        color: #939BB4;
        font-size: 16px;
        font-weight: 700;
    }
    .eye-c,.eye{
        position: absolute;
        right: 5px;
        top: 28px;
        color: #C87BDA;
        cursor: pointer;
    }
    p{
        margin-bottom: 3px;
    }

    button{
        background-color: #C87BDA;
        font-size: 17px;
        color: white;
        border: 0;
        width: 100%;
        height: 55px;  
        border-radius:15px ;
        transition: .4s;
    }
    button:active{
        background-color: #D394E2;
        
    }
    button:hover{
        background-color: #D394E2;
    }

    a{
        text-decoration: none;
        color: #5A6582;
        border: 2px solid #D9DDE8;
        width: 100%;
        padding: 20px;
        text-align: center;
        border-radius: 15px;
    }

`