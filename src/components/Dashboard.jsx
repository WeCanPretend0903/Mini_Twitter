import React, { useState } from 'react';
import { StyledTitle, StyledButton, StyledFormArea, Avatar, ButtonGroup } from '../components/Styles';
import Logo from "../Assets/logo.png";
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

const Dashboard = () => {
    const history = useNavigate();
    const auth = getAuth();
    const [balance, setBalance] = useState(0);

    const generateCurrency = () => {
        setBalance(prevBalance => prevBalance + 1);
    };

    const logout = async () => {
        try {
            // Perform any additional logout logic specific to your application
    
            // Sign out the user using Firebase authentication
            await signOut(auth);
    
            // Redirect to Mainhome page
            history('/');
        } catch (error) {
            console.error('Logout error:', error.message);
            // Handle error as needed
        }
    };

    return (
        <div>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: 'transparent',
                    width: '100%',
                    padding: '15px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}
            >
                <Avatar image={Logo} />
            </div>
            <StyledFormArea bg="transparent">
                <StyledTitle size={65}>Welcome To SnapTweet</StyledTitle>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <StyledButton onClick={generateCurrency}>Generate Currency</StyledButton>
                    <p>Balance: ${balance.toFixed(2)}</p>
                </div>
                <ButtonGroup><StyledButton onClick={logout} to="#">Logout</StyledButton></ButtonGroup>
            </StyledFormArea>
        </div>
    );
};

export default Dashboard;
