import React from "react"

const DesignBox = props => {
  return (
    <div>
      <h4>Valore a caso</h4>
      <p>{Array.from({ length: props.value }, (_, i) => "⭐️ ")}</p>
    </div>
  )
}

export default DesignBox
