import { Eye, EyeClosed } from "lucide-react"
import { useState, useRef } from "react"
import { Container, Imagediv, Formdiv, Divider, Text, Form, Auth } from '../../styles/Form'
import image1 from '../../assets/image1.png'
import image2 from '../../assets/image2.png'
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <Container>
                <Imagediv>
                    <h1 className='font'>THINKER</h1>
                    <img src={image1} alt="Thinker logo" className='mobile' />
                    <img src={image2} className='desktop' />
                </Imagediv>
                <Formdiv>
                    <h1 className='titulo'>Conecte-se ao THINKER</h1>
                    <Auth>
                        <div className="google">
                            <p>Entre com o Google</p>
                        </div>

                    </Auth>
                    <Divider>
                        <Text>ou com e-mail</Text>
                    </Divider>
                    <Form>
                        <form>
                            <div className="inputs">
                                <p>Email</p>
                                <input
                                    type="text"
                                    name='email'
                                    className='input '
                                    placeholder='Insira seu endereço de e-mail'
                                    required
                                />
                            </div>
                            <div className="inputs">
                                <p>Senha</p>
                                <input
                                    type="password"
                                    name="password"
                                    className='input'
                                    required
                                    placeholder='Sua Senha'
                                />

                                <Link to='/forgot' id='forgot'>Esqueci a Senha</Link>
                            </div>

                            <div className="buttons">
                                <button type="submit">Entre</button>

                                <Link to='/register' id='link'>Novo no THINKER? Criar uma conta</Link>
                            </div>
                        </form>
                    </Form>
                </Formdiv>
            </Container>
        </>
    );
};

export default Login