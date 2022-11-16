import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

export const Dropdown = ({ tag = "", options, defaultIndex = 0, setOptionId = (i) => {} }) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultIndex);

  const changeOption = (i) => {
    setSelectedOption(i)
    setOptionId(options[i].id)
  }

  return (
    <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
      <div className="flex flex-col items-center">
        <button type="button" onClick={() => setOpen(!isOpen)}
          className="fill-[#aaa] rounded-full border border-[#aaa] text-[#aaa] flex py-1 px-2 items-center font-light transition-all ml-2 whitespace-nowrap">
          {tag + ": " + options[selectedOption].display}
        </button>
        <div className={"z-10 w-fit absolute mt-10 border-[#aaa] border text-[#aaa] rounded-2xl px-2 py-1 bg-[#0f0f0f] font-light" + (isOpen ? " flex flex-col" : " hidden")}>
          {
            options.map(({ display }, i) =>
              <button key={i} onClick={() => changeOption(i)} className={(selectedOption == i) ? "font-normal text-[#eee]" : ""}>{display}</button>
            )
          }
        </div>
      </div>
    </OutsideClickHandler>
  )
}