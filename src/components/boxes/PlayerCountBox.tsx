import React from "react"
import BaseBox from "./BaseBox"
interface PlayerCountBoxProps {
  value: number
}

export default class PlayerCountBox extends React.PureComponent<PlayerCountBoxProps> {
  private renderFooter(): React.ReactNode {
    return "Dichiarati: 1 - 5"
  }

  private getRandomNumbers(amount: number): number[] {
    let array = [...new Array(8)].map((_, x) => x + 1)
    console.log(array)
    return array
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, amount)
  }

  public render(): React.ReactNode {
    return (
      <BaseBox title="Numero giocatori" footer={this.renderFooter()}>
        <div className="player-count">
          {this.getRandomNumbers(this.props.value).map((id: number) => (
            <img
              src={`../../gamers/${id}.png`}
              alt={`gamer ${id}`}
              height={50}
            />
          ))}
        </div>
      </BaseBox>
    )
  }
}
