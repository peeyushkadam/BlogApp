import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Login() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { userInfo, setUserInfo } = useContext(UserContext);

    async function Login(ev) {
        ev.preventDefault();

        const response = await fetch('https://blogic2.onrender.com/login', {
            method: 'POST',
            body: JSON.stringify({ userName, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })

        if (response.status === 200) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            })
        }
        else {
            alert('LOGIN FAILED');
        }

    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <>
            <h2 style={{textAlign:'center'}}>Login</h2>
            <form className="login" onSubmit={Login}>
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

                <button className="form">Login</button>
            </form>
        </>
    )
}
