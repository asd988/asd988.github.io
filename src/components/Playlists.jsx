import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { PlaylistElement } from "./PlaylistElement"

export const Playlists = ({searchQuery = "", sort = "default", selectionFilter = "none"}) => {
  const { user } = useContext(UserContext)
  const simpleQuery = searchQuery.toLocaleLowerCase().replaceAll(" ", "")
  const [playlists, setPlaylists] = useState(undefined);
  const [selectedIds, setSelectedIds] = useState([]);

  const updateIds = ids => {
    // copy ids cuz react sucks
    setSelectedIds(JSON.parse(JSON.stringify(ids)))
  }

  const getPlaylists = async () => {
    const { access_token } = user;
    // get items from spotify
    let { items } = await (await fetch("https://api.spotify.com/v1/me/playlists", { headers: { 'Authorization': 'Bearer ' + access_token } })).json();
    items.map((a, i) => a.internalId = i);
  
    return items
  }

  const applySettings = () => {
    return playlists.sort(({ name: a }, { name: b }) => {
        if (sort === "a-z") {
            return a.localeCompare(b);
        } else if (sort === "z-a") {
            return b.localeCompare(a);
        }
        return 0
    }).filter(({name, id}) => {
        const selected = selectedIds.includes(id);
        const simpleName = name.toLocaleLowerCase().replaceAll(" ", "")
        
        let allow = true;
        if (selectionFilter === "selected") {
            allow = selected;
        } else if (selectionFilter === "unselected") {
            allow = !selected
        }
        
        return (simpleName.includes(simpleQuery) || simpleQuery.includes(simpleName)) && allow;
    })
  }


  useEffect(() => {
    getPlaylists(user).then(a => {
      setPlaylists(a);
    })
  }, [])

  return (
    <div className="relative h-full w-full overflow-auto my-3">
      <div className="flex-grow playlists absolute w-full">
        {
          playlists ? (
            applySettings(playlists, selectedIds, searchQuery, sort, selectionFilter)
              .map(({ name, owner, tracks, images, id }, i) => {
              return <PlaylistElement 
                key={i}
                title={name} 
                author={owner.display_name} 
                songAmount={tracks.total} 
                imageURL={images[0] ? images[0].url : undefined}
                id={id}
                ids={{selectedIds, updateIds}}
                />
            })
          ) : "loading"
        }
      </div>
    </div>

  )
}
