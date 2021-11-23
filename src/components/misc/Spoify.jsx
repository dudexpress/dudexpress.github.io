import React from "react"

const Spotify = props => (
  <iframe
    src={`https://open.spotify.com/embed/playlist/${props.playlistId}`}
    width="100%"
    height="80"
    frameborder="0"
    allowtransparency="true"
    allow="encrypted-media"
  ></iframe>
)

export default Spotify
