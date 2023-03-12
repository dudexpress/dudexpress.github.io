import React from "react"
import BaseBox from "./BaseBox"

interface PriceBoxProps {
  value: string
  otherValue: string
  small?: boolean
}

export default class PriceBox extends React.PureComponent<PriceBoxProps> {
  private renderFooter(): React.ReactNode {
    return "Spedizioni: " + this.props.otherValue
  }

  public render(): React.ReactNode {
    return (
      <BaseBox
        title="Prezzo base"
        footer={this.renderFooter()}
        small={this.props.small}
      >
        {this.props.value}
      </BaseBox>
    )
  }
}
