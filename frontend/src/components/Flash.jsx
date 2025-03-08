import React, { useEffect, useState } from 'react';
import { Message } from '../styles/Flash';
import bus from '../utils/bus';

const Flash = () => {
    const [type, setType] = useState('');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {

        const handleFlash = ({ message, type }) => {
            setMessage(message);
            setType(type);
            setVisible(true);

            setTimeout(() => {
                setVisible(false);
            }, 3000);
        };


        bus.addListener('flash', handleFlash);

        return () => {
            bus.removeListener('flash', handleFlash);
        };
    }, []);

    return (
        <div>
            {visible && (
                <Message className={`${type} ${visible ? 'visible' : ''}`}>
                    <p>{message}</p>
                </Message>

            )}
        </div>
    );
};

export default Flash;
