import React, {useState} from 'react'
import "./Footer.css"
import { useAccount } from 'wagmi';
import footerLogo from "../../img/footerLogo.png"
import { Winnings } from '../Game/Winnings/Winnings'
import { AiOutlineClose } from 'react-icons/ai';
export default function Footer({ chainId, wrongChain, bscF, game }) {
  const [affiliateOpen, setAffiliate] = useState(false);
  const [{ data: account }, disconnect] = useAccount({ fetchEns: false, });
  return (
    <div className='footerDiv'>
      <div className='winningsDiv'>
      <Winnings game={game} bscF={bscF} chainId={chainId}/></div>
        <div className='centerFooter'>
            <a>CHAT</a>
            <a href="https://bscflip.gitbook.io/welcome-to-gitbook/wT7amzGpUl9nPLOYHxm7/" target="_blank" rel="noreferrer">PROJECT</a>
            <a href="https://www.ncpgambling.org/chat/" target="_blank" rel="noreferrer">DISCLAIMER</a>
            <div className="affBtn" >
            <p onClick={()=>{setAffiliate(!affiliateOpen)}}>AFFILIATE</p>
            {affiliateOpen && <div className="affModal">
              <div className='toprowAff'>
                <h1>YOUR AFFILIATE LINK</h1>
                <AiOutlineClose onClick={() => setAffiliate(false)} className="absolute cursor-pointer w-5 h-5 top-5 right-5 text-white" aria-hidden="true" />
              </div>
              <>
                <input id='affiliateLink' defaultValue={`https://bscflip.com?ref=${account!== undefined ? account.address:"0x"}`}></input>
                <button onClick={()=>{
                  const affLink = document.getElementById("affiliateLink")
                  if (!document.queryCommandSupported('copy')) return;
                    affLink.select();
                    document.execCommand('copy')
                }} id='copyButton'>COPY</button>
              </>
              </div>}
          </div>
        </div>
        <div className='footerLogo'>
            <img src={footerLogo}></img>
        </div>
    </div>
  )
}
