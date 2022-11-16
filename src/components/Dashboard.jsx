import { useState } from "react";
import { ReactComponent as SettingsIcon } from "../svgs/settings.svg"

import { Playlists } from "./Playlists"
import { SearchBar } from "./SearchBar"

export const Dashboard = () => {
  const [searchQuery, setQuery] = useState("");

  return (
    <div className="h-4/5 md:border-[#aaa] md:border-solid md:border rounded-3xl w-full flex-grow md:mt-14 md:mb-14 p-6 flex flex-col items-center">
      <SearchBar setQuery={setQuery}></SearchBar>
      <Playlists searchQuery={searchQuery}></Playlists>
      <div className="bg-spotify rounded-full w-fit flex px-4 py-2 h-9 items-center">
        <button>Create Playlist</button>
        <button className="h-full aspect-square fill-[#eee] border-r-[#eee] border-l pl-2 ml-2 box-content">
          <SettingsIcon></SettingsIcon>
        </button>
      </div>
    </div>
  )
}