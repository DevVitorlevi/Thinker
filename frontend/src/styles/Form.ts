import styled from 'styled-components'

export const Container = styled.div` 
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    font-family: 'Josefin Sans', sans-serif; /* Aplica a fonte apenas aqui */
    
    @media screen and (min-width:1025px){
        flex-direction: row;
        overflow: hidden;
    }
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
        display:flex;
        align-items: center;
        justify-content: center;
        object-fit: contain;
    }
    @media screen and (min-width:320px) and (max-width:359px){
        .mobile{
            width: 150px;
        } 
    }
    @media screen and (min-width: 360px) and (max-width:393px){
        .mobile{
            width: 200px;
        }
    }
    @media screen and (min-width:394px) and (max-width:1028px){
        .mobile{
            width: 240px;
        }
    }
    @media screen and (min-width:1025px) and (max-width:1279px){
        overflow: unset;
        display: flex;
        align-items: center;
        justify-content: center;
        .desktop{ 
            display: block;
            min-width: 560px;
        }
        .mobile{
            display: none;
        }

        height: 100vh;
        display: flex;
        width: 50vw;

        .font{
            font-size:36px;
            top: 2%;
        }
    }
    @media screen and (min-width: 1280px) and (max-width:1366px){
        height: 100vh;
        width: 50vw;
        display: flex;
        justify-content: center;
        align-items: center;
        .font{
            top: 2%;
            font-size: 32px;
        }
        .desktop{
                display: block;
                min-width: 700px;

        }
        .mobile{
            display: none;
        }
    }
    @media screen and (min-width:1367px){
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        .font{
            top: 2%;
            font-size: 32px;
        }
        .desktop{
                display: block;
                min-width: 900px;

        }
        .mobile{
            display: none;
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
            margin-bottom: 20px;
            margin-left: 20px;
        }
        @media screen and (min-width:768px) and (max-width:1023px){
        .titulo{
            font-size: 32px;
        }

    }
    @media screen and (min-width:1024px) and (max-width:1280px){
        .titulo{
        font-size: 30px;
        text-align: left;
        margin-left: 5rem;
        }
    }
    @media screen and (min-width:1281px) and (max-width:1366px) {
        .titulo{
            font-size: 36px;
        }
    }
    @media screen  and (min-width:1367px){
        .titulo{
            font-size: 40px ;
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
    `
export const Text = styled.span`
    font-size: 14px;
    color: #5a6285; /* Cor do texto */
    @media screen and (min-width:768px) and (max-width:1023px){
        
        font-size: 24px;
    }
        @media screen and (min-width: 1024px) {
            font-size: 24px;
        }

    `
export const Form = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    .buttons{
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 30px;
        width: 100%;
    }
    button:active{
        background-color: #D394E2;
        
    }
    button:hover{
        background-color:#821fda;
    }

    #link{
        text-decoration: none;
        color: #5A6582;
        border: 2px solid #D9DDE8;
        width: 100%;
        padding: 20px;
        text-align: center;
        border-radius: 15px;
    }
    #forgot{
        position: absolute;
        top: 0;   
        right: 1%;
        width: 150px;
        color:#7D49AB;
        text-align: center;
        text-decoration: none;
    }

    @media screen and (min-width:768px) and (max-width:1024px){
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
    @media screen and (min-width:1025px) and (max-width:1280px) {
        width: 50vw;
        form{
            gap: 30px;
        } 
        .input{
            max-width: 40rem;
            min-width: 30rem;
            height:50px;
            font-size:25px;
        }
        ::placeholder{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 18px;
        }
        .eye,.eye-c{
            width: 32px;
            height: 32px;
            top: 36px;  
        }
        p{
            font-size: 22px;
        }
        #forgot{
            font-size: 20px;
            top: 5px;
        }
        #link{
            font-size: 20px;
        }
        button{
            font-size: 20px;
        }
    }
        .required{
            font-size: 20px;
    }
    @media screen and (min-width:1281px) and (max-width:1366px) {
        width: 50vw;
        form{
            gap: 30px;
        } 
        .input{
            max-width: 40rem;
            min-width: 35rem;
            height:60px;
            font-size:28px;
        }
        ::placeholder{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 20px;
        }
        .eye,.eye-c{
            width: 35px;
            height: 35px;
            top: 38px;  
        }
        p{
            font-size: 24px;
        }
        #forgot{
            font-size: 20px;
            top: 5px;
        }
        #link{
            font-size: 24px;
            text-align: center;
        }
        button{
            font-size: 24px;
            height: 80px;
        }
        .buttons{
            gap: 30px;
        }
        .required{
            font-size: 24px;
        }
    }  
    @media screen and (min-width:1367px) {
        width: 53vw;
        margin-top: 30px;
        form{
            gap: 30px;
        } 
        .input{
            max-width: 50rem;
            min-width: 45rem;
            height:70px;
            font-size:28px;
        }
        ::placeholder{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 20px;
        }
        .eye,.eye-c{
            width: 40px;
            height: 40px;
            top: 46px;  
        }
        p{
            font-size: 28px;
        }
        #forgot{
            font-size: 20px;
            top: 5px;
        }
        #link{
            font-size: 24px;
            text-align: center;
        }
        button{
            font-size: 24px;
            height: 80px;
        }
        .buttons{
            gap: 30px;
        }
        .required{
            font-size: 24px;
        }
    }  
    `
export const Auth = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    .google{
        width:80%;
        padding: 15px;
        font-size: 16px;
        text-align: center;
        border: 2px solid #D9DDE8;
        border-radius: 15px;
    }
    @media screen and (min-width:768px) and (max-width:1023px) {
        .google{
            font-size: 24px;
        }
    }
    @media screen and (min-width:1024px) and (max-width:1279px){
        .google{
            width: 70%;
            margin: auto;
        }
    }
    @media screen and (min-width: 1280px) {
        .google{
            width: 80%;
            padding: 20px;
            font-size: 26px;
            margin-top: 30px;
            margin-bottom: 30px
        }
    }
`