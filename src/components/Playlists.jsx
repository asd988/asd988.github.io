import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { PlaylistElement } from "./PlaylistElement"

async function getPlaylists({ access_token }) {
  // get items from spotify
  let { items } = await (await fetch("https://api.spotify.com/v1/me/playlists", { headers: { 'Authorization': 'Bearer ' + access_token } })).json();
  items.map((a, i) => a.internalId = i);

  console.log(items)
  return items
}

export const Playlists = () => {
  const { user } = useContext(UserContext)
  let [playlists, setPlaylists] = useState(undefined);
  useEffect(() => {
    getPlaylists(user).then(a => {
      setPlaylists(a);
    })
  }, [])

  return (
    <div className="flex-grow playlists">
      {
        playlists ? (
          playlists.map(({ name, owner, tracks, images}) => {
            return <PlaylistElement title={name} author={owner.display_name} songAmount={tracks.total} imageURL={images[0] ? images[0].url : undefined}/>
          })
        ) : "loading"
      }
    </div>
  )
}
