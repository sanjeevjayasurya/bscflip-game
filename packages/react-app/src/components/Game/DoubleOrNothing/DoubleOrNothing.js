import React, { useState, useEffect, useCallback } from "react";
import { useAccount } from "wagmi";
import { parseUnits } from "@ethersproject/units";
import ConfettiGenerator from "confetti-js";

import { ApprovalButton } from "./ApprovalButton";
import { flipAmounts, headsOrTails } from "./FlipAmounts";
import { Centered, Image } from "../../Styles";
import { DoubleOrNothingBtn, FlipContainer, GameButton, SelectBet, BetOption, CoinFlip,BetButton,Green } from "./FlipStyles";

import flipCoinGifT from "../../../img/tail-gif-once.gif";
import flipCoinGifH from "../../../img/head-gif-once.gif";
import BetSelectModal from "./BetSelectModal";
import "./DoubleOrNothing.css"
import { wait } from "@testing-library/user-event/dist/utils";
export const DoubleOrNothing = (({flipCoinGif, betModal,openBetModal, setGameStarted, gameStarted, gameToken, bscF, game }) => {
  const bnb = "0x0000000000000000000000000000000000000000";
  const requiredAllowance = parseUnits("5", 23);

  const [{ data: account }] = useAccount({ fetchEns: false, });
  const [activeAmountButton, setActiveAmountButton] = useState(-1);
  const [activeChoiceButton, setActiveChoiceButton] = useState(-1);
  const [approved, setApproved] = useState(false);
  const [gameFlipAmounts, setGameFlipAmounts] = useState(null);
  const [gameReady, setGameReady] = useState(false);
  const [gameError, setGameError] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [winner, setWinner] = useState(false);
  const [gameId, setGameId] = useState(-1);
  const [result, setResult] = useState(0);
  const [gameWager, setGameWager] = useState(0);

  const [flipFinished, setFlipFinished] = useState(false);
  const [flipCounter, setFlipCounter] = useState(false);
  const [coinFlipActive, setCoinFlipActive] = useState(false);

  const [activeBetAmount, setActiveBetAmount] = useState(false);


  var intervalId;
  
  const handleAmountButtonClick = event => {
    setActiveAmountButton(Number(event.target.value));
  };

  const handleChoiceButtonClick = event => {
    console.log(Number(event.target.value))
    setActiveChoiceButton(Number(event.target.value));
  };

  useEffect(()=>{
    if(flipCounter === false) return
    if(flipCounter !== 0){
      let tempCount = flipCounter;
      console.log(tempCount)
      setTimeout(()=>{
            setFlipCounter(tempCount - 1)
    },1000); return}
      console.log("setting coin flip true")
      setCoinFlipActive(true)
      return
    
  },[flipCounter])
  useEffect(()=>{
    if(!coinFlipActive) return
      setTimeout(()=>{
        setFlipFinished(true)
      },10200)
  },[coinFlipActive])

  React.useEffect(() => {
    if(!flipFinished) return
    const confettiSettings = 
    { 
      target: 'canvas',
      colors: [[241, 186, 19], [232, 183, 32], [194, 149, 12]]
    };

    const confetti = new ConfettiGenerator(confettiSettings);
    if (winner) {
        confetti.render();
    }
    setTimeout(()=>{
      confetti.clear()
    },5000)
    return () => confetti.clear();
  }, [flipFinished]) // add the var dependencies or not

  useEffect(() => {
    const showAllowances = async () => {
      if (game && bscF && account && bscF.signer) {
        try {
          if (gameToken !== bnb) {
            const allowance = await bscF.allowance(account.address, game.address);
            setApproved(parseInt(allowance._hex, 16) > parseInt(requiredAllowance._hex, 16));
          } else {
            setApproved(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    showAllowances();
  }, [account, game, bscF]);

  const approvedListener = async (owner, spender, value) => {
    try {
      if (owner === bscF.signer) {
        const allowance = await bscF.allowance(account.address, game.address);
        setApproved(allowance._hex > requiredAllowance._hex);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkGameFinished = (gameId) => {
    intervalId = setInterval(async () => {
      if (game.signer) {
        try {
          const userGame = await game._games(gameId);
          if (userGame.finished) {
            setWinner(userGame.winner);
            setGameFinished(true);
            setGameWager(parseInt(userGame.wager._hex))
            if (userGame.winner) {
              setResult(userGame.predictedOutcome);
            } else {
              setResult((userGame.predictedOutcome + 1) % 2);
            }
            clearInterval(intervalId);
            setFlipCounter(3)
          }
        } catch (err) {
          console.log(err);
        }
      }
    }, 3000);
  };

  useEffect(() => {
    if (bscF && bscF.signer) {
      bscF.on("Approval", approvedListener);
    }

    return () => {
      if (bscF && bscF.signer) {
        bscF.off("Approval", approvedListener);
      }
    }
  }, [bscF]);

  /*const gameFinishedListener = useCallback((better, token, winner, wager, id) => {
    console.log("Game finished: ", better, token, winner, wager, id);
    if (game.signer._address === better && id === gameId) {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      setWinner(winner);
      setGameFinished(true);
    }
  }, [gameId, intervalId]);*/

  useEffect(() => {
    const amounts = flipAmounts.find(game => (game.token === gameToken));
    setGameFlipAmounts(amounts.values);
  }, [gameToken]);

  /*useEffect(() => {
    if (game && game.signer) {
      game.on("GameFinished", gameFinishedListener);
    }

    return () => {
      game.off("GameFinished", gameFinishedListener);
    }
  }, [gameFinishedListener]);*/

  useEffect(() => {
    if (activeBetAmount && activeChoiceButton >= 0) {
      setGameReady(true);
    } else {
      setGameReady(false);
    }
  }, [activeBetAmount, activeChoiceButton]);

  // Ethers has been doing a poor job of estimating gas,
  // so increase the limit by 30% to ensure there are fewer
  // failures on transactions
  async function getGasPrice(flipAmount, side, address, referrer, value) {
    var options = {
      value: value
    }
    const estimate = await game.estimateGas.enterGame(flipAmount, side, address, referrer, options);
    return estimate.mul(13).div(10);
  }

  const startGame = async () => {
    setGameStarted(true);
    try {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      let referrer = params.ref ?? '0x0000000000000000000000000000000000000000';
      console.log("Referrer: ", referrer);

      // var flipAmount = gameFlipAmounts[activeAmountButton].value;
      var flipAmount = parseUnits(`${activeBetAmount}`,16);
      var side = headsOrTails[activeChoiceButton].value;
      console.log(flipAmount)
      var value = (gameToken === bnb) ? flipAmount : 0;
      var options = { 
        gasLimit: await getGasPrice(flipAmount, side, gameToken, referrer, value),
        value: value
      };
      const transaction = await game.enterGame(flipAmount, side, gameToken, referrer, options);
      const receipt = await transaction.wait();
      const gameStartedEvent = receipt?.events.find(event => 
        (event.event === "GameStarted")
      );
      const id = gameStartedEvent.args[4];
      checkGameFinished(id);
      setGameId(id);
      setGameFinished(false);
    } catch (err) {
      setGameError(err);
      console.log(err);
    }
  };

  const startOver = () => {
    setGameId(-1);
    setGameFinished(false);
    setWinner(false);
    setGameError(null);
    setActiveAmountButton(-1);
    setActiveChoiceButton(-1);
    setGameStarted(false);
  };

  return (
    <div>
      { !approved &&
        <ApprovalButton bscF={bscF} game={game} />
      }
      { approved && account && !gameStarted && gameFlipAmounts &&
        <div>
          <FlipContainer>
            {!betModal&& <>
            <div className="choiceButton" key={headsOrTails[0].name}

                onClick={()=>{setActiveChoiceButton(0)}}>
                  <svg width="122" height="37" viewBox="0 0 122 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="122" height="37" rx="18.5" fill="#070707"/>
                  <rect x="0.185" y="0.185" width="121.63" height="36.63" rx="18.315" stroke={headsOrTails[0].id === activeChoiceButton ? "#EFB910" : "#fff"} strokeOpacity="0.69" strokeWidth="0.65"/>
                  <path d="M45.584 13.816V25H44.464V19.768H38.4V25H37.28V13.816H38.4V18.84H44.464V13.816H45.584ZM49.2594 14.728V18.904H53.4994V19.832H49.2594V24.072H53.9794V25H48.1394V13.8H53.9794V14.728H49.2594ZM62.6663 22.344H57.5783L56.6023 25H55.4183L59.4983 13.96H60.7623L64.8263 25H63.6423L62.6663 22.344ZM62.3303 21.416L60.1223 15.368L57.9143 21.416H62.3303ZM69.9358 13.816C71.1731 13.816 72.2344 14.04 73.1198 14.488C74.0051 14.936 74.6824 15.5813 75.1518 16.424C75.6211 17.2667 75.8558 18.2693 75.8558 19.432C75.8558 20.584 75.6211 21.5813 75.1518 22.424C74.6824 23.256 74.0051 23.896 73.1198 24.344C72.2344 24.7813 71.1731 25 69.9358 25H66.6238V13.816H69.9358ZM69.9358 24.072C71.4931 24.072 72.6771 23.6667 73.4878 22.856C74.3091 22.0347 74.7198 20.8933 74.7198 19.432C74.7198 17.96 74.3091 16.8133 73.4878 15.992C72.6771 15.16 71.4931 14.744 69.9358 14.744H67.7438V24.072H69.9358ZM81.3126 25.112C80.5766 25.112 79.926 24.984 79.3606 24.728C78.806 24.472 78.3686 24.1147 78.0486 23.656C77.7286 23.1973 77.558 22.6853 77.5366 22.12H78.7206C78.774 22.664 79.014 23.144 79.4406 23.56C79.8673 23.9653 80.4913 24.168 81.3126 24.168C82.07 24.168 82.6673 23.976 83.1046 23.592C83.5526 23.1973 83.7766 22.7013 83.7766 22.104C83.7766 21.624 83.654 21.24 83.4086 20.952C83.1633 20.6533 82.8593 20.4347 82.4966 20.296C82.134 20.1467 81.6326 19.9867 80.9926 19.816C80.246 19.6133 79.654 19.416 79.2166 19.224C78.7793 19.032 78.406 18.7333 78.0966 18.328C77.7873 17.9227 77.6326 17.3733 77.6326 16.68C77.6326 16.104 77.782 15.592 78.0806 15.144C78.3793 14.6853 78.8006 14.328 79.3446 14.072C79.8886 13.816 80.5126 13.688 81.2166 13.688C82.2513 13.688 83.0833 13.944 83.7126 14.456C84.3526 14.9573 84.7206 15.608 84.8166 16.408H83.6006C83.526 15.9493 83.2753 15.544 82.8486 15.192C82.422 14.8293 81.846 14.648 81.1206 14.648C80.4486 14.648 79.8886 14.8293 79.4406 15.192C78.9926 15.544 78.7686 16.0293 78.7686 16.648C78.7686 17.1173 78.8913 17.496 79.1366 17.784C79.382 18.072 79.686 18.2907 80.0486 18.44C80.422 18.5893 80.9233 18.7493 81.5526 18.92C82.278 19.1227 82.8646 19.3253 83.3126 19.528C83.7606 19.72 84.1393 20.0187 84.4486 20.424C84.758 20.8293 84.9126 21.3733 84.9126 22.056C84.9126 22.5787 84.774 23.0747 84.4966 23.544C84.2193 24.0133 83.8086 24.392 83.2646 24.68C82.7206 24.968 82.07 25.112 81.3126 25.112Z" fill={headsOrTails[0].id === activeChoiceButton ? "#EFB910" : "#fff"}/>
                  </svg>
            </div>

            <Image src={flipCoinGif} alt="bscflip-logo" />
            <div className="choiceButton" key={headsOrTails[1].name}
                onClick={()=>{setActiveChoiceButton(1)}}>
              <svg width="122" height="37" viewBox="0 0 122 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="122" height="37" rx="18.5" fill="#070707"/>
              <rect x="0.185" y="0.185" width="121.63" height="36.63" rx="18.315" stroke={headsOrTails[1].id === activeChoiceButton ? "#EFB910" : "#fff"} strokeOpacity="0.69" strokeWidth="0.65"/>
              <path d="M49.824 13.816V14.744H46.72V25H45.6V14.744H42.48V13.816H49.824ZM58.0725 22.344H52.9845L52.0085 25H50.8245L54.9045 13.96H56.1685L60.2325 25H59.0485L58.0725 22.344ZM57.7365 21.416L55.5285 15.368L53.3205 21.416H57.7365ZM63.15 13.816V25H62.03V13.816H63.15ZM66.8063 24.088H70.8223V25H65.6863V13.816H66.8063V24.088ZM75.8126 25.112C75.0766 25.112 74.426 24.984 73.8606 24.728C73.306 24.472 72.8686 24.1147 72.5486 23.656C72.2286 23.1973 72.058 22.6853 72.0366 22.12H73.2206C73.274 22.664 73.514 23.144 73.9406 23.56C74.3673 23.9653 74.9913 24.168 75.8126 24.168C76.57 24.168 77.1673 23.976 77.6046 23.592C78.0526 23.1973 78.2766 22.7013 78.2766 22.104C78.2766 21.624 78.154 21.24 77.9086 20.952C77.6633 20.6533 77.3593 20.4347 76.9966 20.296C76.634 20.1467 76.1326 19.9867 75.4926 19.816C74.746 19.6133 74.154 19.416 73.7166 19.224C73.2793 19.032 72.906 18.7333 72.5966 18.328C72.2873 17.9227 72.1326 17.3733 72.1326 16.68C72.1326 16.104 72.282 15.592 72.5806 15.144C72.8793 14.6853 73.3006 14.328 73.8446 14.072C74.3886 13.816 75.0126 13.688 75.7166 13.688C76.7513 13.688 77.5833 13.944 78.2126 14.456C78.8526 14.9573 79.2206 15.608 79.3166 16.408H78.1006C78.026 15.9493 77.7753 15.544 77.3486 15.192C76.922 14.8293 76.346 14.648 75.6206 14.648C74.9486 14.648 74.3886 14.8293 73.9406 15.192C73.4926 15.544 73.2686 16.0293 73.2686 16.648C73.2686 17.1173 73.3913 17.496 73.6366 17.784C73.882 18.072 74.186 18.2907 74.5486 18.44C74.922 18.5893 75.4233 18.7493 76.0526 18.92C76.778 19.1227 77.3646 19.3253 77.8126 19.528C78.2606 19.72 78.6393 20.0187 78.9486 20.424C79.258 20.8293 79.4126 21.3733 79.4126 22.056C79.4126 22.5787 79.274 23.0747 78.9966 23.544C78.7193 24.0133 78.3086 24.392 77.7646 24.68C77.2206 24.968 76.57 25.112 75.8126 25.112Z" fill={headsOrTails[1].id === activeChoiceButton ? "#EFB910" : "#fff"}/>
              </svg>
            </div></>}
          </FlipContainer>
          <FlipContainer>
            {betModal && <BetSelectModal activeBetAmount={activeBetAmount} setActiveBetAmount={setActiveBetAmount} openBetModal={openBetModal}/>}
            {!betModal&& <BetButton onClick={()=>{openBetModal(true)}}>{!activeBetAmount ? <>Select a Bet Size</> : <>{activeBetAmount / 100} BNB</>}</BetButton>}
          </FlipContainer>
          <br />
          {!betModal&& 
          <FlipContainer>
            <DoubleOrNothingBtn 
              isDisabled={!gameReady}
              onClick={gameReady ? startGame : null}>
              {!gameReady && "CHOOSE YOUR OPTIONS"}
              {gameReady && "FLIP"}
            </DoubleOrNothingBtn>
          </FlipContainer> 
}
        </div>
      }
      { gameStarted && 
        <div>
          { !gameFinished && !gameError &&
            <div>
              

              <CoinFlip>
                
                  {!gameFinished && <Image src={flipCoinGif}></Image>}

              </CoinFlip>

              { (gameId === -1) &&
                <Centered>WAITING FOR CONFIRMATION</Centered>
              }
              { (gameId >= 0) &&
                <div>
                  <Centered spaced={true}>GAME {gameId} STARTED</Centered>
                  <Centered spaced={true}>YOU CHOSE: {headsOrTails[activeChoiceButton].name}</Centered>
                  <Centered>WAITING FOR YOUR FLIP</Centered>
                </div>
              }
            </div>
          }
          { !gameFinished && gameError &&
            <div>
              <Centered>ERROR WHEN STARTING GAME</Centered>
              <Centered>{gameError.message.substring(0, 40) + '...'}</Centered>
              <FlipContainer>
                <GameButton onClick={startOver}>
                  TRY AGAIN
                </GameButton>
              </FlipContainer>
            </div>
          }
          { gameFinished &&
            <div>
              {!coinFlipActive && <Centered spaced={true}>Spinning in:  {flipCounter}</Centered>}

              {flipFinished && winner && <Centered spaced={true}>YOU WON <Green>+{gameWager / 10**18} BNB</Green></Centered>}
              {coinFlipActive && <CoinFlip><Image src={result === 0 ? flipCoinGifH : flipCoinGifT}></Image></CoinFlip> }
              
              
              <Centered spaced={true}>YOU CHOSE: {headsOrTails[activeChoiceButton].name}</Centered>
              {flipFinished && <>
              <Centered spaced={true}>YOUR FLIP: {headsOrTails[result].name}</Centered>
              { winner ?
                <Centered spaced={true}>WINNER</Centered> :
                <Centered spaced={true}>RUGGED</Centered>
              }
              <FlipContainer>
                <GameButton onClick={startOver}>
                  FLIP AGAIN
                </GameButton>
              </FlipContainer></>}
            </div>
          }
        </div>
      }
    </div>
  );
});
