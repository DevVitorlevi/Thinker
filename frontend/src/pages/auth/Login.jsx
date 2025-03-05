
import React, { useRef, useState } from 'react'
import image1 from '../../assets/image2.png'
import image2 from '../../assets/image1.png'
import { Container, Imagediv, Formdiv, Divider, Text, Form } from '../../styles/Form'
import { Eye, EyeClosed } from 'lucide-react'
import { Link } from 'react-router-dom'


const Login = () => {
    const [open, setopen] = useState(false)
    const inputPass = useRef(null)

    const toggleEye = () => {
        if (!inputPass.current) return;
        inputPass.current.type = open ? "password" : "text";
        setopen(!open);
    }

    const [Formdata, setFormdata] = useState({
        name: '',
        email: '',
        senha: ''
    })
    const [error, setError] = useState(
        {
            email: '',
            senha: '',
        }
    )

    const handleSubmit = (e) => {
        e.preventDefault()
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        let hasError = false
        let NewErros = { email: '', senha: '' }

        if (!emailRegex.test(Formdata.email)) {
            NewErros.email = 'Email Inválido'
            hasError = true
        }

        if (Formdata.senha.length < 8 || Formdata.senha.length > 30) {
            NewErros.senha = 'Senha No Minimo 8 Caracteres e Maximo 30 Caracteres'
            hasError = true
        }

        if (hasError) {
            return setError(NewErros)
        }

        setError({ email: '', senha: '' })
        setFormdata({ name: '', email: '', senha: '' })


    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormdata(prevData => (
            { ...prevData, [name]: value }
        ))
        setError({ email: '', senha: '' })
    }
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
                        <h1 className='titulo'>Conecte-se ao THINKER</h1>
                    </div>
                    <Divider>
                        <Text>ou com e-mail</Text>
                    </Divider>
                    <Form>
                        <form onSubmit={handleSubmit}>
                            <div className="inputs">
                                <p>Email</p>
                                <input type="email" className={`input ${error.email ? 'input-error' : ''}`}
                                    name='email'
                                    value={Formdata.email}
                                    placeholder='Insire seu enderenço de e-mail'
                                    onChange={handleChange}
                                />
                                {error.email && <p className='required'>{error.email}</p>}
                            </div>
                            <div className="inputs">
                                <p>Senha</p>

                                <input type={open ? 'password' : 'text'}
                                    placeholder='Digite sua Senha' className={`input ${error.senha ? 'input-error' : ''}`}
                                    ref={inputPass}
                                    name='senha'
                                    value={Formdata.senha}
                                    onChange={handleChange}
                                    maxLength={30}
                                />
                                {error.senha && <p className='required'>{error.senha}</p>}
                                <span onClick={toggleEye}>
                                    {open ? <EyeClosed className="eye-c" /> : <Eye className="eye" />}
                                </span>

                            </div>
                            <button type="submit">Entre</button>
                            <Link to='/register' id='link'>Novo No Thinker? Crie Sua Conta</Link>
                        </form>
                    </Form>
                </Formdiv>
            </Container >
        </>
    )
}

export default Login