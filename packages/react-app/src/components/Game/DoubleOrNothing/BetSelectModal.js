import './BetSelectModal.css'
import flippur from "../../../img/flippur.png"
export default function BetSelectModal({activeBetAmount,setActiveBetAmount, openBetModal}) {
    if(!activeBetAmount){
        setActiveBetAmount(50)
    }
  return (
    <div className='SelectBetModal'>
        <h1>Select Bet Amount</h1>
        <p>Slider (0.05 - 1 BNB)</p>
        <div className='sliderContainer'>
          <div className='activeSliderContainer'>
            <div className='sliderDiv' style={{right: `${108-parseInt(activeBetAmount)}%`}}  >

              <div className='yellowSlide'></div>
              <img src={flippur}></img>
              <div className='noSlide'></div>
            </div>
          </div>
          <input onChange={(_)=>{setActiveBetAmount(_.target.value)}} defaultValue={activeBetAmount ? activeBetAmount : 50} type="range" min="5" max="100" id="betSizeSlider"></input>
        </div>
        <div className='centerDiv'>
          <div className='percentButtons'>
            <button onClick={()=>{document.getElementById("betSizeSlider").value = 10;setActiveBetAmount(10)}}>10%</button>
            <button onClick={()=>{document.getElementById("betSizeSlider").value = 25;setActiveBetAmount(25)}}>25%</button>
            <button onClick={()=>{document.getElementById("betSizeSlider").value = 50;setActiveBetAmount(50)}}>50%</button>
            <button onClick={()=>{document.getElementById("betSizeSlider").value = 75;setActiveBetAmount(75)}}>75%</button>
            <button onClick={()=>{document.getElementById("betSizeSlider").value = 100;setActiveBetAmount(100)}}>MAX</button>
       
          </div>
          <input onChange={(_)=>{_.target.value > 1 ? setActiveBetAmount(1* 100)  : setActiveBetAmount(_.target.value * 100);_.target.value > 1 ? document.getElementById("betSizeSlider").value = 100  : document.getElementById("betSizeSlider").value = _.target.value * 100}} placeholder='Type your bet amount...' type="number" ></input>
          <p>Current Bet: {activeBetAmount ? activeBetAmount / 100: 0.50} BNB</p>
          <button id='confirmBetButton' onClick={()=>{openBetModal(false)}}>Confirm</button>
        </div>

    </div>
  )
}
