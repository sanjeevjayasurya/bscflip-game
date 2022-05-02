import React, {useState} from 'react'
import './GameModeDropDown.css'
import { gamemode, gamemodeSelect,closeBracket } from '../../svgs/svgs'
export default function GameModeDropDown({gameMode, setGameMode}) {
  const [gameModeSelect, setGameModeSelect] = useState(false)
    return (
    <div className='dropDownContainer'>
      {!gameModeSelect && 
    <div className='gameModeDropDiv' onClick={()=>{setGameModeSelect(!gameModeSelect)}}>
        {gamemode}
    </div>}
    {gameModeSelect && <div className='divider'></div>}
    {gameModeSelect &&
    <div className='gameSelectModal'>
      <div className='gameModes'>
        GAMEMODES
      </div>
      <div className='singlePlayerSelect' onClick={()=>{setGameMode("coinflip");setGameModeSelect(false)}}>
        {gamemodeSelect(gameMode,"coinflip")}
      </div>
      <div className='onlineSelect' onClick={()=>{setGameMode("kingflip");setGameModeSelect(false)}}>
        {gamemodeSelect(gameMode,"kingflip")}
      </div>
      <div className='closeBracket' onClick={()=>{setGameModeSelect(false)}}>
        {closeBracket}
      </div>
    </div>}
    </div>
  )
}
