import React, { useRef, useState } from 'react';
import empe from '../../assets/empe.png';
import sentado from '../../assets/sentado.png';
import { Container, Imagediv, Formdiv, Divider, Text, Form } from '../../styles/Form';
import { Eye, EyeClosed } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/UserContext';

const Register = () => {
    const [open, setOpen] = useState(false);
    const inputPass = useRef();
    const { register, loading } = React.useContext(Context); // Agora pega também o loading!

    const toggleEye = () => {
        if (!inputPass.current) return;
        inputPass.current.type = open ? "password" : "text";
        setOpen(!open);
    };

    const [Formdata, setFormdata] = useState({
        name: '',
        email: '',
        senha: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await register(Formdata);

        if (result) {
            console.log(result);
            setFormdata({ name: '', email: '', senha: '' });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata(prevData => (
            { ...prevData, [name]: value }
        ));
    };

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
                                <p>Nome do Usuário</p>
                                <input
                                    type="text"
                                    name='name'
                                    value={Formdata.name}
                                    className='input'
                                    placeholder='Seu Nome'
                                    onChange={handleChange}
                                    disabled={loading} // Desativa durante o loading
                                />
                            </div>
                            <div className="inputs">
                                <p>Email</p>
                                <input
                                    type="email"
                                    className='input'
                                    name='email'
                                    value={Formdata.email}
                                    placeholder='Insira seu endereço de e-mail'
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                            <div className="inputs">
                                <p>Senha</p>
                                <input
                                    ref={inputPass}
                                    type={open ? 'text' : 'password'}
                                    placeholder='Digite sua Senha'
                                    className='input'
                                    name='senha'
                                    value={Formdata.senha}
                                    onChange={handleChange}
                                    maxLength={30}
                                    disabled={loading}
                                />
                                <span onClick={toggleEye} style={{ cursor: 'pointer' }}>
                                    {open ? <EyeClosed className="eye-c" /> : <Eye className="eye" />}
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={loading} // Desativa o botão quando está carregando
                                style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                            >
                                {loading ? 'Carregando...' : 'Cadastre-se'}
                            </button>

                            <Link to='/login' id='link'>Já Possui Conta? Entre</Link>
                        </form>
                    </Form>
                </Formdiv>
            </Container>
        </>
    );
};

export default Register;
