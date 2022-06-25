import './LoginPage.css'
import '../App.css'

import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UsersService from '../services/UsersService';

export default function LoginPage(props) {
    var loginError = null;
    var navigate = useNavigate();
    const usersService = new UsersService();
    console.log(usersService);

    return (
        usersService.IsLoggedIn() ?
            <Navigate to="/" /> :
            <Formik
                initialValues={{ userName: '', password: '' }}

                validationSchema={Yup.object({
                    userName: Yup.string()
                        .required('Обов\'язкове для заповнення'),
                    password: Yup.string()
                        .required('Обов\'язкове для заповнення'),
                })}

                onSubmit={async (values) => {
                    let result = await usersService.Login(values.userName, values.password);

                    if (!result.success) {
                        loginError = result.text;
                    }
                    else { loginError = null; navigate('/'); }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <label htmlFor="userName">Ім'я</label>
                        <Field name="userName" type="text" />
                        <ErrorMessage name="userName" render={msg => <span className={'styled-error'}>{msg}</span>} />
                        <br />
                        <label htmlFor="password">Пароль</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" render={msg => <span className={'styled-error'}>{msg}</span>} />
                        <br />
                        {loginError &&
                            <span className='styled-error'>{loginError}</span>
                        }
                        <input type="submit" value="Увійти" disabled={isSubmitting}></input>
                    </Form>
                )}
            </Formik>
    );
}