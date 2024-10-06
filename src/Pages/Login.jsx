import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();

    const checkEmailValidity = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    function validateInputs() {
        if (!checkEmailValidity(emailInputRef.current.value)) {
            alert("Email is not valid");
            emailInputRef.current.focus();
            emailInputRef.current.style.outlineColor = "red";
            return false;
        }
        return true;
    }

    function handleLogin(event) {
        event.preventDefault();

        const isValid = validateInputs();
        if (!isValid) {
            return;
        }

        const userCredentials = {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
        };
        setIsLoading(true);
        axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, userCredentials, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.data.message === "success") {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));   
                    navigate("/");
                    emailInputRef.current.value = '';
                    passwordInputRef.current.value = '';
                }
            })
            .catch(err => {
                console.log(err.response);      
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function register(event) {
        navigate('/register')
    }

    return (
        <div className='border rounded-md mx-auto border-gray-800 shadow-lg w-1/2 mt-24'>
            <h2 className='text-center text-green-600 text-6xl mb-5 font-extrabold py-5'>Login</h2>
            <form className='flex flex-col items-center py-5'>
                <input 
                    ref={emailInputRef} 
                    className='p-3 mb-3 border rounded-md w-1/3 border-gray-300' 
                    type="email" 
                    placeholder='Enter your email...'
                />
                <input 
                    ref={passwordInputRef} 
                    className='p-3 mb-3 border rounded-md w-1/3 border-gray-300' 
                    type="password" 
                    placeholder='Enter your password...'
                />
                <button 
                    disabled={isLoading} 
                    onClick={handleLogin} 
                    className='bg-blue-600 text-white w-1/3 p-2 rounded-md hover:bg-blue-700'
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
                <button onClick={register} className='mx-auto mt-2 hover:text-blue-500'>Akkaunt yo'qmi? Ro'yxatdan o'ting</button>
            </form>
        </div>
    );
}

export default UserLogin;
