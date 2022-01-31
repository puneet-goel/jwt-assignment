import React from 'react';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { register } from "../../api";
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';

const regex = /^[a-zA-Z0-9]+$/ ;
const phone = /^[0-9]{10}$/ ;

const schema = Yup.object().shape({
    username: Yup.string('Enter your username').min(3,'Too Short').max(15, 'Must be 20 characters or less').matches(regex, "Must be a valid username").required('Required'),
    email: Yup.string('Enter your email').email('Must be a valid email').required('Required'),
    mobile: Yup.string('Enter your mobile number').matches(phone, "Must be a valid phone number").required('Required'),
    address: Yup.string('Enter your address').required('Required')
});

const AddUser = () => {

    return(
        <div className="container-fluid py-3" >
            <div className="row justify-content-center">
                <div className="col-8 col-sm-6 col-md-4 bg-white p-3 border border-3 border-dark">
                    <h3 className="text-center pt-2 font-weight-bold">Add User</h3>
                    <Formik
                        initialValues= {{
                            username: '',
                            email: '',
                            mobile: '',
                            address: '',
                        }}
                        validationSchema = {schema}
                        onSubmit = { 
                            async(values, {resetForm}) => {
                                const isAdd = await register(values.username, values.mobile, values.email, values.address );
                                if(isAdd){
                                    toast('User added successfully', { type: 'success', theme: 'dark' });
                                }else{
                                    toast('User Not added (same username or email)', { type: 'error', theme: 'dark' });
                                }
                                resetForm({values: ''});
                            }
                        }
                    >
                        {() => (
                            <Form >
                                <div className="form-floating mb-3">
                                    <Field name="username" type="string" autoComplete="off" placeholder="daniel" className="form-control"/>
                                    <label htmlFor="username">username</label>
                                    <small className="form-text text-muted">only alphanumeric characters allowed</small>
                                    <ErrorMessage name="username" render={ msg => 
                                        <div className="form-text text-danger">
                                            {msg}
                                        </div>
                                    }/>
                                </div>

                                <div className="form-floating mb-2">
                                    <Field name="mobile" type="tel" autoComplete="off" placeholder="98723****" className="form-control" />
                                    <label htmlFor="mobile" >Mobile</label> 
                                    <ErrorMessage name="mobile" render={ msg => 
                                        <div className="form-text text-danger">
                                            {msg}
                                        </div>
                                    }/>
                                </div>

                                <div className="form-floating mb-2">
                                    <Field name="email" type="email" autoComplete="off" placeholder="abc@example.com" className="form-control"/>
                                    <label htmlFor="email">Email</label>
                                    <ErrorMessage name="email" render={ msg => 
                                        <div className="form-text text-danger">
                                            {msg}
                                        </div>
                                    }/>
                                </div>

                                <div className="form-floating mb-2">
                                    <Field name="address" type="text" autoComplete="off" placeholder="India" className="form-control" />
                                    <label htmlFor="address" className="form-label">Address</label> 
                                    <ErrorMessage name="address" render={ msg => 
                                        <div className="form-text text-danger">
                                            {msg}
                                        </div>
                                    }/>
                                </div>

                                <div className="d-grid gap-2 mt-2">
                                    <button className="btn btn-primary" type="submit">
                                        ADD USER
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

export default AddUser;