import styled from 'styled-components'
export const Container = styled.div` 
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    font-family: 'Josefin Sans', sans-serif; /* Aplica a fonte apenas aqui */   
    
`
export const Imagediv = styled.div`
    background-color: #7D49AB;
    position: relative;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    .desktop{
        display: none;
    }
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
    .mobile{
        display: block;
        object-fit: contain;
    }
    @media screen and (min-width:320px) and (max-width:360px){
        .mobile{
            width: 130px;
        }
    }
    @media screen and (min-width:360px) and (max-width:375px) {
        .mobile{    
            position: absolute;
            top: 0%;
            width: 190px;
        }
    }
    @media screen and (min-width:375px) and (max-width:390px){
        .mobile{
            position: absolute;
            top: -5%;
            width: 200px;
        }
    }
    @media screen and (min-width:391px) and (max-width:430px){
        .mobile{
            position: absolute;
            top: -2%;
            width: 220px;
        }
    }
    @media screen and (min-width:768px) and (max-width:800px){
        .mobile{
            position: absolute;
            top: -5%;
            width: 260px;
        }
        .font{
            font-size: 32px;
        }
    }
    @media screen and (min-width:800px) and (max-width:834px) {
        .mobile{
            position: absolute;
            top: -5%;
            width: 320px;
        }
        .font{
            font-size: 36px;
        }
    }
    @media screen and (min-width:884px) and (max-width:992px){
        .mobile{
            position: absolute;
            top: -5%;
            width: 300px;
        }
        .font{
            font-size: 36px;
        
        }
    }
` 
export const Formdiv = styled.div`
        height: 70vh;
        display: block;
        .titulo{
            font-size: 24px;
            color: #5A6582;
            font-weight: 600;
            margin-top:45px;
            margin-left: 20px;
        }
        @media screen and (min-width:768px) and (max-width:992px){
        .titulo{
            font-size: 32px;
        }
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
    @media screen and (min-width:768px) and (max-width:992px){
        
        font-size: 24px;
    }
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
        gap: 20px;
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
        color: #7D49AB;
        cursor: pointer;
    }
    p{
        margin-bottom: 3px;
    }

    button{
        background-color: #7D49AB;
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
        background-color:#821fda;
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

    @media screen and (min-width:768px) and (max-width:992px){
        form{
            gap: 30px;
        }
        .required{
            font-size: 18px;
        }
        .input{
            max-width:55rem;
            min-width: 40rem;
            height: 50px;
            font-size:20px;
        }
        p{
            font-size: 20px;
        }
        .eye-c,.eye{
            width: 30px;
            height: 30px;
            top: 35px;
        }
        button{
            height: 68px;
            font-size: 20px;
        }
        a{
            height: 68px;
            font-size: 20px;
        }
    }
`
