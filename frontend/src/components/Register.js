import { useState } from "react";

export default function Register() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    async function Register(ev) {
        ev.preventDefault();

        const response = await fetch('https://blogic2.onrender.com/register', {
            method: 'POST',
            body: JSON.stringify({ userName, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.status === 200) {
            alert('REGISTRATION SUCCESSFULL');
        }
        else {
            alert('REGISTRATION FAILED');
        }

    }

    return (
        <>
            <h2 style={{textAlign:'center'}}>Register</h2>
            <form className="register" onSubmit={Register}>
                <input
                    type='text'
                    placeholder='Username'
                    value={userName}
                    onChange={ev => setUserName(ev.target.value)} />

                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />

                <button className="form">Register</button>
            </form>
        </>
    )
}
