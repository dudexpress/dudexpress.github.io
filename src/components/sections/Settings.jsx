import React from 'react';

const Settings = props => (
    <div>
        <h1>Ambientazione</h1>
        <span style={{color: 'red'}}>-------</span>
        <p>{props.children}</p>
    </div>
)

export default Settings;
