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
import { User, AtSign, Eye, EyeClosed, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { ImageSlider } from '../../components/ImageSlide';
import { FlashMessage } from '../../components/FlashMessage';
import { useNavigate } from 'react-router-dom';


export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();


    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [flash, setFlash] = useState({ type: '', message: '' });

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
            [name]: value,
        }));

        // Real-time validation
        if (name === 'email') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: emailRegex.test(value) ? '' : 'E-mail inválido',
            }));
        }
    };

    const handleSubmit = async (e) => {
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

        setErrors(newErrors);
        setServerError('');
        setFlash({ type: '', message: '' });

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await api.post('/users/register', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });

                const { message, token, user } = response.data;

                // Mostrar flash message de sucesso
                setFlash({ type: 'success', message });

                localStorage.setItem('token', token);

                console.log('Usuário cadastrado com sucesso:', user);

                // limpa o form e foca no nome
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                });

                if (inputNameRef.current) inputNameRef.current.focus();

                // Redireciona para a Home após 1.5s
                setTimeout(() => {
                    navigate('/home');
                }, 1500);
            } catch (err) {
                const errorMsg =
                    err.response?.data?.message || 'Erro ao cadastrar usuário';

                setServerError(errorMsg);

                // Mostrar flash message de erro
                setFlash({ type: 'error', message: errorMsg });

                console.error('Erro no cadastro:', err);
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
                                    placeholder="Nome"
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
                                    placeholder="Email"
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
                                    placeholder="Senha"
                                />
                                <Lock className="icon" />
                                <span onClick={togglePasswordVisibility}>
                                    {showPassword ? (
                                        <EyeClosed className="eye-c" />
                                    ) : (
                                        <Eye className="eye" />
                                    )}
                                </span>
                                {errors.password && (
                                    <p className="error-message">{errors.password}</p>
                                )}
                            </InputContent>
                            <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>
                            <Link to="/login">Já possui conta? Entre</Link>
                        </form>
                    </FormContainer>
                </FormSpace>
            </Wrapper>
        </>
    );
};
