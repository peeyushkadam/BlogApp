import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { MdAccountCircle } from 'react-icons/md'

export default function Header() {

    const { setUserInfo, userInfo } = useContext(UserContext)

    useEffect(() => {
        fetch('https://blogic2.onrender.com/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo)
            })
        })

    }, [])

    function logout() {
        fetch('https://blogic2.onrender.com/logout', {
            credentials: 'include',
            method: 'POST',
        })
        setUserInfo(null);
    }

    const userName = userInfo?.userName;

    return (
        <>
            <header>
                <Link to='/' className="div">Blogic</Link>
                <nav>
                    <div className="user-dropdown">
                        {userName && (
                            <>
                                <div style={{display:"flex"}}>
                                    <MdAccountCircle className="account" />
                                    <div style={{color:'#ECE6EA'}}>{userName}</div>
                                </div>
                                <div className="dropdown-content">
                                    <Link to='/create'>Create</Link>
                                    <a onClick={logout}>Logout</a>
                                </div>
                            </>
                        )}
                        {!userName && (
                            <>
                                <Link to='/login' className="link">LogIn</Link>
                                <Link to='/register' className="link">SignUp</Link>
                            </>
                        )}
                    </div>
                </nav>

            </header>
            <div className="line"></div>
        </>
    )
}
