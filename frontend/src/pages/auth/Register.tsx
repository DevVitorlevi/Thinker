
import React, { useRef, useState } from 'react'
import image1 from '../../assets/image2.png'
import image2 from '../../assets/image1.png'
import { Container, Imagediv, Formdiv, Divider, Text, Form, Auth } from '../../styles/Form'
import { Eye, EyeClosed } from 'lucide-react'
import { Link } from 'react-router-dom'
import { signInWithGoogle } from '../../hooks/useGoogle'
import { useAuth } from '../../hooks/useAuth'


const Register = () => {
    const { createUser, loading } = useAuth()
    const [open, setopen] = useState(false)
    const inputPass = useRef<HTMLInputElement>(null)

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        await createUser(Formdata)


    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                        <h1 className='titulo'>Junte-se a THINKER</h1>
                    </div>
                    <Auth>
                        <div className="google" onClick={signInWithGoogle}>
                            <p>Entre com o Google</p>
                        </div>
                    </Auth>
                    <Divider>
                        <Text>ou com e-mail</Text>
                    </Divider>
                    <Form>
                        <form onSubmit={handleSubmit}>
                            <div className="inputs">
                                <p> Nome do Usuário </p>
                                <input
                                    type="text"
                                    name='name'
                                    value={Formdata.name}
                                    className='input'
                                    placeholder='Seu Nome'
                                    required
                                    onChange={handleChange}
                                />
                            </div>
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
                            {loading && (
                                <button type="submit" disabled>Aguarde</button>
                            )}
                            {!loading && (
                                <button type="submit">Cadastre-se</button>
                            )}
                            <Link to='/login' id='link'>Já Possui Conta? Entre</Link>
                        </form>
                    </Form>
                </Formdiv>
            </Container >
        </>
    )
}

export default Register