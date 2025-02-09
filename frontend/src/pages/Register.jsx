
import { useState } from 'react'
import image1 from '../assets/ft1.png'
import { Container, Imagediv, Formdiv, Divider, Text, } from '../styles/Login'
import { Eye, EyeClosed } from 'lucide-react'

const Register = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Container>
                <Imagediv>
                    <h1 className='font'>THINKER</h1>
                    <img src={image1} alt="" />
                </Imagediv>
                <Formdiv>
                    <div className="entre">
                        <h1 className='titulo'>Junte-se a THINKER</h1>
                    </div>
                    <Divider>
                        <Text>ou com e-mail</Text>
                    </Divider>
                    <form>
                        <div className="inputs">
                            <p>Email</p>
                            <input type="text" name={FormData.email} className='input' />
                            <p className='required'>Email Inválido</p>
                        </div>
                        <div className="inputs">
                            <p>Senha</p>
                            <input type="password" name={FormData.password} />
                            <p className="required">Senha deve Conter 8 Caracteres</p>
                            <span onClick={() => setOpen(!open)}>
                                {open ? <EyeClosed /> : <Eye />}
                            </span>
                        </div>

                    </form>
                </Formdiv>
            </Container>
        </>
    )
}

export default Register