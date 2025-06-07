// components/Login.js
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

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:5000/auth/login', formData);

                const token = response.data.token;
                localStorage.setItem('token', token);

                alert('Login realizado com sucesso!');
                setFormData({ email: '', password: '' });

                // Redireciona para a home/dashboard após login
                navigate('/dashboard');

            } catch (error) {
                const msg = error.response?.data?.message || 'Erro ao fazer login';
                setServerError(msg);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShow) => !prevShow);
    };

    return (
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

                        {serverError && <p className="error-message">{serverError}</p>}

                        <ButtonSubmit type="submit">Entrar</ButtonSubmit>
                        <Link to="/register">
                            Novo no THINKER? Cadastre-se
                        </Link>
                    </form>
                </FormContainer>
            </FormSpace>
        </Wrapper>
    );
};
