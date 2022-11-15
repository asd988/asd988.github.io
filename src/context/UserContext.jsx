import { createContext } from "react"
import Cookies from "js-cookie"
import { Callback } from "../helper/auth"


export class User {
  loggedIn;
  id
  access_token
  refresh_token
  username

  constructor(loggedIn = false, id, access_token, refresh_token, username) {
    this.loggedIn = loggedIn;
    this.id = id;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
    this.username = username;
    // dolgok beolvasása cookiesból
  }

  logout() {
    Cookies.remove("profile")
    this.loggedIn = false;
  }

}

export const syncUser = async () => {
  let result = {loggedIn: false}

  let profile;
  if (Cookies.get("profile") !== undefined) {
    try {
      profile = JSON.parse(Cookies.get("profile"))
    } catch (error) {
      console.log(error)
    }
  }
  if (profile) {

    // get access_token
    const { access_token, refresh_token } = profile
    result.access_token = access_token
    result.refresh_token = refresh_token

    // retrieve response from spotify
    const response = await fetch("https://api.spotify.com/v1/me", { headers: { 'Authorization': 'Bearer ' + access_token } });
    const { id, display_name } = await response.json()
    result.id = id;

    // if response successful then continue
    if (response.status === 200) {
      console.log("i am confused")
      result.username = display_name
      result.loggedIn = true
    }
  }
  const { loggedIn, id, access_token, refresh_token, username } = result;
  return new User(loggedIn, id, access_token, refresh_token, username);
}

export const UserContext = createContext({ user: new User(), setUser: (user) => { } });