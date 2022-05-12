import React, {useState} from 'react'
import "./Footer.css"
import { useAccount } from 'wagmi';
import footerLogo from "../../img/footerLogo.png"
import { Winnings } from '../Game/Winnings/Winnings'
export default function Footer({ chainId, wrongChain, bscF, game }) {
  const [affiliateOpen, setAffiliate] = useState(false);
  const [{ data: account }, disconnect] = useAccount({ fetchEns: false, });
  return (
    <div className='footerDiv'>
      <div className='winningsDiv'>
      <Winnings game={game} bscF={bscF} chainId={chainId}/></div>
        <div className='centerFooter'>
            <a >CHAT</a>
            <a href="https://bscflip.gitbook.io/welcome-to-gitbook/wT7amzGpUl9nPLOYHxm7/" target="_blank">PROJECT</a>
            <a href="https://www.ncpgambling.org/chat/" target="_blank">DISCLAIMER</a>
            <div className="affBtn" >
            <p onClick={()=>{setAffiliate(!affiliateOpen)}}>AFFILIATE</p>
            {affiliateOpen && <div className="affModal">https://bscflip.com?ref={account.address}</div>}
          </div>
        </div>
        <div className='footerLogo'>
            <img src={footerLogo}></img>
        </div>
    </div>
  )
}
