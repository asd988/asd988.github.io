import { useState } from "react";
import { ReactComponent as TickIcon } from "../svgs/tick.svg"


export const Toggle = ({ tag = "", defaultValue = false, setBool = (i) => { } }) => {
  const [isActivated, setActivated] = useState(defaultValue);
  
  const changeActivation = () => {
    setBool(!isActivated)
    setActivated(!isActivated)
  }

  return (
    <button type="button" onClick={changeActivation}
      className={"rounded-full border flex py-1 px-2 items-center font-light transition-all ml-2 whitespace-nowrap mt-3 "
      + (isActivated ? "border-spotify text-spotify fill-spotify" : "border-[#aaa] text-[#aaa] fill-[#aaa]")}>
      {tag} <div className="ml-1 aspect-square h-3">
        {!isActivated || <TickIcon/>}
      </div>
    </button>
  )
}