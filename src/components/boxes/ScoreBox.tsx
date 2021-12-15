import React from "react"
import BaseBox from "./BaseBox"

interface ScoreBoxProps {
  value: number
}

export default class ScoreBox extends React.PureComponent<ScoreBoxProps> {
  static height = 45

  private renderFullHearts(amount: number): React.ReactNode {
    return [...new Array(amount)].map((_, idx) => (
      <img
        key={`full-` + idx}
        src={`../../hearts/full.png`}
        alt="heart"
        height={ScoreBox.height}
      />
    ))
  }

  private renderEmtpyHearts(amount: number): React.ReactNode {
    return [...new Array(amount)].map((_, idx) => (
      <img
        key={`empty-` + idx}
        src={`../../hearts/empty.png`}
        alt="heart"
        height={ScoreBox.height}
      />
    ))
  }

  private renderHalfHeart(toRender: boolean): React.ReactNode {
    if (!toRender) {
      return null
    }

    return (
      <img
        key="half"
        src={`../../hearts/half.png`}
        alt="heart"
        height={ScoreBox.height}
      />
    )
  }

  private renderHearts(): React.ReactNode {
    let fullHearts: number = Math.floor(this.props.value / 2),
      withHalf: boolean = this.props.value % 2 === 1,
      emptyHearts: number = 5 - fullHearts - (withHalf ? 1 : 0)

    return (
      <>
        {this.renderFullHearts(fullHearts)}
        {this.renderHalfHeart(withHalf)}
        {this.renderEmtpyHearts(emptyHearts)}
      </>
    )
  }

  private renderFooter(): React.ReactNode {
    return `${this.props.value} / 10`
  }

  public render(): React.ReactNode {
    return (
      <BaseBox title="Punteggio" footer={this.renderFooter()}>
        {this.renderHearts()}
      </BaseBox>
    )
  }
}
