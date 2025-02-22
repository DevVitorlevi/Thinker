
import { use, useRef, useState } from 'react'
import image1 from '../../assets/image2.png'
import image2 from '../../assets/image1.png'
import { Container, Imagediv, Formdiv, Divider, Text, Form, Auth } from '../../styles/Form'
import { Eye, EyeClosed } from 'lucide-react'
import { Link } from 'react-router-dom'


const Register = () => {
    const [open, setopen] = useState(false)
    return (
        <>
            <Container>
                <Imagediv>
                    <h1 className='font'>THINKER</h1>
                    <img src={image2} className='mobile' />
                    <img src={image1} alt="Thinker logo" className='desktop' />
                </Imagediv>
                <Formdiv>
                    <div className="entre">
                        <h1 className='titulo'>Junte-se a THINKER</h1>
                    </div>
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
                                <p> Nome do Usuário </p>
                                <input
                                    type="text"

                                    name='name'
                                    className='input'
                                    placeholder='Seu Nome'
                                    required
                                />

                            </div>
                            <div className="inputs">
                                <p>Email</p>
                                <input type="text" className='input'
                                    placeholder='Insire seu enderenço de e-mail' />
                            </div>
                            <div className="inputs">
                                <p>Senha</p>
                                <input type="password"
                                    placeholder='Digite sua Senha' className='input' />
                            </div>
                            <button type="submit">Cadastre-se</button>
                            <Link to='/login' target='_blank' id='link'>Já Possui Conta? Entre</Link>
                        </form>
                    </Form>
                </Formdiv>
            </Container>
        </>
    )
}

export default Register