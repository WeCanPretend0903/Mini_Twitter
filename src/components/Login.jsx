import {StyledTextInput, StyledFormArea, StyledFormButton, StyledLabel, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink, CopyrghtText} from '../components/Styles';

import Logo from '../Assets/logo.png';

import { Formik, Form } from 'formik';
import { TextInput } from '../components/FormLib';
import * as Yup from 'yup';
//icons
import {FiMail, FiLock} from 'react-icons/fi';
import { ThreeCircles as Loader } from 'react-loader-spinner';

//authservice
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
const Login = ({loginUser}) => {
    const history = useNavigate();
    return (
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme}size ={30}>User Login</StyledTitle>
                <Formik
                   initialValues={{
                        email: "",
                        password: "",
                   }}
                   validationSchema={
                    Yup.object({
                        email: Yup.string().email("Invalid email address")
                        .required("Required"),
                        password: Yup.string()
                        .min(6, "Password is too short")
                        .max(20, "Password is too long")
                        .required("Required"),
                    })}
                   onSubmit={(values, {setSubmitting, setFieldError}) => {
                        console.log(values);
                        loginUser(values, history, setFieldError, setSubmitting);
                   }}
                >
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