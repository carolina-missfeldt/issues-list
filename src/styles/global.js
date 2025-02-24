import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased !important;
    }

    body {
        font-family: Arial, Helvetica, sans-serif;
    }

    a {
        text-decoration: none;
    }

    button {
        cursor: pointer;
        border: none;   
    }
`;