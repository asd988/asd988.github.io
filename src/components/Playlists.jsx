
import { PlaylistElement } from "./PlaylistElement"

export const Playlists = ({ searchQuery = "", sort = "default", selectionFilter = "none",
  playlistsData: {
    playlists: [playlists, setPlaylists],
    selectedIds: [selectedIds, setSelectedIds],
    selectedForEdit: [selectedForEdit, setSelectedForEdit]
  } }) => {
  const simpleQuery = searchQuery.toLocaleLowerCase().replaceAll(" ", "")

  const updateIds = ids => {
    // copy ids cuz react sucks
    setSelectedIds(JSON.parse(JSON.stringify(ids)))
  }

  const applySettings = () => {
    const playlistsCopy = JSON.parse(JSON.stringify(playlists))
    return playlistsCopy.sort(({ name: a }, { name: b }) => {
      if (sort === "a-z") {
        return a.localeCompare(b);
      } else if (sort === "z-a") {
        return b.localeCompare(a);
      }
      return 0
    }).filter(({ name, id }) => {
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

  const changeSelectedForEdit = (id) => {
    setSelectedForEdit(id ? id : null)
  }

  return (
    <div className="relative h-full w-full overflow-auto my-3">
      <div className="flex-grow playlists absolute w-full">
        {
          playlists ? (
            applySettings()
              .map(({ name, owner, tracks, images, id }, i) => {
                return <PlaylistElement
                  key={i}
                  title={name}
                  author={owner.display_name}
                  songAmount={tracks.total}
                  imageURL={images.at(-1) ? images.at(-1).url : undefined}
                  id={id}
                  ids={{ selectedIds, updateIds }}
                  selectedForEdit={[id === selectedForEdit, changeSelectedForEdit]}
                />
              })
          ) : "Loading..."
        }
      </div>
    </div>

  )
}
