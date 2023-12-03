import {StyledTextInput, StyledFormArea, StyledFormButton, StyledLabel, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink, CopyrghtText} from '../components/Styles';

import Logo from '../Assets/logo.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Formik, Form } from 'formik';
import { TextInput } from '../components/FormLib';
import * as Yup from 'yup';
//icons
import {FiMail, FiLock, FiUser} from 'react-icons/fi';
import { ThreeCircles as Loader } from 'react-loader-spinner';

//authservice
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { auth } from './firebase';
const Login = () => {
    const history = useNavigate();
    
    return (
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme}size ={30}>User Login</StyledTitle>
                <Formik
                   initialValues={{
                        email: "",
                        //username: "",
                        password: "",
                   }}
                   validationSchema={
                    Yup.object({
                        email: Yup.string().email("Invalid email address").required("Required"),
                        //username: Yup.string().matches(/^[a-zA-Z0-9_]+$/, "Invalid User Name").required("Required"),
                        password: Yup.string()
                          .min(6, "Password is too short")
                          .max(20, "Password is too long")
                          .required("Required"),
                      })
                      }
                      onSubmit={async(values, { setSubmitting, setFieldError }) => {
                        try {
                            await signInWithEmailAndPassword(auth, values.email, values.password);
                            // Additional actions after successful login if needed
                            history('/dashboard');
                        } catch (error) {
                            console.error('Login error:', error.message);
                            if (setFieldError) {
                                setFieldError('email', 'Login error');
                            }
                        } finally {
                            if (setSubmitting) {
                                setSubmitting(false); // Only set submitting to false if it's defined
                            }
                        }
                      }}>
                    {({isSubmitting}) => (
                        <Form>
                            <TextInput 
                               name="email"
                               type="text"
                               label="Email Address"
                               placeholder="Email Address..."
                               icon={<FiMail/>}
                            />
                            <TextInput 
                               name="password"
                               type="password"
                               label="Password"
                               placeholder="password..."
                               icon={<FiLock/>}
                            />
                            <ButtonGroup>
                                {!isSubmitting && (
                                <StyledFormButton 
                                     type="submit">Login
                                </StyledFormButton>
                                )}
                                {isSubmitting && (
                                    <Loader
                                        color={colors.theme}
                                        height={49}
                                        width={100}
                                    />
                                )}
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>
                <ExtraText>
                    New here? <TextLink to="/signup">Signup</TextLink> 
                </ExtraText>
            </StyledFormArea>
        </div>
    );
};

export default Login;