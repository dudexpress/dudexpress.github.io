import React from 'react';

const Spotify = props => (
    <iframe 
        title='spotify'
        src={`https://open.spotify.com/embed/playlist/${props.playlistId}`} 
        width="100%" 
        height="380" 
        frameBorder="0" 
        allowFullScreen="" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    />
)

export default Spotify;
