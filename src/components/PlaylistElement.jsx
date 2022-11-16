import { ReactComponent as NoteIcon } from "../svgs/note.svg"

export const PlaylistElement = ({ title = "Untitled", author = "Unknown", songAmount = 0, imageURL, id, ids }) => {
  const {selectedIds, updateIds} = ids;
  const selected = selectedIds.includes(id);

  const swap = () => {
    let ids = selectedIds
    if (selected) {
      const index = ids.indexOf(id);
      ids.splice(index, 1);
    } else {
      ids.push(id)
    }
    updateIds(ids); 
  }

  return (
    <button className="flex text-start my-2 mx-1" onClick={swap}>
      <div className={"h-10 aspect-square bg-[#333] " + (selected ? "outline outline-2 outline-spotify" : "")}>
        {
          imageURL ?
            <img src={imageURL} alt="Playlist Cover"></img>
            : <NoteIcon className="fill-[#888] w-full h-full p-2" />
        }
      </div>
      <div className="mx-2">
        <p>{title}</p>
        <div className="flex text-sm text-[#888]">
          <p>{author}</p>
          <p className="dot">{songAmount} songs</p>
        </div>
      </div>
    </button>
  )
}
