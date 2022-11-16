import { ReactComponent as SearchIcon } from "../svgs/search.svg"

export const SearchBar = ({ setQuery }) => {

  const search = (e) => {
    setQuery(e.target.value)
  }

  return (
    <div className="fill-[#aaa] rounded-full border border-[#aaa] text-[#aaa] flex py-1 px-2 items-center font-light transition-all
    flex-grow min-w-[6rem]
    focus-within:fill-[#eee] focus-within:border-[#eee] focus-within:text-[#eee]">
      <SearchIcon></SearchIcon>
      <input className="bg-transparent focus:outline-none mx-2 text-base w-full" placeholder="Search" onChange={search}></input>
    </div>
  )
}
