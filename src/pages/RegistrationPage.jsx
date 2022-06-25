import './LoginPage.css'
import '../App.css'

import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UsersService from '../services/UsersService';

export default function RegistrationPage(props) {
    var loginError = null;
    var navigate = useNavigate();
    const usersService = new UsersService();
    console.log(usersService);

    return (
        usersService.IsLoggedIn() ?
            <Navigate to="/" /> :
            <Formik
                initialValues={{ userName: '', email: '', password: '', confirmPassword: '' }}

                validationSchema={Yup.object({
                    userName: Yup.string()
                        .required('Обов\'язкове для заповнення'),
                    email: Yup.string()
                        .required('Обов\'язкове для заповнення')
                        .email('Введіть, будь ласка, дійсну електронну адресу'),
                    password: Yup.string()
                        .required('Обов\'язкове для заповнення')
                        .min(8, 'Пароль повинен бути не менше 8 символів')
                        .max(20, 'Пароль повинен бути не більше 20 символів'),
                    confirmPassword: Yup.string()
                        .required('Обов\'язкове для заповнення')
                        .oneOf([Yup.ref('password'), null], 'Паролі повинні збігатися')
                })}

                onSubmit={async (values) => {
                    let result = await usersService.Register(values.userName, values.email, values.password, values.confirmPassword);

                    if (!result.success) {
                        loginError = result.text.map(e => e.description).join();
                    }
                    else { loginError = null; navigate('/login'); }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <label htmlFor="userName">Ім'я</label>
                        <Field name="userName" type="text" />
                        <ErrorMessage name="userName" render={msg => <span className={'styled-error'}>{msg}</span>} />
                        <br />
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email" />
                        <ErrorMessage name="email" render={msg => <span className={'styled-error'}>{msg}</span>} />
                        <br />
                        <label htmlFor="password">Пароль</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" render={msg => <span className={'styled-error'}>{msg}</span>} />
                        <br />
                        <label htmlFor="confirmPassword">Повторіть пароль</label>
                        <Field name="confirmPassword" type="password" />
                        <ErrorMessage name="confirmPassword" render={msg => <span className={'styled-error'}>{msg}</span>} />
                        <br />
                        {loginError &&
                            <span className='styled-error'>{loginError}</span>
                        }
                        <input type="submit" value="Зареєструватись" disabled={isSubmitting}></input>
                    </Form>
                )}
            </Formik>
    );
}