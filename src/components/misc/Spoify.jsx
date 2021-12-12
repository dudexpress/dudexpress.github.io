import React from "react"
import * as styles from "./Spotify.module.scss"

const Spotify = props => (
  <iframe
    title="Spotify"
    src={`https://open.spotify.com/embed/playlist/${props.playlistId}`}
    width="100%"
    height="80"
    frameBorder="0"
    allowtransparency="true"
    allow="encrypted-media"
    className={styles.spotify}
  ></iframe>
)

export default Spotify
