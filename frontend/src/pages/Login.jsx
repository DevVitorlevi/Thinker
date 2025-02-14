import { useRef, useState } from 'react'
import image1 from '../assets/ft1.png'
import image2 from '../assets/ft.png'
import { Container, Imagediv, Formdiv, Divider, Text, Form, Auth } from '../styles/Login'
import { Eye, EyeClosed } from 'lucide-react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [open, setOpen] = useState(false);
    const [FormData, setFormdata] = useState({

        email: '',
        password: ''
    });

    const [error, setError] = useState({
        email: '',
        password: ''
    });

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const inputPassword = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata({ ...FormData, [name]: value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let hasError = false;
        let newErrors = { email: "", password: "" };
        if (!emailRegex.test(FormData.email)) {
            newErrors.email = "Email inválido";
            hasError = true;
        }
        if (FormData.password.length < 8) {
            newErrors.password = "A senha deve ter pelo menos 8 caracteres";
            hasError = true;
        }

        if (hasError) {
            setError(newErrors);
            return;
        }

        setError({ email: "", password: "" });

        // Reseta os campos do formulário
        setFormdata({ email: "", password: "" });
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
                        <form onSubmit={handleSubmit}>
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

export default Register;
