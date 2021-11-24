import React from "react"
import BaseBox from "./BaseBox"

interface ScoreBoxProps {
  value: number
}

export default class ScoreBox extends React.PureComponent<ScoreBoxProps> {
  public render(): React.ReactNode {
    return <BaseBox title="Punteggio">{this.props.value} / 10</BaseBox>
  }
}
