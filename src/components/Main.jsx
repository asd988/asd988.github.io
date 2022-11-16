import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Login, Logout } from "../helper/auth"

import {ReactComponent as LogoutIcon} from "../svgs/logout.svg"
import {ReactComponent as SettingsIcon} from "../svgs/settings.svg"
import { Playlists } from "./Playlists"
import { SearchBar } from "./SearchBar"
i
export const Main = () => {
  const { user, setUser } = useContext(UserContext)

  return (
    <>
      {
        user.loggedIn ?
          <div className="flex flex-col items-center h-full w-full md:min-w-[600px] md:w-1/2">
            <div className="w-full md:max-w-2xl bg-spotify md:rounded-b-2xl flex justify-center items-center h-12 select-none">
              <div className="ml-2">{user.username}</div>
              <div className="flex-grow justify-center text-2xl flex font-medium">
                <div className="hidden sm:flex">Playlist Maker</div>
              </div>
              <button className="h-full aspect-square p-2 fill-[#eee] hover:fill-[#ddd]" onClick={() => Logout(setUser)}>
                <LogoutIcon></LogoutIcon>
              </button>
            </div>
            <div className="h-4/5 md:border-[#aaa] md:border-solid md:border rounded-3xl w-full flex-grow md:mt-14 md:mb-14 p-6 flex flex-col items-center">
              <SearchBar></SearchBar>
              <Playlists></Playlists>
              <div className="bg-spotify rounded-full w-fit flex px-4 py-2 h-9 items-center">
                <button>Create Playlist</button>
                <button className="h-full aspect-square fill-[#eee] border-r-[#eee] border-l pl-2 ml-2 box-content">
                  <SettingsIcon></SettingsIcon>
                </button>
              </div>
            </div>
          </div>
          :
          <button id="login-btn" onClick={Login} className="bg-spotify rounded-2xl h-3/5 w-3/5 text-4xl hover:text-5xl active:text-4xl transition-all">Log in</button>
      }

    </>
  )
}