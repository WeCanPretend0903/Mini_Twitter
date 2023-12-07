import React from 'react';
import { StyledFormArea, StyledFormButton, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink } from '../components/Styles';
import Logo from '../Assets/logo.png';
import { Formik, Form } from 'formik';
import { TextInput } from '../components/FormLib';
import * as Yup from 'yup';
import { FiMail, FiLock } from 'react-icons/fi';
import { ThreeCircles as Loader } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import userData from '../Data/UserData.json';

const Login = () => {
    const navigate = useNavigate(); // Use useNavigate instead of history
  
    const handleLogin = async (values, { setSubmitting, setFieldError }) => {
        try {
          // Find the user based on the provided email and password
          const user = userData.users.find((user) =>
            user.email === values.email && user.password === values.password
          );
          if (user) {
            // Fetch the user ID
            const userId = user.id;
            // Store the user and userId in localStorage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userId', userId);
            // Redirect to the dashboard
            navigate('/dashboard');
          } else {
            throw new Error('Invalid email or password');
          }
        } catch (error) {
          console.error('Login error:', error.message);
          if (setFieldError) {
            setFieldError('email', 'Invalid email or password');
          }
        } finally {
          if (setSubmitting) {
            setSubmitting(false);
          }
        }
      };

  return (
    <div>
      <StyledFormArea>
        <Avatar image={Logo} />
        <StyledTitle color={colors.theme} size={30}>
          User Login
        </StyledTitle>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Password is too short').max(20, 'Password is too long').required('Required'),
          })}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput name="email" type="text" label="Email Address" placeholder="Email Address..." icon={<FiMail />} />
              <TextInput name="password" type="password" label="Password" placeholder="password..." icon={<FiLock />} />
              <ButtonGroup>
                {!isSubmitting && <StyledFormButton type="submit">Login</StyledFormButton>}
                {isSubmitting && <Loader color={colors.theme} height={49} width={100} />}
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
