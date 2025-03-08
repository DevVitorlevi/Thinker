import styled from 'styled-components';

export const Message = styled.div`
position: absolute;
top: 10px;
right:10px;
color: white;
padding: 10px;
background-color: #008000;
font-size: 20px;
border-radius: 10px;
z-index: 9999;
animation: opacity 2s ease; /* Aplica a animação */

@keyframes opacity {
            0% {
                opacity: 1; /* Fora da tela */
            }
            20% {
                opacity:0.8
            }
            40% {
                opacity: 0.6; /* Move um pouco para a esquerda */
            }
            60% {
                opacity: 0.4; /* Volta para a posição inicial */
            }
            80% {
                opacity: 0.2; /* Move um pouco para a esquerda de novo */
            }
            100% {
                opacity: 0; /* Volta para a posição final */
            }
        }
.error{
background-color: red;
}
.sucess{
background-color:rgb(31, 33, 31);
}
`