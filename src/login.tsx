'use client'

import React, { useState } from 'react'

const Login: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("Click to login");

    const login = async () => {

        if (!document || !location || loading) return;

        console.log('Cookies from login', document.cookie)

        setLoading(true);
        setMessage('Setting the token...');

        document.cookie = `token=works;path=/admin;`;

        location.reload();
    };

    return (
        <div style={{
            textAlign: 'center'
        }}>

            <button onClick={login}>login</button>
            <p>{message}</p>
        </div>
    )
}

export default Login