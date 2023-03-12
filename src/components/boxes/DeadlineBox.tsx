import React from "react"
import BaseBox from "./BaseBox"

interface DeadlineBoxProps {
  value: string
  deliverylValue: string
  small?: boolean
}

export default class DeadlineBox extends React.PureComponent<DeadlineBoxProps> {
  private renderFooter(): React.ReactNode {
    return "Consegna: " + this.props.deliverylValue
  }

  public render(): React.ReactNode {
    return (
      <BaseBox
        title="Scadenza"
        footer={this.renderFooter()}
        small={this.props.small}
      >
        {this.props.value}
      </BaseBox>
    )
  }
}
