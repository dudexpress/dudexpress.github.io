import React from "react"

interface PlayerCountBoxProps {
  value: number
}

export default class PlayerCountBox extends React.PureComponent<PlayerCountBoxProps> {
  public render(): React.ReactNode {
    return (
      <>
        <h1>Player Count</h1>
        <p>{this.props.value}</p>
      </>
    )
  }
}
