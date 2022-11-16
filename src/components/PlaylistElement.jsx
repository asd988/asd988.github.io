import { ReactComponent as NoteIcon } from "../svgs/note.svg"
import useLongPress from "../utils/useLongPress";

export const PlaylistElement = ({ title = "Untitled", author = "Unknown", songAmount = 0, imageURL, id, ids, selectedForEdit }) => {
  const [isEdit, changeEdit] = selectedForEdit;
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

  const hold = () => {
    changeEdit(isEdit ? null : id)
  }

  const longPressEvent = useLongPress(hold, swap, {
    shouldPreventDefault: true,
    delay: 500
  })

  return (
    <button className={"flex items-center text-start m-1 px-2 py-1 pl-3 rounded-xl " + (isEdit ? "outline outline-1 outline-pink-500" : "")} {...longPressEvent}>
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
