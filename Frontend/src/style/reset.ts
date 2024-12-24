import { createGlobalStyle } from 'styled-components';

const Reset = createGlobalStyle`

* {
    margin:0px;
    padding:0px;
    border:none;
    outline:none;
    -webkit-box-sizing :border-box;
    -ms-box-sizing :border-box;
    -moz-box-sizing :border-box;
    box-sizing :border-box;
    font-family: 'Fira Sans', sans-serif;
}

html {
    -webkit-text-size-adjust:none;
    -ms-text-size-adjust:none;
    -moz-text-size-adjust:none;
    text-size-adjust:none;
}

body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

a {
    text-decoration: none;
    &:hover,&:focus {
        text-decoration: none;
    }
}
button {
    outline: 0;
    &:hover, &:focus {
        outline: 0;
    }
}

h1, h2, h3, h4, h5, h6, strong, b {
    margin: 0;
    font-weight: normal;
    line-height: normal;
    letter-spacing: 1px;

}
p {
    margin: 0;
    line-height: normal;

}

ul,ol {
    list-style: none;
    margin: 0;
    padding: 0;
}
div,aside,figure,figcaption, label {
    margin: 0;
}
section,header,footer{
    display: inline-block;
    width: 100%;
}

.transition {
    -webkit-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

header{
     /* -webkit-appearance: none;
    -ms-appearance: none;
    -moz-appearance: none;
    appearance: none; */
}
::-moz-selection {
    background: rebeccapurple;
    color: $white;
}
::selection {
    background: rebeccapurple;
    color: $white;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

::-webkit-input-placeholder {text-align: left;}
:-moz-placeholder {text-align: left;}
::-moz-placeholder {text-align: left;}
:-ms-input-placeholder {text-align: left;}

`;
export default Reset;
