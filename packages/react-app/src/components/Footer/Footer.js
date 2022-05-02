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
            <p>CHAT</p>
            <p>PROJECT</p>
            <p>DISCLAIMER</p>
        </div>
        <div className='footerLogo'>
            <img src={footerLogo}></img>
        </div>
    </div>
  )
}
