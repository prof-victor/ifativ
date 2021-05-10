import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Open Sans Condensed';
        font-weight: bolder;
        padding: 20px 40px;
        letter-spacing: 0.5px;

        @media screen and (max-width: 800px) {
            padding: 10px;
        }
    }
    
    a {
        text-decoration: none;
        color: black;
    }
    
    * {
        box-sizing: border-box;
    }
`;
