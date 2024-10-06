import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const usernameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const rePasswordRef = useRef();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const validate = () => {
        if (usernameRef.current.value.length < 3) {
            alert("User is not valid");
            usernameRef.current.focus();
            usernameRef.current.style.outlineColor = "red";
            return false;
        }
        if (surnameRef.current.value.length < 3) {
            alert("Surname is not valid");
            surnameRef.current.focus();
            surnameRef.current.style.outlineColor = "red";
            return false;
        }
        if (!validateEmail(emailRef.current.value)) {
            alert("Email is not valid");
            emailRef.current.focus();
            emailRef.current.style.outlineColor = "red";
            return false;
        }
        if (passwordRef.current.value !== rePasswordRef.current.value) {
            alert("Passwords do not match!");
            return false;
        }

        return true;
    };

    const handRegister = (event) => {
        event.preventDefault();

        const isValid = validate();
        if (!isValid) {
            return;
        }

        const registerUser = {
            email: emailRef.current.value,
            firstName: usernameRef.current.value,
            lastName: surnameRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: rePasswordRef.current.value
        };
        setLoading(true);
        axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, registerUser, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((data) => {
                if (data.data.message === "Ro'yxatdan muvaffaqiyatli o'tdingiz! Email tasdiqlash uchun havola yuborildi.") {
                    navigate("/login");
                    usernameRef.current.value = '';
                    surnameRef.current.value = '';
                    emailRef.current.value = '';
                    passwordRef.current.value = '';
                    rePasswordRef.current.value = '';
                }
            })
            .catch(err => { console.log(err); })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className='bg-gray-50 border rounded-lg mx-auto border-gray-300 shadow-md w-1/3 mt-24 p-6'>
            <h2 className='text-center text-blue-600 text-4xl mb-6 font-bold'>Register</h2>
            <form className='flex flex-col'>
                <input ref={usernameRef} className='p-3 mb-4 border rounded-lg w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='Enter name...' />
                <input ref={surnameRef} className='p-3 mb-4 border rounded-lg w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='Enter surname...' />
                <input ref={emailRef} className='p-3 mb-4 border rounded-lg w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' type="email" placeholder='Enter email...' />
                <input ref={passwordRef} className='p-3 mb-4 border rounded-lg w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' type="password" placeholder='Create password...' />
                <input ref={rePasswordRef} className='p-3 mb-4 border rounded-lg w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' type="password" placeholder='Confirm password...' />
                <button disabled={loading} onClick={handRegister} className='bg-blue-600 text-white w-full p-3 rounded-lg hover:bg-blue-700 transition duration-200'>{loading ? "Registering" : "Register"}</button>
                <Link className='text-center mt-4 hover:text-blue-500' to="/login">Akkaunt bormi? Login</Link>
            </form>
        </div>
    );
}

export default Register;
