import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';

import config from '../../../../assets/config';
import routes from '../../../../assets/routes';
import types from '../../../../redux/types';
import css from './index.module.css';

interface Values {
    name: string;
    surname: string;
    email: string;
    password: string;
}

interface Errors {
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
}

// const validEmail: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const FormSignUp = (): ReactElement => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const initialValues: Values = {
        name: '',
        surname: '',
        email: '',
        password: '',
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={(): Errors => {
                const errors: Errors = {};
                return errors;
            }}
            onSubmit={(values, actions) => {
                dispatch({ type: types.SIGNUP_START, payload: values });
                actions.resetForm();
            }}
        >
            {() => (
                <Form>
                    <h2 className={css.title}>Login to get more</h2>

                    <Field className={css.input} type="text" name="name" placeholder="name" />
                    <ErrorMessage name="name" render={msg => <span className={css.errors}>{msg}</span>} />

                    <Field className={css.input} type="text" name="surname" placeholder="surname" />
                    <ErrorMessage name="surname" render={msg => <span className={css.errors}>{msg}</span>} />

                    <Field className={css.input} type="email" name="email" placeholder="email" />
                    <ErrorMessage name="email" render={msg => <span className={css.errors}>{msg}</span>} />

                    <div className={css.wrp}>
                        <button
                            className={css.show}
                            type="button"
                            onClick={() => {
                                setShow(!show);
                            }}
                        >
                            {show ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                        </button>
                        <Field
                            className={css.input}
                            type={show ? 'text' : 'password'}
                            name="password"
                            placeholder="password"
                        />
                        <ErrorMessage name="password" render={msg => <span className={css.errors}>{msg}</span>} />
                    </div>

                    <Link href={routes.auth.login}>
                        <a className={css.link}>Do you already have an account?</a>
                    </Link>

                    <button className="btn btn--gray" type="submit">
                        Submit
                    </button>

                    <p className={css.text}>or signup with:</p>

                    <ul className={css.list}>
                        <li>
                            <a href={config.facebook} style={{ background: 'var(--blue-01)' }} className={css.icon}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    version="1.1"
                                    id="Layer_1"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 512 512"
                                    xmlSpace="preserve"
                                >
                                    <path
                                        style={{ fill: 'var(--white)' }}
                                        d="M134.941,272.691h56.123v231.051c0,4.562,3.696,8.258,8.258,8.258h95.159  c4.562,0,8.258-3.696,8.258-8.258V273.78h64.519c4.195,0,7.725-3.148,8.204-7.315l9.799-85.061c0.269-2.34-0.472-4.684-2.038-6.44  c-1.567-1.757-3.81-2.763-6.164-2.763h-74.316V118.88c0-16.073,8.654-24.224,25.726-24.224c2.433,0,48.59,0,48.59,0  c4.562,0,8.258-3.698,8.258-8.258V8.319c0-4.562-3.696-8.258-8.258-8.258h-66.965C309.622,0.038,308.573,0,307.027,0  c-11.619,0-52.006,2.281-83.909,31.63c-35.348,32.524-30.434,71.465-29.26,78.217v62.352h-58.918c-4.562,0-8.258,3.696-8.258,8.258  v83.975C126.683,268.993,130.379,272.691,134.941,272.691z"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href={config.google} className={css.icon}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    enableBackground="new 0 0 512 512"
                                    viewBox="0 0 512 512"
                                >
                                    <g>
                                        <path
                                            d="m120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308h-86.308c-34.255 44.488-52.823 98.707-52.823 155.785s18.568 111.297 52.823 155.785h86.308v-86.308c-12.142-20.347-19.131-44.11-19.131-69.477z"
                                            fill="#fbbd00"
                                        />
                                        <path
                                            d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216c-20.525 12.186-44.388 19.039-69.569 19.039z"
                                            fill="#0f9d58"
                                        />
                                        <path
                                            d="m139.131 325.477-86.308 86.308c6.782 8.808 14.167 17.243 22.158 25.235 48.352 48.351 112.639 74.98 181.019 74.98v-120c-49.624 0-93.117-26.72-116.869-66.523z"
                                            fill="#31aa52"
                                        />
                                        <path
                                            d="m512 256c0-15.575-1.41-31.179-4.192-46.377l-2.251-12.299h-249.557v120h121.452c-11.794 23.461-29.928 42.602-51.884 55.638l86.216 86.216c8.808-6.782 17.243-14.167 25.235-22.158 48.352-48.353 74.981-112.64 74.981-181.02z"
                                            fill="#3c79e6"
                                        />
                                        <path
                                            d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606c-48.352-48.352-112.639-74.981-181.02-74.981l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                                            fill="#cf2d48"
                                        />
                                        <path
                                            d="m256 120v-120c-68.38 0-132.667 26.629-181.02 74.98-7.991 7.991-15.376 16.426-22.158 25.235l86.308 86.308c23.753-39.803 67.246-66.523 116.87-66.523z"
                                            fill="#eb4132"
                                        />
                                    </g>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </Form>
            )}
        </Formik>
    );
};

export default FormSignUp;
