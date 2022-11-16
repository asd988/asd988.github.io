import { User } from "../context/UserContext"
import Cookies from "js-cookie"
import generateRandomString from "../utils/generateRandomString";


const stateKey = 'spotify_auth_state';
const clientId = 'fd19eb51d7204c3f9096c4751e6c14fd';
const redirectUri = window.location.protocol + "//" + window.location.hostname + (window.location.port === "" ? "" : ":" + window.location.port) + "/callback"

export const Login = () => {
  const state = generateRandomString(16)
  Cookies.set(stateKey, state)

  const scope = "user-read-private user-read-email playlist-read-private user-library-read playlist-modify-private"

  // redirect
  window.location.href = "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state
    }).toString();
}

export const Logout = (setUser) => {
  Cookies.remove("profile")
  setUser(new User(false))
}

export const Callback = () => {

  const { code, state } = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const storedState = Cookies.get(stateKey);

  if (state === undefined || code === undefined || state !== storedState) {
    console.log("error")
  } else {
    Cookies.remove(stateKey)

    const data = {
      state,
      code,
      redirect_uri: redirectUri
    }

    fetch("https://spotify-playlist.asd988.workers.dev/callback", {
      method: "POST",
      body: JSON.stringify(data)
    }).then(r => r.json()).then(a => {
      Cookies.set("profile", JSON.stringify(a))
      document.location.href = "/";
    })
  }

}