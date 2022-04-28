import React, {useState} from 'react'
import './GameModeDropDown.css'
export default function GameModeDropDown({gameMode, setGameMode}) {
  const [gameModeSelect, setGameModeSelect] = useState(false)
    return (
    <div className='dropDownContainer'>
    <div className='gameModeDropDiv' onClick={()=>{setGameModeSelect(!gameModeSelect)}}>
        <p>{gameMode} </p><p>V</p>
    </div>
    {gameModeSelect && 
    <div className='gameSelectModal'>
        <div className='selectBox' onClick={()=>{setGameMode("coinflip");setGameModeSelect(false)}}>Coin Flip</div>
        <div className='selectBox' onClick={()=>{setGameMode("kingflip");setGameModeSelect(false)}}>Flip King</div>
    </div>}
    </div>
  )
}
