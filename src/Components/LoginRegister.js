// LoginRegister.js
import React, { useState, useEffect } from 'react';
import '../styles/LoginRegister.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { loginUser, registerUser } from '../Components/auth';

const LoginRegister = () => {
    const navigate = useNavigate();

    const [action, setAction] = useState('login');
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const registerLink = () => {
        setAction('register');
        setStep(1);
    };

    const loginLink = () => setAction('login');

    const handleRegister = async (e) => {
        e.preventDefault();
        const userDetails = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            phone: phoneNumber,
            address: address,
            city: city,
            state: state,
            country: country,
            pin_code: pincode,
            date_of_birth: dateOfBirth,
        };
        try {
            await registerUser(userDetails);
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password, rememberMe);
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="login-register-page">
            <div className={`wrapper ${action}`}>
                {action === 'login' && (
                    <div className="form-box login">
                        <form onSubmit={handleLogin}>
                            <h1>Login</h1>
                            <div className="input-box">
                                <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <MdEmail className='icon'/>
                            </div>
                            <div className="input-box">
                                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <FaLock className='icon'/>
                            </div>
                            <div className="remember-forgot">
                                <label>
                                    <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                                     Remember me
                                </label>
                                <a href='#' onClick={() => alert("Feature not available")}>Forgot Password?</a>
                            </div>
                            <button type="submit" className='login-btn'>Login</button>
                            <div className="register-link">
                                <p>Don't have an account? 
                                    <a href='#' onClick={registerLink}> Register</a>
                                </p>
                            </div>
                        </form>
                    </div>
                )}

                {action === 'register' && (
                    <div className="form-box register">
                        <form onSubmit={handleRegister}>
                            <h1>Register</h1>
                            
                            {step === 1 && (
                                <>
                                    <div className="input-box">
                                        <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                        <FaUser className='icon'/>
                                    </div>
                                    <div className="input-box">
                                        <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                        <FaUser className='icon'/>
                                    </div>
                                    <div className="input-box">
                                        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                        <MdEmail className='icon'/>
                                    </div>
                                    <div className="input-box">
                                        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                                        <FaLock className='icon'/>
                                    </div>
                                    <button type="button" onClick={nextStep}>Next</button>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <div className="input-box">
                                        <input type="text" placeholder='Phone Number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                                    </div>
                                    <div className="input-box">
                                        <input type="text" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} required />
                                    </div>
                                    <div className="input-box">
                                        <input type="text" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} required />
                                    </div>
                                    <div className="input-box">
                                        <input type="text" placeholder='State' value={state} onChange={(e) => setState(e.target.value)} required />
                                    </div>
                                    <button type="button" onClick={prevStep}>Back</button>
                                    <button type="button" onClick={nextStep}>Next</button>
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <div className="input-box">
                                        <input type="text" placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)} required />
                                    </div>
                                    <div className="input-box">
                                        <input type="text" placeholder='Pincode' value={pincode} onChange={(e) => setPincode(e.target.value)} required />
                                    </div>
                                    <div className="input-box">
                                        <input type="date" placeholder='Date of Birth' value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
                                    </div>
                                    <button type="button" onClick={prevStep}>Back</button>
                                    <button type="submit">Register</button>
                                </>
                            )}
                            <div className="register-link">
                                <p>Already have an account?
                                    <a href='#' onClick={loginLink}> Login</a>
                                </p>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginRegister;
