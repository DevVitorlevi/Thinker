import React from 'react'
import { Message } from '../styles/Flash';

const Flash = () => {
    const [type, setType] = React.useState('');
    return (
        <Message>
            Mensage
        </Message>
    )
}

export default Flash