import React from 'react';

const Spotify = props => (
    <iframe src={`https://open.spotify.com/embed/playlist/${props.playlistId}`} width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
)

export default Spotify;
