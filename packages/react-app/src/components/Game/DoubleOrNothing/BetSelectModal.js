import './BetSelectModal.css'
import flippur from "../../../img/flippur.png"
export default function BetSelectModal({betLimits,selectedToken,activeBetAmount,setActiveBetAmount, openBetModal}) {

    const lowerLimit = betLimits[selectedToken][0]
    const upperLimit = betLimits[selectedToken][1] === 0 ? 1 * 10**18 : betLimits[selectedToken][1]

    const sliderPercent =111-(94 * (activeBetAmount / upperLimit ))
  return (
    <div className='SelectBetModal'>
        <h1>SELECT BET AMOUNT</h1>
        <p>SLIDER ({parseFloat(lowerLimit / 10**18).toFixed(2)} - {parseFloat(upperLimit/ 10**18).toFixed(2)} {selectedToken})</p>
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
          <input onChange={(_)=>{setActiveBetAmount(_.target.value)}} type="range" min={lowerLimit} max={upperLimit * 1} id="betSizeSlider"></input>
        </div>
        <div className='centerDiv'>
          <div className='percentButtons'>
            <button onClick={()=>{setActiveBetAmount(upperLimit * .10)}}>10%</button>
            <button onClick={()=>{setActiveBetAmount(upperLimit * .25)}}>25%</button>
            <button onClick={()=>{setActiveBetAmount(upperLimit * .50)}}>50%</button>
            <button onClick={()=>{setActiveBetAmount(upperLimit * .75)}}>75%</button>
            <button onClick={()=>{setActiveBetAmount(upperLimit)}}>MAX</button>
          </div>
          <input onChange={(_)=>{_.target.value * 10**18 > upperLimit ? setActiveBetAmount(upperLimit)  : setActiveBetAmount(_.target.value* 10**18)}} placeholder='Type your bet amount...' type="number" ></input>
          <p>Current Bet: {activeBetAmount ? parseFloat(activeBetAmount/ 10**18).toFixed(2) : 0.0} {selectedToken}</p>
          <button id='confirmBetButton' onClick={()=>{openBetModal(false)}}>Confirm</button>
        </div>

    </div>
  )
}
