
import { useState } from 'react'
import image1 from '../assets/ft1.png'
import { Container, Imagediv, Formdiv, Divider, Text, Form } from '../styles/Login'
import { Eye, EyeClosed } from 'lucide-react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Container>
                <Imagediv>
                    <h1 className='font'>THINKER</h1>
                    <img src={image1} />
                </Imagediv>
                <Formdiv>
                    <div className="entre">
                        <h1 className='titulo'>Junte-se a THINKER</h1>
                    </div>
                    <Divider>
                        <Text>ou com e-mail</Text>
                    </Divider>
                    <Form>
                        <form>
                            <div className="inputs">
                                <p>Email</p>
                                <input type="text" name={FormData.email} className='input' placeholder='Insire seu enderenço de e-mail' />
                                <p className='required'>Email Inválido</p>
                            </div>
                            <div className="inputs">
                                <p>Senha</p>
                                <input type="password" name={FormData.password} placeholder='Digite sua Senha' className='input' />
                                <p className="required">Senha deve Conter 8 Caracteres</p>
                                <span onClick={() => setOpen(!open)}>
                                    {open ? <EyeClosed className='eye-c' /> : <Eye className='eye' />}
                                </span>
                            </div>
                            <div className="inputs">
                                <p>Confirme a senha</p>
                                <input type="password" name={FormData.confirm} className='input' placeholder='Confirme sua Senha' />
                                <p className='required'>
                                    Senhas não Coincidem
                                </p>
                            </div>
                            <button type="submit">Entrar</button>
                            <Link to='/login' target='_blank' >Novo no THINKER? Crie uma Conta</Link>
                        </form>
                    </Form >
                </Formdiv>
            </Container>
        </>
    )
}

export default Register