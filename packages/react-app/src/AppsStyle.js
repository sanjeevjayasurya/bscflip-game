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
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
  `

  export const Choice = styled.div`
    margin 0;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  
  `;

  export const Like = styled.h1`
    color: #ffffff;
    font-size: 30px;
  `;


  export const Heads = styled.div`
    margin: 0;
    position: absolute;
    top: 50%;
    left: -webkit-calc(50% - 155px)
  `;

  export const Tails = styled.div`
    margin: 0;
    position: absolute;
    top: 50%;
    left: -webkit-calc(50% + 5px)
`;

  export const Button = styled.button`
    height: 50px;
    width: 125px;
    background: #27292D;
    border-radius: 20% / 50%;
    border: 1px solid #545659;
    position: absolute;
    color: white;
    z-index: 1;
 

    ${props => !props.isDisabled && ":hover" } {
      background-color: ${props => props.isActive ? "#F0B912" : "#2A2D32"};
      border: 1px solid #F0B912;
    }
  `;

  export const ButtonHoverEffect = styled.span`
    background: #2A2D32;
    height: 70px;
    width: 145px;
    position: absolute;
    overflow: hidden;
    z-index: 2;
    top: -50%;
    left: 1%;
    ${props => !props.isDisabled && ":hover" } {
      background: linear-gradient(to top,rgba(240,185,18,.5),rgba(255,255,255,0))
    }
  `;

  export const Amount = styled.div`
    margin 0 auto;
    position: absolute;
    display: flex;
    justify-content: space-between;
    max-width: 200px;
    padding: 10px 0;
    top: 60%;
    left: 50%;
  `;


  export const For = styled.h1`
    color: #ffffff;
    font-size: 30px;
    transform: translate(-50%, -50%);
  `;

  export const AmountBTNDiv = styled.div`
    margin: 0;
    position: absolute;
    display: flex;
    bottom: -50%;
    overflow: hidden; /* for clearfix */
    transform: translate(-50%, -50%);
    // align-items: center;
  `;

  export const BNB_Button = styled.button`
    height: 50px;
    width: 125px;
    background: #27292D;
    border-radius: 20% / 50%;
    color: white;
    border: 1px solid #545659;
    justify-content: space-between;

    margin:5px;
    position: realtive;
    ${props => !props.isDisabled && ":hover" } {
      background-color: ${props => props.isActive ? "#F1B213" : "#2F3236"};
      opacity: 0.8;
    }
  `;

  export const Span1 = styled.div`
    height: 4px;
    position: absolute;
    background-image: linear-gradient(#484848,#666666);
    left: 50%;
    width: 625px; 
    top: 85%;
    transform: translate(-50%, -50%);
    // border: 1px solid #fff;
    border-radius: 1% / 50%;
  `;

  export const Span2 = styled.div`
    height: 4px;
    position: absolute;
    background-image: linear-gradient(#484848,#666666);
    left: 50%;
    width: 625px;  
    top: 88%;
    transform: translate(-50%, -50%);
    // border: 1px solid #fff;
    border-radius: 1% / 50%;
  `;

  export const DoubleOrNothingBtn = styled.button`
    height: 70px;
    width: 150px;
    background: #F0B912;
    border-radius: 20% / 50%;
    border: 1px solid #545659;
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;
