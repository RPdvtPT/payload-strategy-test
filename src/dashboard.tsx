'use client'

import React, { useState } from 'react'

const Dashboard: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("Check session");

    const check = async () => {

        if (!document || loading) return;

        console.log('Cookies from dashboard', document.cookie)

        setLoading(true);
        setMessage('Checking session...');

        const req = await fetch('/my-route', {
            method: 'POST',
            credentials: 'include'
        });

        const res = !req.ok ? null : await req.json();

        console.log('Session check', res);

        res && setMessage('Works');

        setLoading(false);
    };

    const unset = async () => {

        if (!document || !location || loading) return;

        console.log('unseting cookies from dashboard', document.cookie)

        setLoading(true);

        document.cookie = `token=;path=/admin;`;

        location.href = '/admin/login';
    };

    return (
        <div style={{
            textAlign: 'center'
        }}>

            <button onClick={check}>POST request to "/my-route/route.ts"</button>
            <p>{message}</p>
            <button onClick={unset}>unset cookie & go to login page</button>
        </div>
    )
}

export default Dashboard