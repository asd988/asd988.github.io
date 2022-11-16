
export async function getAllTracks({ access_token }, playlistId, total) {
    let offset = 0;
    let promises = []
    while (offset < total) {
        promises.push( fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?` + new URLSearchParams({
            offset: offset
        }), {
            headers:{'Authorization': 'Bearer ' + access_token},
            method: "GET"
        }) )
        offset += 100;
    }
    const responses = await Promise.all(promises)
    const datas = await Promise.all(responses.map( a => a.json()))
    let allItems = [];
    datas.forEach( a => allItems = allItems.concat(a.items));
    return allItems
}

export async function removeTracks({ access_token }, playlistId, trackUris) {
    for (let i = 0; i < trackUris.length; i += 100) {
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers:{'Authorization': 'Bearer ' + access_token},
            method: "DELETE",
            body: JSON.stringify({
                uris: trackUris.slice(i, i+100)
            })
        })
    }
}

export async function putTracks({ access_token }, playlistId, trackUris) {
    let promises = []
    for (let i = 0; i < trackUris.length; i += 100) {
        promises.push( fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers:{'Authorization': 'Bearer ' + access_token},
            method: "POST",
            body: JSON.stringify({
                uris: trackUris.slice(i, i+100)
            })
        }) )
    }
    return await Promise.all(promises)
}

export function removeTrackDuplicates(tracks) {
    let seen = {}
    return tracks.filter(({track}) => {
        return seen.hasOwnProperty(track.id) ? false : (seen[track.id] = true);
    })
}

export async function getPlaylists({ access_token }) {
    // get items from spotify
    let { items } = await (await fetch("https://api.spotify.com/v1/me/playlists", {headers:{'Authorization': 'Bearer ' + access_token}})).json();
    return items;
}