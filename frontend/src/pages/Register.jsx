import { useRef, useState } from 'react'
import image1 from '../assets/ft1.png'
import { Container, Imagediv, Formdiv, Divider, Text, Form } from '../styles/Login'
import { Eye, EyeClosed } from 'lucide-react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [open, setOpen] = useState(false);
    const [FormData, setFormdata] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState({
        name: '',
        email: '',
        password: ''
    });

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    //useRef
    const inputName = useRef();
    const inputPassword = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata({ ...FormData, [name]: value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let hasError = false;
        let newErrors = { name: "", email: "", password: "" };

        if (FormData.name.trim() === "") {
            newErrors.name = "Nome é obrigatório";
            hasError = true;
        }
        if (!emailRegex.test(FormData.email)) {
            newErrors.email = "Email inválido";
            hasError = true;
        }
        if (FormData.password.length < 6) {
            newErrors.password = "A senha deve ter pelo menos 6 caracteres";
            hasError = true;
        }

        if (hasError) {
            setError(newErrors);
            return;
        }

        setError({ name: "", email: "", password: "" });

        // Reseta os campos do formulário
        setFormdata({ name: "", email: "", password: "" });

        // Foca no primeiro input após o envio
        inputName.current.focus();
    };

    const TogglePass = () => {
        if (!inputPassword.current) return;
        inputPassword.current.type = open ? "password" : "text";
        setOpen(!open);
    };

    return (
        <>
            <Container>
                <Imagediv>
                    <h1 className='font'>THINKER</h1>
                    <img src={image1} alt="Thinker logo" />
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
                                    value={FormData.name}
                                    name='name'
                                    className={`input ${error.name ? 'input-error' : ''}`}
                                    placeholder='Seu Nome'
                                    onChange={handleChange}
                                    ref={inputName}
                                    required
                                />
                                {error.name && <p className='required'>{error.name}</p>}
                            </div>
                            <div className="inputs">
                                <p>Email</p>
                                <input
                                    type="text"
                                    value={FormData.email}
                                    name='email'
                                    className={`input ${error.email ? 'input-error' : ''}`}
                                    placeholder='Insira seu endereço de e-mail'
                                    onChange={handleChange}
                                    required
                                />
                                {error.email && <p className='required'>{error.email}</p>}
                            </div>
                            <div className="inputs">
                                <p>Senha</p>
                                <input
                                    type={open ? "text" : "password"}
                                    name="password"
                                    className={`input ${error.password ? 'input-error' : ''}`}
                                    required
                                    ref={inputPassword}
                                    value={FormData.password}
                                    onChange={handleChange}
                                    placeholder='Sua Senha'
                                />
                                {error.password && <p className='required'>{error.password}</p>}
                                <span onClick={TogglePass}>
                                    {open ? <EyeClosed className="eye-c" /> : <Eye className="eye" />}
                                </span>
                            </div>

                            <button type="submit">Entrar</button>
                            <Link to='/login' target='_blank'>Já é THINKER? Entre</Link>
                        </form>
                    </Form>
                </Formdiv>
            </Container>
        </>
    );
};

export default Register;
