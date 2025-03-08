//API
import api from '../utils/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
    async function register(user) {
        try {
            const data = await api.post('/user/register', user).then((response) => response.data).catch((error) => error.response.data);
        } catch (error) {
            console.log(error)
        }
    }
    
    return { register };
}