import { createGlobalStyle } from 'styled-components';

import { device } from './breakpoints';

const Common = createGlobalStyle`

//Fonts Size

// h1 {
    
// }
// h2 {
// }

// h3 {
   
// }
// h4 {
    
// h5 {
    
// }
// p {
    
// }

/*--- Margin and Padding ---*/

//padding
.p-0{
    padding: 0;
}
.pr-0{
    padding-right: 0;
}
.pl-0{
    padding-left: 0;
}
.pt-0{
    padding-right: 0;
}
.pb-0{
    padding-left: 0;
}

// margin
.m-0{
    padding: 0;
}
.mr-0{
    padding-right: 0;
}
.ml-0{
    padding-left: 0;
}
.mt-0{
    padding-right: 0;
}
.mb-0{
    padding-left: 0;
}
.mt-10{
    margin-top: 10px;
}
.mb-10{
    margin-bottom: 10px;
}
.mt-20{
    margin-top: 20px;
}
.mb-20{
    margin-bottom: 20px;
}
.mt-30{
    margin-top: 30px;
}
.mb-30{
    margin-bottom: 30px;
}
.mt-40{
    margin-top: 40px;
}

.text-center {
    text-align: center;
}

.textRight {
    text-align: right;
}

.text-success {
    color: --success--color;
}

.textDanger {
    color: #d33520;
}

.text-warning {
    color: --warning--color;
}

.text-info {
    color: --info--color;
}

// Width css
.w-100 {
    width: 100%;
}

// Height SCSS
.min-h100 {
    min-height: 100vh;
}

.h-100 {
    height: 100%;
}

.d-none{
 display: none;
}

.container{
    width: 1440px;
    max-width: 100%;
    padding-left: 66px;
    padding-right: 66px;
    margin: 0 auto;
}

.container-full {
    width: 100%;
    max-width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    margin: 0 auto;
}

.inputError{
    font-size: 14px;
    font-weight: 400;
    text-align: right;
    margin: 5px 20px 0;
}

  ::-webkit-scrollbar {
      background-color: transparent;
      width: 3px;
      height: 5px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #cccccc;
      border-radius: 50px;
    }

@media only screen and (${device.xxl}) {
  .container{
    width: 1600px;
  }
}

@media only screen and (${device.xl}) {
    .container{
    width: 1140px;
    padding: 0 30px;
}}

@media only screen and (${device.lg}) {
  .container{
    width: auto;
    padding: 0 15px;
  }
}

`;

export default Common;
