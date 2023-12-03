import {StyledTextInput, StyledFormArea, StyledFormButton, StyledLabel, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink, CopyrghtText} from '../components/Styles';
import Logo from '../Assets/logo.png';
import { Formik, Form, Field } from 'formik';
import { TextInput } from '../components/FormLib';
import * as Yup from 'yup';
//icons
import {FiMail, FiLock, FiUser} from 'react-icons/fi';
import { ThreeCircles as Loader } from 'react-loader-spinner';

//authservice
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { auth } from './firebase';
const SignUp = ({signupUser}) => {
    const history = useNavigate();
    return (
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme}size ={30}>User Signup</StyledTitle>
                <Formik
                   initialValues={{
                        email: "",
                        username: "",
                        password: "",
                        userType: "'ordinary'", 
                   }}
                   validationSchema={
                    Yup.object({
                        email: Yup.string().email("Invalid email address").required("Required"),
                        password: Yup.string().min(6, "Password is too short").max(20, "Password is too long").required("Required"),
                        username: Yup.string().required("Required"),
                        //repeatPassword: Yup.string().required("Required").oneOf([Yup.ref("password")], "Password Must Match"),
                        userType: Yup.string().required('Required'),
                      })}
                      onSubmit={async(values, { setSubmitting, setFieldError }) => {
                        try {
                            await createUserWithEmailAndPassword(auth, values.email, values.password);
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
                               name="username"
                               type="text"
                               label="UserName"
                               placeholder="JohnDoe12..."
                               icon={<FiUser/>}
                            />
                            <TextInput 
                               name="password"
                               type="password"
                               label="Password"
                               placeholder="password..."
                               icon={<FiLock/>}
                            />

                            <StyledLabel>User Type:</StyledLabel>
                            <div>
                            <label>
                            <Field type="radio" name="userType" value="ordinary" />
                               Ordinary User
                            </label>
                            <label>
                            <Field type="radio" name="userType" value="corporate" />
                               Corporate User
                            </label>
                            </div>
                            <ButtonGroup>
                                {!isSubmitting && (
                                <StyledFormButton
                                    type="submit">SignUp
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
                    Have an Account? <TextLink to="/login">Login</TextLink> 
                </ExtraText>
            </StyledFormArea>
        </div>
    );
};

export default SignUp;