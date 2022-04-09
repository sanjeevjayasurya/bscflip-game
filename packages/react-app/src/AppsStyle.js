import styled from 'styled-components';


export const LightEffect = styled.div`
  color: white;
  background: red;
  position: absolute;
  top:0%;
  left:0%
  height: 70px;
  width: 150px;
`

export const backgroundLogo = styled.header`
    postion: absolute;
    top: 0%;
    left:0%
`

export const Logo = styled.div`
    margin 0;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
  `

  export const Choice = styled.div`
    margin 0;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  
  `;

  export const Like = styled.h1`
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
    font-weight: 500;
    letter-spacing: 10px;
    color: #ffffff;
    font-size: 20px;
    left: 50%;
  `;

  export const Heads = styled.div`
    margin: 0;
    position: absolute;
    top: 45%;
    left: -webkit-calc(50% - 155px)
  `;

  export const Tails = styled.div`
    margin: 0;
    position: absolute;
    top: 45%;
    left: -webkit-calc(50% + 5px)
`;

  export const Button = styled.button`
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
    // letter-spacing: 3px;
    height: 50px;
    width: 125px;
    background: #1E2124;
    border-radius: 20% / 50%;
    border: .5px solid #545659;
    position: absolute;
    color: white;
    z-index: 1;
    cursor:pointer;
    ${props => !props.isDisabled && ":hover" } {
      background-color: ${props => props.isActive ? "#F0B912" : "#2A2D32"};
      border: .5px solid #F0B912;
    }
  `;

  export const ButtonHoverEffect = styled.div`
    width: 123px;
    height: 50px;
    position absolute;
    top: -25px;
    left: 0%;
    // transform: translate(-50%, -50%);
    background-image: linear-gradient(to top,rgba(240, 185, 18, .5), rgba(240,185,18,0));
  `;

  export const Amount = styled.div`
    margin 0 auto;
    position: absolute;
    display: flex;
    justify-content: space-between;
    max-width: 200px;
    padding: 10px 0;
    top: 55%;
    left: 50%;
  `;

  export const For = styled.h1`
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
    font-weight: 500;
    letter-spacing: 10px;
    color: #ffffff;
    font-size: 20px;
    transform: translate(-50%, -50%);
  `;

  export const AmountBTNDiv = styled.div`
    margin: 0;
    position: absolute;
    display: flex;
    bottom: -95%;
    overflow: hidden; /* for clearfix */
    transform: translate(-50%, -50%);
    // align-items: center;
  `;

  export const BNB_Button = styled.button`
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
    height: 50px;
    width: 125px;
    background: #1E2124;
    border-radius: 20% / 50%;
    color: white;
    border: .5px solid #545659;
    justify-content: space-between;
    margin:5px;
    position: realtive;
    cursor:pointer;
    ${props => !props.isDisabled && ":hover" } {
      box-shadow: 0px 0px 5px 1px rgba(240, 185, 18, .5);
    }
  `;

  export const Span1 = styled.div`
    height: 4px;
    position: absolute;
    background-image: linear-gradient(#484848,#666666);
    left: 50%;
    width: 525px; 
    opacity: .5;
    top: 75%;
    transform: translate(-50%, -50%);
    // border: 1px solid #fff;
    border-radius: 1% / 50%;
  `;

  export const Span2 = styled.div`
    height: 4px;
    opacity: .5;
    position: absolute;
    background-image: linear-gradient(#484848,#666666);
    left: 50%;
    width: 525px;  
    top: 87.5%;
    transform: translate(-50%, -50%);
    // border: 1px solid #fff;
    border-radius: 1% / 50%;
  `;

  export const DoubleOrNothingBtn = styled.button`
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
    height: 50px;
    width: 150px;
    color: rgba(255, 255, 255, 1);
    background: #1E2124;
    border-radius: 20% / 50%;
    border: .5px solid #545659;
    position: absolute;
    top: 81.5%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor:pointer;
    ${props => !props.isDisabled && ":hover" } {
      color: rgba(255, 255, 255, 1);
      background: #F0B912;
      box-shadow: 0 5px 30px rgba(240, 185, 18, .8);
    }
  `;
