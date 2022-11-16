import { ReactComponent as SearchIcon } from "../svgs/search.svg"

export const SearchBar = ({ setQuery }) => {

  const search = (e) => {
    if (e.key !== "Enter") return;
    setQuery(e.target.value)
  }

  return (
    <div className="fill-[#aaa] rounded-full border border-[#aaa] text-[#aaa] flex py-1 px-2 items-center font-light transition-all
    focus-within:fill-[#eee] focus-within:border-[#eee] focus-within:text-[#eee]">
      <SearchIcon></SearchIcon>
      <input className="bg-transparent focus:outline-none mx-2 text-base" placeholder="Search" onKeyDown={search}></input>
    </div>
  )
}
