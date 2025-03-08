
import React, { useRef, useState } from 'react'
import empe from '../../assets/empe.png'
import sentado from '../../assets/sentado.png'
import { Container, Imagediv, Formdiv, Divider, Text, Form } from '../../styles/Form'
import { Eye, EyeClosed } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/UserContext'

const Register = () => {
    const [open, setopen] = useState(false)
    const inputPass = useRef()
    const { register } = React.useContext(Context)
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormdata({ name: '', email: '', senha: '' })

        const result = await register(Formdata)
        if (result) {
            console.log(result);
        }

    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormdata(prevData => (
            { ...prevData, [name]: value }
        ))
    }
    return (
        <>
            <Container>
                <Imagediv>
                    <h1 className='font'>THINKER</h1>
                    <img src={empe} className='mobile' />
                    <img src={sentado} alt="Thinker logo" className='desktop' />
                </Imagediv>
                <Formdiv>
                    <div className="entre">
                        <h1 className='titulo'>Junte-se a THINKER</h1>
                    </div>
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
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="inputs">
                                <p>Email</p>
                                <input type="email" className='input'
                                    name='email'
                                    value={Formdata.email}
                                    placeholder='Insire seu enderenço de e-mail'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="inputs">
                                <p>Senha</p>

                                <input type={open ? 'password' : 'text'}
                                    placeholder='Digite sua Senha' className='input'
                                    name='senha'
                                    value={Formdata.senha}
                                    onChange={handleChange}
                                    maxLength={30}
                                />
                                <span onClick={toggleEye}>
                                    {open ? <EyeClosed className="eye-c" /> : <Eye className="eye" />}
                                </span>

                            </div>
                            <button
                                type="submit">Cadastre-se</button>
                            <Link to='/login' id='link'>Já Possui Conta? Entre</Link>
                        </form>
                    </Form>
                </Formdiv>
            </Container >
        </>
    )
}

export default Register