import React, { useState, useEffect, useCallback } from "react";
import { useAccount } from "wagmi";
import { parseUnits } from "@ethersproject/units";
import ConfettiGenerator from "confetti-js";

import { ApprovalButton } from "./ApprovalButton";
import { flipAmounts, headsOrTails } from "./FlipAmounts";
import { Centered } from "../../Styles";
import { DoubleOrNothingBtn, FlipContainer, GameButton } from "./FlipStyles";

export const DoubleOrNothing = (({ gameToken, bscF, game }) => {
  const bnb = "0x0000000000000000000000000000000000000000";
  const requiredAllowance = parseUnits("5", 23);

  const [{ data: account }] = useAccount({ fetchEns: false, });
  const [activeAmountButton, setActiveAmountButton] = useState(-1);
  const [activeChoiceButton, setActiveChoiceButton] = useState(-1);
  const [approved, setApproved] = useState(false);
  const [gameFlipAmounts, setGameFlipAmounts] = useState(null);
  const [gameReady, setGameReady] = useState(false);
  const [gameError, setGameError] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [winner, setWinner] = useState(false);
  const [gameId, setGameId] = useState(-1);
  
  const handleAmountButtonClick = event => {
    setActiveAmountButton(Number(event.target.value));
  };

  const handleChoiceButtonClick = event => {
    setActiveChoiceButton(Number(event.target.value));
  };

  React.useEffect(() => {
    const confettiSettings = 
    { 
      target: 'canvas',
      colors: [[241, 186, 19], [232, 183, 32], [194, 149, 12]]
    };

    const confetti = new ConfettiGenerator(confettiSettings);
    if (winner) {
      console.log("HELL YEA");
      confetti.render();
    }
    return () => confetti.clear();
  }, [winner]) // add the var dependencies or not

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

  const gameFinishedListener = useCallback((better, token, winner, wager, id) => {
    console.log("Game finished: ", better, token, winner, wager, id);
    if (game.signer._address === better && id === gameId) {
      setGameFinished(true);
      setWinner(winner);
    }
  }, [gameId]);

  useEffect(() => {
    const amounts = flipAmounts.find(game => (game.token === gameToken));
    setGameFlipAmounts(amounts.values);
  }, [gameToken]);

  useEffect(() => {
    if (game && game.signer) {
      game.on("GameFinished", gameFinishedListener);
    }

    return () => {
      game.off("GameFinished", gameFinishedListener);
    }
  }, [gameFinishedListener]);

  useEffect(() => {
    if (activeAmountButton >= 0 && activeChoiceButton >= 0) {
      setGameReady(true);
    } else {
      setGameReady(false);
    }
  }, [activeAmountButton, activeChoiceButton])

  // Ethers has been doing a poor job of estimating gas,
  // so increase the limit by 30% to ensure there are fewer
  // failures on transactions
  async function getGasPrice(flipAmount, side, address, value) {
    var options = {
      value: value
    }
    const estimate = await game.estimateGas.enterGame(flipAmount, side, address, options);
    return estimate.mul(13).div(10);
  }

  const startGame = async () => {
    setGameStarted(true);
    try {
      var flipAmount = gameFlipAmounts[activeAmountButton].value;
      var side = headsOrTails[activeChoiceButton].value;
      var value = (gameToken === bnb) ? flipAmount : 0;
      var options = { 
        gasLimit: await getGasPrice(flipAmount, side, gameToken, value),
        value: value
      };
      const transaction = await game.enterGame(flipAmount, side, gameToken, options);
      const receipt = await transaction.wait();
      const gameStartedEvent = receipt?.events.find(event => 
        (event.event === "GameStarted")
      );
      setGameId(gameStartedEvent.args[4]);
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
          <Centered spaced={true}>I LIKE</Centered>
          <FlipContainer>
            { headsOrTails.map(btn => 
              <GameButton
                key={btn.name}
                spaced={true}
                isActive={btn.id === activeChoiceButton}
                value={btn.id}
                onClick={handleChoiceButtonClick}>
                {btn.name}
              </GameButton>
            )}
          </FlipContainer>
          <Centered spaced={true}>FOR</Centered>
          <FlipContainer>
            { gameFlipAmounts.map(btn => 
                <GameButton
                  key={btn.name}
                  isActive={btn.id === activeAmountButton}
                  value={btn.id}
                  onClick={handleAmountButtonClick}>
                  {btn.name}
                </GameButton>
            )}
          </FlipContainer>
          <br />
          <FlipContainer>
            <DoubleOrNothingBtn 
              isDisabled={!gameReady}
              onClick={gameReady ? startGame : null}>
              {!gameReady && "CHOOSE YOUR OPTIONS"}
              {gameReady && "DOUBLE OR NOTHING"}
            </DoubleOrNothingBtn>
          </FlipContainer> 
        </div>
      }
      { gameStarted && 
        <div>
          { !gameFinished && !gameError &&
            <div>
              { (gameId === -1) &&
                <Centered>WAITING FOR CONFIRMATION</Centered>
              }
              { (gameId >= 0) &&
                <div>
                  <Centered>GAME {gameId} STARTED</Centered>
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
              { winner ?
                <Centered spaced={true}>WINNER</Centered> :
                <Centered spaced={true}>RUGGED</Centered>
              }
              <FlipContainer>
                <GameButton onClick={startOver}>
                  FLIP AGAIN
                </GameButton>
              </FlipContainer>
            </div>
          }
        </div>
      }
    </div>
  );
});
