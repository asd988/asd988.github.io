import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Login, Logout } from "../helper/auth"

export const Dashboard = () => {
  const { user } = useContext(UserContext)
  
  
  return (
    <>
      <title>Playlist Maker</title>
      <div id="main" className="tile">
        {
          user.loggedIn ?
            <div id="logged-in">
              <div id="nav">
                <div id="name-display">name</div>
                <button id="logout-btn">
                </button>
              </div>
              <div id="content">
                <div id="list-holder">
                </div>
                <div id="dashboard">
                </div>
              </div>
            </div>
            :
            <button id="login-btn" onClick={ Login }>Log in</button>
        }
      </div>
    </>
  )
}