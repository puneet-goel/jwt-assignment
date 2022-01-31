import React from 'react';
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage, Field, Form } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { login } from "../../api";
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';

const schema = Yup.object().shape({
    email: Yup.string('Enter your email').email('Must be a valid email').required('Required'),
    password: Yup.string('Enter your password').min(5, 'Too Short!').required('Required')
});

const Login = ({setUserValid}) => {
    const navigate = useNavigate();

    return(
        <div className="container-fluid pt-5">
            <div className="row justify-content-center" style={{minHeight: '50vh'}}>
                <div className="col-8 col-sm-6 col-md-4 bg-white p-3">
                    <h3 className="text-center py-3 font-weight-bold">Admin Log in</h3>
                    <Formik
                        initialValues= {{
                            email: '',
                            password: ''
                        }}
                        validationSchema = {schema}
                        onSubmit = {
                            async(values) => {
                                const auth = await login(values.email, values.password);
                                if(auth){
                                    setUserValid(true);
                                    navigate('/');
                                }else{
                                    toast('User not Authenticated', { type: 'error', theme: 'dark' });
                                }
                            }
                        }
                    >
                        {() => (
                            <Form >

                                <div className="form-floating my-3">
                                    <Field name="email" type="email" autoComplete="off" placeholder="abc@example.com" className="form-control"/>
                                    <label htmlFor="email">Email</label>
                                    <ErrorMessage name="email" render={ msg => 
                                        <div className="form-text text-danger">
                                            {msg}
                                        </div>
                                    }/>
                                </div>

                                <div className="form-floating">
                                    <Field name="password" type="password" autoComplete="off" placeholder="*********" className="form-control" />
                                    <label htmlFor="password" >Password</label> 
                                    <ErrorMessage name="password" render={ msg => 
                                        <div className="form-text text-danger">
                                            {msg}
                                        </div>
                                    }/>
                                </div>

                                <div className="d-grid gap-2 my-4">
                                    <button className="btn btn-primary" type="submit">
                                        Log in
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable
                        pauseOnHover
                    />
                </div>
           </div>
        </div>
    )
}

export default Login;
