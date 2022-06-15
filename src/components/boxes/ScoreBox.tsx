import React from "react"
import BaseBox from "./BaseBox"

interface ScoreBoxProps {
  value: number
}

export default class ScoreBox extends React.PureComponent<ScoreBoxProps> {
  static height = 45
  static getLabel(value: number): React.ReactNode {
    switch (value) {
      case 10:
        return "Immancabile"
      case 9:
        return "Eccellente"
      case 8:
        return "Da avere"
      case 7:
        return "Da provare"
      case 6:
        return "Si difende"
      case 5:
        return "C'è di meglio"
      default:
        return "Meh"
    }
  }

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

  public render(): React.ReactNode {
    return (
      <BaseBox title="Punteggio" footer={ScoreBox.getLabel(this.props.value)}>
        {this.renderHearts()}
      </BaseBox>
    )
  }
}
