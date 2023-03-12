import React from "react"
import BaseBox from "./BaseBox"
import * as style from "./PlayerCountBox.module.scss"

interface PlayerCountBoxProps {
  value: number
  officialValue: string
  small?: boolean
}

export default class PlayerCountBox extends React.PureComponent<PlayerCountBoxProps> {
  private getHeight(amount: number): number {
    if (amount <= 4) {
      return this.props.small ? 30 : 50
    }

    return this.props.small ? 25 : 40
  }

  private renderFooter(): React.ReactNode {
    return "Dichiarati: " + this.props.officialValue
  }

  private getRandomNumbers(amount: number): number[] {
    let array = [...new Array(16)].map((_, x) => x + 1)

    return array
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, amount)
  }

  public render(): React.ReactNode {
    const height = this.getHeight(this.props.value)

    return (
      <BaseBox
        title="Giocatori"
        footer={this.renderFooter()}
        small={this.props.small}
      >
        <span className={style.playerCount}>
          {this.getRandomNumbers(this.props.value).map((id: number) => (
            <img
              key={id}
              src={`../../gamers/${id}.png`}
              alt={`gamer ${id}`}
              height={height}
            />
          ))}
        </span>
      </BaseBox>
    )
  }
}
