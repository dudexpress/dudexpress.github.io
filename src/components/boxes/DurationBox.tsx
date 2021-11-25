import React from "react"
import BaseBox from "./BaseBox"

interface DurationBoxProps {
  value: string
  officialValue: string
}

export default class DurationBox extends React.PureComponent<DurationBoxProps> {
  private renderFooter(): React.ReactNode {
    return "Dichiarati: " + this.props.officialValue
  }

  public render(): React.ReactNode {
    return (
      <BaseBox title="Durata" footer={this.renderFooter()}>
        {this.props.value}
      </BaseBox>
    )
  }
}
