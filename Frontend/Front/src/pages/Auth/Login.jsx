import React, { useState, useRef, useEffect } from 'react';
import {
    ImageContent,
    FormSpace,
    Head,
    Wrapper,
    FormContainer,
    ButtonSubmit,
    InputContent,
} from '../../styles/Form';

import { AtSign, Eye, EyeClosed, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ImageSlider } from '../../components/ImageSlide';
import { FlashMessage } from '../../components/FlashMessage';  // Importa aqui

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [flash, setFlash] = useState({ type: '', message: '' }); // estado do flash

    const inputEmailRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (inputEmailRef.current) {
            inputEmailRef.current.focus();
        }
    }, []);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        if (name === 'email') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: emailRegex.test(value) ? '' : 'E-mail inválido'
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'E-mail inválido';
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Senha muito curta';
        }

        setErrors(newErrors);
        setServerError('');
        setFlash({ type: '', message: '' });

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:5000/users/login', formData);

                const token = response.data.token;
                localStorage.setItem('token', token);

                setFlash({ type: 'success', message: 'Login realizado com sucesso!' });

                setFormData({ email: '', password: '' });
            } catch (error) {
                const msg = error.response?.data?.message || 'Erro ao fazer login';
                setServerError(msg);
                setFlash({ type: 'error', message: msg });
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShow) => !prevShow);
    };

    return (
        <>
            {flash.message && (
                <FlashMessage
                    type={flash.type}
                    message={flash.message}
                    onClose={() => setFlash({ type: '', message: '' })}
                />
            )}

            <Wrapper>
                <ImageContent>
                    <ImageSlider />
                </ImageContent>

                <FormSpace>
                    <Head>
                        <h1>
                            Conecte-se <span>THINKER</span>
                        </h1>
                    </Head>
                    <FormContainer>
                        <form onSubmit={handleSubmit}>
                            <InputContent>
                                <input
                                    type="email"
                                    name="email"
                                    ref={inputEmailRef}
                                    className="input"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder='Email'
                                />
                                <AtSign className="icon" />
                                {errors.email && <p className="error-message">{errors.email}</p>}
                            </InputContent>

                            <InputContent>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    className="input"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder='Senha'
                                />
                                <Lock className="icon" />
                                <span onClick={togglePasswordVisibility}>
                                    {showPassword ? <EyeClosed className="eye-c" /> : <Eye className="eye" />}
                                </span>
                                {errors.password && <p className="error-message">{errors.password}</p>}
                            </InputContent>

                            <ButtonSubmit type="submit">Entrar</ButtonSubmit>
                            <Link to="/register">
                                Novo no THINKER? Cadastre-se
                            </Link>
                        </form>
                    </FormContainer>
                </FormSpace>
            </Wrapper>
        </>
    );
};
