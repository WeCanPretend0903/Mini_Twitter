import styled from 'styled-components';
import background from '../Assets/bg.png';

import {Link} from 'react-router-dom';
export const colors ={
    primary: "#fff",
    theme: "#BE185D",
    light1: "#f3f4f6",
    light2: "#e5e7eb",
    dark1: "#1f2937",
    dark2: "#4b5563",
    dark3: "#9ca3af",
    red: "#dc2626",
    cyan: "#00FFFF"
}

export const StyledContainer = styled.div`
      margin: 0;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${background});
      background-size: cover;
      background-attachment: fixed;

`;

export const StyledTitle = styled.h2`
     font-size: ${(props) => props.size}px;
     text-align: center;
     color: ${(props) => props.color ? props.color : colors.cyan};
     padding; 5px;
     margin-bottom: 20px;
     font-family: 'Arial', sans-serif;

`;

export const StyledSubTitle = styled.p`
  font-size: ${(props) => props.size}px;
  text-align: center;
  color: ${(props) => props.color ? props.color : colors.cyan};
  padding: 5px;
  margin-bottom: 25px;
  font-family: 'Arial', sans-serif;
`;


export const Avatar = styled.div`
     width: 85px;
     height: 85px;
     border-radius: 50px;
     background-image: url(${props => props.image});
     background-size: cover;
     background-position: center;
     margin: auto;

`;

export const StyledButton = styled(Link)`
     padding: 10px;
     width: 150px;
     background-color: transparent;
     font-size: 16px;
     border: 3px solid ${colors.primary};
     border-radius: 25px;
     color: ${colors.primary};
     text-decoration: none;
     text-align: center;
     transition: ease-in-out 0.3s;
     outline: 0;
     font-family: 'Arial', sans-serif;


     &:hover{
        background-color: ${colors.primary};
        color: ${colors.cyan};
        cursor: pointer;
     }
`;

export const ButtonGroup = styled.div`
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      margin-top: 25px;
      
`;

//Input
export const StyledTextInput = styled.input`
      width: 280px;
      padding: 15px;
      padding-left: 50px;
      font-size: 17px;
      letter-spacing: 1px;
      color: ${colors.dark1};
      background-color: ${colors.light2}
      border: 0;
      outline: 0;
      display: block;
      margin: 5px auto 10px auto;
      transition: ease-in-out 0.3s;
      

      ${(props) => props.invalid && `background-color: ${colors.light1}; color: ${colors.primary};`}

      &:focus {
        background-color: ${colors.dark2};
        color: ${colors.primary};

      }
`;

export const StyledLabel = styled.p`   
      text-align: left;
      font-size: 13px;
      font-weight: bold;
      font-family: 'Arial', sans-serif;

`;

export const StyledFormArea = styled.div`
      background-color: ${props => props.bg || colors.light2};
      test-align: center;
      padding: 45px 55px;

`;

export const StyledFormButton = styled.button`
      padding: 10px;
      width: 150px;
      background-color: transparent;
      font-size: 16px;
      border: 2px solid ${colors.cyan};
      border-radius: 25px;
      color: ${colors.cyan};
      transition: ease-in-out 0.3s;
      outline: 0;

      &:hover{
        background-color: ${colors.dark1};
        color: ${colors.cyan};
        cursor: pointer;
      }
      
`;

export const ErrorMsg = styled.div`
       font-size: 11px;
       color: ${colors.red};
       margin-top: -5px;
       margin-bottom: 10px;
       text-align: left;
`;

export const ExtraText = styled.p`
       font-size: ${(props) => props.size}px;
       text-align: center;
       color: ${(props) => (props.color? props.color : colors.dark2)}
       padding: 2px;
       margin-top: 10px;
       font-family: 'Arial', sans-serif;
`;
export const TextLink = styled(Link)`
       text-decoration: none;
       color: ${colors.theme}
       transition: ease-in-out 0.3s;

       &:hover {
        text-decoration: underline;
        letter-spacing: 2px;
        font-weight: bold;
       }
`;
//icons
export const StyledIcon = styled.p`
       color: ${colors.dark1};
       position: absolute;
       font-size: 20px;
       top: 24px;
       ${(props) => props.right && `right: 15px; `}
       ${(props) => !props.right && `left: 15px;`}

`;
export const StyledUserTitle = styled.h2`
      font-size: ${(props) => props.size}px;
      text-align: center;
      color: ${(props) => props.color ? props.color : colors.dark1};
      padding; 5px;
      margin-bottom: 20px;
      font-family: 'Arial', sans-serif;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledWButton = styled(Link)`
     padding: 10px;
     width: 150px;
     background-color: transparent;
     font-size: 20px;
     border: 3px solid ${colors.primary};
     border-radius: 25px;
     color: ${colors.primary};
     text-decoration: none;
     text-align: center;
     transition: ease-in-out 0.3s;
     outline: 0;
     font-family: 'Arial', sans-serif;


     &:hover{
        background-color: ${colors.dark1};
        color: ${colors.theme};
        cursor: pointer;
     }
`;
export const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;