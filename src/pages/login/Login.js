import {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Login.scss';

export const LoginPage = () => {

    const [loginForm, setLoginForm] = useState({login: '', password: ''});
    const [isFormValid, setIsFormValid] = useState(true);

    const changeFormValue = (value, fieldName) => {
        const loginFormCopy = {...loginForm};
        loginFormCopy[fieldName] = value;
        setLoginForm(loginFormCopy);
    }

    const loginUser = (event) => {
        event.preventDefault();
        console.log('loginUser ', loginForm);
        if(checkFormValid()) {
            console.log('form is valid');
            loginRequest();
        }
    }

    const loginRequest = () => {
        axios.post('http://localhost:8080/login', loginForm)
            .then(res => {
                console.log('res ', res);
            })
            .catch(err => {
                if(err.response.status === 401) {
                    setIsFormValid(false);
                }
            })
    }

    const checkFormValid = () => {
        const loginFormValues = Object.values(loginForm);
        const validValues = loginFormValues.every(value => value !== ''); 
        setIsFormValid(validValues);
        return validValues;
    }

    return (
        <>
            <form className='form' onSubmit={loginUser}>
                <h2 className='form-title'>Вход</h2>

                <span>Логин:</span>
                <input
                    type='text'
                    className='form-login'
                    value={loginForm.login}
                    onChange={(event) => changeFormValue(event.target.value, 'login')}
                    placeholder='Введите логин'
                ></input>

                <span>Пароль:</span>
                <input
                    type='password'
                    className='form-password'
                    value={loginForm.password}
                    onChange={(event) => changeFormValue(event.target.value, 'password')}
                    placeholder='Введите пароль'
                ></input>


                {!isFormValid && <span style={{color: 'red'}}>Логин или пароль введены неверно</span>}

                <button type='submit' className='form-btn-submit'>
                    Войти
                </button>

                <Link to='/registration' className='form-btn-regist'>
                    Зарегистрироваться{' '}
                </Link>
            </form>
        </>
    );
};