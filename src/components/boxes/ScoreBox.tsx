import React from "react"

interface ScoreBoxProps {
  value: number
}

export default class ScoreBox extends React.PureComponent<ScoreBoxProps> {
  public render(): React.ReactNode {
    return (
      <>
        <h1>Score</h1>
        <p>{this.props.value}</p>
      </>
    )
  }
}
