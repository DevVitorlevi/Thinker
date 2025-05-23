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
} from '../../styles/Form';
import Platão from '../assets/plastão.png';
import { User, AtSign, Eye, EyeClosed, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
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

        if (formData.name.trim().length < 3) {
            newErrors.name = 'Digite no mínimo 3 caracteres';
        }

        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'E-mail inválido';
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Senha muito curta';
        }

        if (formData.password !== formData.confirm) {
            newErrors.confirm = 'As senhas não coincidem';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Submit form or perform desired actions
            console.log('Formulário enviado:', formData);

            // Reset form
            setFormData({
                name: '',
                email: '',
                password: '',
                confirm: ''
            });

            // Focus on the name input
            if (inputNameRef.current) {
                inputNameRef.current.focus();
            }
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
                        Junte-se ao <span>THINKER</span>
                    </h1>
                </Head>
                <FormContainer>
                    <form onSubmit={handleSubmit}>
                        <InputContent>
                            <input
                                type="text"
                                name="name"
                                ref={inputNameRef}
                                className="input"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Nome'
                            />
                            <User className="icon" />
                            {errors.name && <p className="error-message">{errors.name}</p>}
                        </InputContent>

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

                        <InputContent>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="confirm"
                                className="input"
                                required
                                value={formData.confirm}
                                onChange={handleChange}
                                placeholder='Confirme Senha'
                            />
                            <Lock className="icon" />

                            {errors.confirm && <p className="error-message">{errors.confirm}</p>}
                        </InputContent>

                        <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>
                        <Link to="/login">
                            Já possui conta? Entre
                        </Link>
                    </form>
                </FormContainer>
            </FormSpace>
        </Wrapper>
    );
};
