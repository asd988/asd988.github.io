import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { getAllTracks, getPlaylists, putTracks, removeTrackDuplicates, removeTracks } from "../helper/spotifyBridge";
import { ReactComponent as SettingsIcon } from "../svgs/settings.svg"
import { shuffleArray } from "../utils/functions";
import { Dropdown } from "./Dropdown";

import { Playlists } from "./Playlists"
import { SearchBar } from "./SearchBar"

export const Dashboard = () => {
  const { user } = useContext(UserContext)

  // search options
  const [searchQuery, setQuery] = useState("");
  const [sort, setSort] = useState(undefined);
  const [selFilter, setSelFilter] = useState(undefined);

  // playlists data
  const [playlists, setPlaylists] = useState(undefined);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedForEdit, setSelectedForEdit] = useState(null);

  // playlist generate settings
  const [order, setOrder] = useState("random");
  const [shouldRemoveDupes, setShouldRemoveDupes] = useState(true);

  const [isGenerating, setIsGenerating] = useState(false);

  const createPlaylist = async () => {
    const { id: my_id, access_token } = user;
    let id = selectedForEdit;

    if (id) {
      const previousTracks = await getAllTracks(
        user,
        id,
        playlists.filter(a => a.id === id)[0].tracks.total
      );
      await removeTracks(user, id, previousTracks.map(a => a.track.uri))
    } else {
      const response = await fetch(`https://api.spotify.com/v1/users/${my_id}/playlists`, {
        method: "POST",
        headers: { 'Authorization': 'Bearer ' + access_token },
        body: JSON.stringify({ name: "test", public: false })
      })
      const data = await response.json();
      id = data.id;
    }

    const selectedPlaylists = playlists.filter(a => selectedIds.includes(a.id))
    let promises = []
    selectedPlaylists.forEach(a => promises.push(getAllTracks(user, a.id, a.tracks.total)))
    const results = await Promise.all(promises)
    let allTracks = [].concat.apply([], results)
    if (shouldRemoveDupes) allTracks = removeTrackDuplicates(allTracks);


    let trackUris = allTracks.map(({ track }) => track.uri)
    if (order === "random") trackUris = shuffleArray(trackUris);
    await putTracks(user, id, trackUris)
  }

  const onClick = () => {
    setIsGenerating(true);
    createPlaylist().then(() => {
      setIsGenerating(false)
      getPlaylists(user).then(a => {
        setPlaylists(a);
      })
    })
  }

  return (
    <div className="h-4/5 md:border-[#aaa] md:border-solid md:border rounded-3xl w-full flex-grow md:mt-14 md:mb-14 p-6 flex flex-col items-center select-none">
      <div className="flex">
        <SearchBar setQuery={setQuery}></SearchBar>
        <Dropdown tag="Sort" setOptionId={setSort} options={[
          { id: "default", display: "Default" },
          { id: "a-z", display: "A to Z" },
          { id: "z-a", display: "Z to A" }
        ]} />
        <Dropdown tag="Filter" setOptionId={setSelFilter} options={[
          { id: "none", display: "None" },
          { id: "selected", display: "Selected" },
          { id: "unselected", display: "Unselected" }
        ]} />
      </div>
      <Playlists searchQuery={searchQuery} sort={sort} selectionFilter={selFilter} playlistsData={{
        playlists: [playlists, setPlaylists],
        selectedIds: [selectedIds, setSelectedIds],
        selectedForEdit: [selectedForEdit, setSelectedForEdit]
      }}></Playlists>
      <div className="bg-spotify rounded-full w-44 flex px-4 py-2 h-9 items-center justify-center">
        <button className="whitespace-nowrap" onClick={onClick} disabled={isGenerating}>
          {isGenerating ? "Generating..." : ((selectedForEdit ? "Replace" : "Create") + " Playlist")}
        </button>
        <button className="h-full aspect-square fill-[#eee] border-r-[#eee] border-l pl-2 ml-2 box-content">
          <SettingsIcon></SettingsIcon>
        </button>
      </div>
    </div>
  )
}