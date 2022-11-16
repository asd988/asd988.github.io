import { useState } from "react";
import { ReactComponent as SettingsIcon } from "../svgs/settings.svg"
import { Dropdown } from "./Dropdown";

import { Playlists } from "./Playlists"
import { SearchBar } from "./SearchBar"

export const Dashboard = () => {
  const [searchQuery, setQuery] = useState("");
  const [sort, setSort] = useState(undefined);
  const [selFilter, setSelFilter] = useState(undefined);

  return (
    <div className="h-4/5 md:border-[#aaa] md:border-solid md:border rounded-3xl w-full flex-grow md:mt-14 md:mb-14 p-6 flex flex-col items-center select-none">
      <div className="flex">
        <SearchBar setQuery={setQuery}></SearchBar> 
        <Dropdown tag="Sort" setOptionId={setSort} options={[
          {id: "default", display: "Default"},
          {id: "a-z", display: "A to Z"},
          {id: "z-a", display: "Z to A"}
        ]}/>
        <Dropdown tag="Filter" setOptionId={setSelFilter} options={[
          {id: "none", display: "None"},
          {id: "selected", display: "Selected"},
          {id: "unselected", display: "Unselected"} 
        ]}/>
      </div>
      <Playlists searchQuery={searchQuery} sort={sort} selectionFilter={selFilter}></Playlists>
      <div className="bg-spotify rounded-full w-44 flex px-4 py-2 h-9 items-center justify-center">
        <button className="whitespace-nowrap">Create Playlist</button>
        <button className="h-full aspect-square fill-[#eee] border-r-[#eee] border-l pl-2 ml-2 box-content">
          <SettingsIcon></SettingsIcon>
        </button>
      </div>
    </div>
  )
}