import "./BetSelectModal.css";
import flippur from "../../../img/flippur.png";
import { AiOutlineClose } from 'react-icons/ai'
export default function BetSelectModal({
  betLimits,
  selectedToken,
  activeBetAmount,
  setActiveBetAmount,
  openBetModal,
}) {
  const lowerLimit = betLimits[selectedToken][0];
  const upperLimit =
    betLimits[selectedToken][1] === 0
      ? 1 * 10 ** 18
      : betLimits[selectedToken][1];

  const sliderPercent =
    118 -
    94 *
      ((activeBetAmount - lowerLimit < 0 ? 0 : activeBetAmount - lowerLimit) /
        (upperLimit - lowerLimit));
  return (
    <div className="SelectBetModal">
      <AiOutlineClose onClick={() => openBetModal(false)} className="absolute cursor-pointer top-5 right-5 text-white" aria-hidden="true" />
      <h1>SELECT BET AMOUNT</h1>
      <p>
        SLIDER ({parseFloat(lowerLimit / 10 ** 18).toFixed(2)} -{" "}
        {parseFloat(upperLimit / 10 ** 18).toFixed(2)} {selectedToken})
      </p>
      <div className="sliderContainer">
        <div className="activeSliderContainer">
          {/* sliderDiv is the creation of the slider with html and css. The actual slider is invisible and behind this makeshift slider */}
          <div className="sliderDiv" style={{ right: `${sliderPercent}%` }}>
            <div className="yellowSlide"></div>
            <img src={flippur}></img>
            <div className="noSlide"></div>
          </div>
        </div>
        {/* the slider input component */}
        <input
          onChange={(_) => {
            setActiveBetAmount(_.target.value);
          }}
          type="range"
          min={lowerLimit}
          max={upperLimit * 1}
          id="betSizeSlider"
        ></input>
      </div>
      <div className="centerDiv">
        <div className="percentButtons">
          <button
            onClick={() => {
              setActiveBetAmount(upperLimit * 0.1);
            }}
          >
            10%
          </button>
          <button
            onClick={() => {
              setActiveBetAmount(upperLimit * 0.25);
            }}
          >
            25%
          </button>
          <button
            onClick={() => {
              setActiveBetAmount(upperLimit * 0.5);
            }}
          >
            50%
          </button>
          <button
            onClick={() => {
              setActiveBetAmount(upperLimit * 0.75);
            }}
          >
            75%
          </button>
          <button
            onClick={() => {
              setActiveBetAmount(upperLimit);
            }}
          >
            MAX
          </button>
        </div>
        <input
          onChange={(_) => {
            _.target.value * 10 ** 18 > upperLimit
              ? setActiveBetAmount(upperLimit)
              : setActiveBetAmount(_.target.value * 10 ** 18);
          }}
          placeholder="Type your bet amount..."
          type="number"
        ></input>
        <p>
          Current Bet:{" "}
          {activeBetAmount
            ? parseFloat(activeBetAmount / 10 ** 18).toFixed(3)
            : 0.0}{" "}
          {selectedToken}
        </p>
        <button
          id="confirmBetButton"
          onClick={() => {
            openBetModal(false);
          }}
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
}
