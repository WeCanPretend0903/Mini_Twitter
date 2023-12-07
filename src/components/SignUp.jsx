import React from 'react';
import { StyledTextInput, StyledFormArea, StyledFormButton, StyledLabel, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink, CopyrghtText } from '../components/Styles';
import Logo from '../Assets/logo.png';
import { Formik, Form, Field } from 'formik';
import { TextInput } from '../components/FormLib';
import * as Yup from 'yup';
import userData from '../Data/UserData.json';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { ThreeCircles as Loader } from 'react-loader-spinner';

const SignUp = ({ signupUser }) => {
  const history = useNavigate();

  return (
    <div>
      <StyledFormArea>
        <Avatar image={Logo} />
        <StyledTitle color={colors.cyan} size={30}>User Signup</StyledTitle>
        <Formik
          initialValues={{
            email: "",
            username: "", // Set default username to empty string
            password: "",
            userType: "ordinary",
          }}
          validationSchema={Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string().min(6, "Password is too short").max(20, "Password is too long").required("Required"),
            username: Yup.string().required("Required"),
            userType: Yup.string().required('Required'),
          })}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              console.log("Submitting form with values:", values);
          
              // Find the user in the JSON data
              const user = userData.users.find(
                (user) => user.email === values.email && user.password === values.password && user.name === values.username
              );
          
              console.log("Found user:", user);
          
              // Check if the user exists
              if (user) {
                // Assuming signup was successful, set user information in Redux store
                signupUser(user);
          
                // Redirect to dashboard
                history('/login', { state: { signedUpUser: user } });
              } else {
                // User not found
                setFieldError('email', 'Invalid email, username, or password');
              }
            } catch (error) {
              console.error('Signup error:', error.message);
            } finally {
              if (setSubmitting) {
                setSubmitting(false);
              }
            }
          }}
          
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput
                name="email"
                type="text"
                label="Email Address"
                placeholder="Email Address..."
                icon={<FiMail />}
              />
              <TextInput
                name="username"
                type="text"
                label="UserName"
                placeholder="JohnDoe12..."
                icon={<FiUser />}
              />
              <TextInput
                name="password"
                type="password"
                label="Password"
                placeholder="password..."
                icon={<FiLock />}
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

