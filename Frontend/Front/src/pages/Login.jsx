// components/Register.js
import React, { useState, useRef, useEffect } from 'react';
import {
    ImageContent,
    FormSpace,
    Head,
    Wrapper,
    FormContainer,
    ButtonSubmit,
    InputContent,
} from '../styles/Form';
import Platão from '../assets/plastão.png';
import { User, AtSign, Eye, EyeClosed, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const inputNameRef = useRef(null);

    useEffect(() => {
        if (inputNameRef.current) {
            inputNameRef.current.focus();
        }
    }, []);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        // Real-time validation
        if (name === 'email') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: emailRegex.test(value) ? '' : 'E-mail inválido'
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'E-mail inválido';
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Senha muito curta';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Submit form or perform desired actions
            console.log('Formulário enviado:', formData);

            // Reset form
            setFormData({
                email: '',
                password: '',
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShow) => !prevShow);
    };

    return (
        <Wrapper>
            <ImageContent>
                <h1>THINKER</h1>
                <img src={Platão} alt="Platão" />
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

                        <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>
                        <Link to="/register">
                            Novo no THINKER? Cadastre-se
                        </Link>
                    </form>
                </FormContainer>
            </FormSpace>
        </Wrapper>
    );
};
