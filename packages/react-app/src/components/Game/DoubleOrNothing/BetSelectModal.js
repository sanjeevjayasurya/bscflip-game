import './BetSelectModal.css'
import flippur from "../../../img/flippur.png"
export default function BetSelectModal({betLimits,selectedToken,activeBetAmount,setActiveBetAmount, openBetModal}) {

    const lowerLimit = betLimits[selectedToken][0] === 0 ? 1 : betLimits[selectedToken][0]
    const upperLimit = betLimits[selectedToken][1]

    const sliderPercent = 102-(94 * ((activeBetAmount + 1) / upperLimit))
  return (
    <div className='SelectBetModal'>
        <h1>SELECT BET AMOUNT</h1>
        <p>SLIDER ({Math.round(lowerLimit / 10**18,2)} - {Math.round(upperLimit/ 10**18,2)} {selectedToken})</p>
        <div className='sliderContainer'>
          <div className='activeSliderContainer'>
            {/* sliderDiv is the creation of the slider with html and css. The actual slider is invisible and behind this makeshift slider */}
            <div className='sliderDiv' style={{right: `${sliderPercent}%`}}  >
              <div className='yellowSlide'></div>
              <img src={flippur}></img>
              <div className='noSlide'></div>
            </div>
          </div>
          {/* the slider input component */}
          <input onChange={(_)=>{setActiveBetAmount(_.target.value)}} type="range" min={lowerLimit} max={upperLimit * .1} id="betSizeSlider"></input>
        </div>
        <div className='centerDiv'>
          <div className='percentButtons'>
            <button onClick={()=>{document.getElementById("betSizeSlider").value = 10;setActiveBetAmount(upperLimit * .10)}}>10%</button>
            <button onClick={()=>{document.getElementById("betSizeSlider").value = 25;setActiveBetAmount(upperLimit * .25)}}>25%</button>
            <button onClick={()=>{document.getElementById("betSizeSlider").value = 50;setActiveBetAmount(upperLimit * .50)}}>50%</button>
            <button onClick={()=>{document.getElementById("betSizeSlider").value = 75;setActiveBetAmount(upperLimit * .75)}}>75%</button>
            <button onClick={()=>{document.getElementById("betSizeSlider").value = 100;setActiveBetAmount(upperLimit)}}>MAX</button>
          </div>
          <input onChange={(_)=>{_.target.value > upperLimit ? setActiveBetAmount(upperLimit)  : setActiveBetAmount(_.target.value);_.target.value > upperLimit ? document.getElementById("betSizeSlider").value = upperLimit  : document.getElementById("betSizeSlider").value = _.target.value}} placeholder='Type your bet amount...' type="number" ></input>
          <p>Current Bet: {activeBetAmount ? Math.round(activeBetAmount,2) : 0.0} {selectedToken}</p>
          <button id='confirmBetButton' onClick={()=>{openBetModal(false)}}>Confirm</button>
        </div>

    </div>
  )
}
