import { StyledTitle, StyledSubTitle, Avatar, StyledButton, ButtonGroup,StyledFormArea,colors} from "../components/Styles";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../Assets/logo.png";
import { getAuth,signOut } from "firebase/auth";
const Dashboard = ()=> {
    const history = useNavigate();


    const logout = async () => {
        const auth = getAuth();
    
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
    

    return(
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
            <Avatar image={Logo}/>
            </div> 
            <StyledFormArea bg ="transparent">
                <StyledTitle size={65}> Welcome To SnapTweet</StyledTitle>
                <ButtonGroup><StyledButton onClick={logout} to="#">Logout</StyledButton></ButtonGroup>
            </StyledFormArea>

        </div>
    );
};

export default Dashboard;
