// Profile.jsx
import React from 'react';
import { Avatar, StyledTitle, StyledSubTitle, ButtonGroup, StyledButton, StyledFormArea } from '../components/Styles';
import { useNavigate } from 'react-router-dom';
import Logo from '../Assets/logo.png';
import { signOut } from 'firebase/auth';

const Profile = () => {
    const history = useNavigate();


    return (
        <div>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "transparent",
                    width: "100%",
                    padding: "15px",
                    display: "flex",
                    justifyContent: "flex-start",
                }}>
                <Avatar image={Logo} />
            </div>
            <StyledFormArea bg="transparent">
                <StyledTitle size={30}>Your Display Name</StyledTitle>
                <StyledSubTitle size={18}>@yourusername</StyledSubTitle>
                <StyledSubTitle size={18}>Your Bio or Description Goes Here</StyledSubTitle>
                <ButtonGroup>
                    <StyledButton>Edit Profile</StyledButton>
                </ButtonGroup>
            </StyledFormArea>
        </div>
    );
};

export default Profile;

