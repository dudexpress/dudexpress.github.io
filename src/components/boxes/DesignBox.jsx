import React from 'react';

const DesignBox = props => {
    return <div>
        <h1>Design</h1>
        <p>{Array.from({length: props.value}, (_, i) => "⭐️ ")}</p>
    </div>
}

export default DesignBox;
