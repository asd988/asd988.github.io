import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Login, Logout } from "../helper/auth"

import {ReactComponent as LogoutIcon} from "../svgs/logout.svg"
import { Dashboard } from "./Dashboard"

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
            <Dashboard/>
          </div>
          :
          <button id="login-btn" onClick={Login} className="bg-spotify rounded-2xl h-3/5 w-3/5 text-4xl hover:text-5xl active:text-4xl transition-all">Log in</button>
      }

    </>
  )
}