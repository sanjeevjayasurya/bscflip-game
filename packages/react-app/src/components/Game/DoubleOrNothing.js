import React, { useState, useEffect, useCallback } from "react";
import { BigNumber } from "ethers";
import { formatEther, formatUnits, parseUnits } from "@ethersproject/units";

import { addresses, abis } from "@project/contracts";
import { Centered } from "../Styles";
import { FlipContainer, GameButton } from "./GameStyles";

export const DoubleOrNothing = (({ gameToken, game }) => {
  const [activeAmountButton, setActiveAmountButton] = useState(null);
  const [activeChoiceButton, setActiveChoiceButton] = useState(null);
  const [gameError, setGameError] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [winner, setWinner] = useState(false);
  const [gameId, setGameId] = useState(-1);

  const flipAmounts = [ 
    { id: 1, name: "100 BSCF", value: parseUnits("1", 20) },
    { id: 2, name: "500 BSCF", value: parseUnits("5", 20) },
    { id: 3, name: "1000 BSCF", value: parseUnits("1", 21) },
    { id: 4, name: "5000 BSCF", value: parseUnits("5", 21) },
  ];

  const headsOrTails = [
    { id: 1, name: "HEADS", value: 0 },
    { id: 2, name: "TAILS", value: 1},
  ];
  
  const handleAmountButtonClick = event => {
    setActiveAmountButton(Number(event.target.value));
  };

  const handleChoiceButtonClick = event => {
    setActiveChoiceButton(Number(event.target.value));
  };

  const gameStartedListener = useCallback((address, token, wager, outcome, id) => {
    console.log("Current address: ", game.signer._address);
    console.log("Game started: ", address, token, wager, outcome, id);
    console.log("Current gameID: ", gameId);
    // TODO: This is some crappy resiliency against having multiple tabs open
    // it could use some better logic but I suck at React
    if (game.signer._address === address && gameId === -1 && gameStarted) {
      console.log("Setting game ID", id);
      setGameId(id);
      setGameFinished(false);
    }
  }, [gameId, gameStarted]);

  const gameFinishedListener = useCallback((address, token, winner, wager, id) => {
    console.log("Game finished: ", address, token, winner, wager, id);
    console.log("signer address: ", game.signer._address);
    console.log(gameId);
    if (game.signer._address === address && id === gameId && gameStarted) {
      winner ? console.log("hell yeah you won") : console.log("You suk lol");
      setGameFinished(true);
      setWinner(winner);
    }
  }, [gameId, gameStarted]);

  useEffect(() => {
    if (game && game.signer) {
      console.log("Adding listeners");
      game.on("GameStarted", gameStartedListener);
      game.on("GameFinished", gameFinishedListener);
    }

    return () => {
      console.log("Removing listeners");
      game.off("GameStarted", gameStartedListener);
      game.off("GameFinished", gameFinishedListener);
    }
  }, [gameStartedListener, gameFinishedListener]);

  // Ethers has been doing a poor job of estimating gas
  // so increase the limit by 20% to ensure there are fewer
  // failures on transactions
  async function getGasPrice(flipAmount, side, address) {
    const estimate = await game.estimateGas.enterGame(flipAmount, side, address);
    return estimate.mul(12).div(10);
  }

  const startGame = async () => {
    setGameStarted(true);
    try {
      var flipAmount = flipAmounts[activeAmountButton-1].value;
      var side = headsOrTails[activeChoiceButton-1].value;
      var address = gameToken.address;
 
      var options = { gasLimit: await getGasPrice(flipAmount, side, address) };
      const transaction = await game.enterGame(flipAmount, side, address, options);
      await transaction.wait()
    } catch (err) {
      setGameError(err);
      console.log(err);
    }
  };

  const startOver = () => {
    setGameStarted(false);
    setGameId(-1);
    setGameFinished(false);
    setWinner(false);
    setGameError(null);
  };

  return (
    <div>
      { !gameStarted && 
        <div>
          <Centered>I LIKE</Centered>
          <FlipContainer>
            { headsOrTails.map(btn => 
              <GameButton
                isActive={btn.id === activeChoiceButton}
                value={btn.id}
                onClick={handleChoiceButtonClick}>
                {btn.name}
              </GameButton>
            )}
          </FlipContainer>
          <Centered>FOR</Centered>
          <FlipContainer>
            { flipAmounts.map(btn => 
                <GameButton
                  isActive={btn.id === activeAmountButton}
                  value={btn.id}
                  onClick={handleAmountButtonClick}>
                  {btn.name}
                </GameButton>
            )}
          </FlipContainer>
          <br />
          <FlipContainer>
            <GameButton 
              isDisabled={!activeAmountButton || !activeChoiceButton}
              onClick={activeAmountButton && activeChoiceButton && startGame}>
              {(!activeAmountButton || !activeChoiceButton) && "CHOOSE YOUR OPTIONS"}
              {(activeAmountButton && activeChoiceButton) && "DOUBLE OR NOTHING"}
            </GameButton>
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
                <Centered>HELL YEAH YOU WON</Centered> :
                <Centered>GET RUGGED LOL</Centered>
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
