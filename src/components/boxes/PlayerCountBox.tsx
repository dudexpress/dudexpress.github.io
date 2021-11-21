import React from "react"
import BaseBox from "./BaseBox"
interface PlayerCountBoxProps {
  value: number
}

export default class PlayerCountBox extends React.PureComponent<PlayerCountBoxProps> {
  private renderFooter(): React.ReactNode {
    return "1 - 5"
  }

  public render(): React.ReactNode {
    return (
      <BaseBox title="Numero giocatori" footer={this.renderFooter()}>
        {this.props.value}
      </BaseBox>
    )
  }
}
