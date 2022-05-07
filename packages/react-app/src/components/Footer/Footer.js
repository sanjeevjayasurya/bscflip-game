import React from 'react'
import "./Footer.css"
import footerLogo from "../../img/footerLogo.png"
import { Winnings } from '../Game/Winnings/Winnings'
export default function Footer({ chainId, wrongChain, bscF, game }) {
  return (
    <div className='footerDiv'>
      <div className='winningsDiv'>
      <Winnings game={game} bscF={bscF} chainId={chainId}/></div>
        <div className='centerFooter'>
            <a>CHAT</a>
            <a href="https://bscflip.gitbook.io/welcome-to-gitbook/wT7amzGpUl9nPLOYHxm7/" target="_blank">PROJECT</a>
            <a>DISCLAIMER</a>
        </div>
        <div className='footerLogo'>
            <img src={footerLogo}></img>
        </div>
    </div>
  )
}
