import React from "react"
import BaseBox from "./BaseBox"

interface ScoreBoxProps {
  value: number
}

export default class ScoreBox extends React.PureComponent<ScoreBoxProps> {
  private renderFooter(): React.ReactNode {
    return "-"
  }

  public render(): React.ReactNode {
    return (
      <BaseBox title="Score" footer={this.renderFooter()}>
        {this.props.value} / 10
      </BaseBox>
    )
  }
}
