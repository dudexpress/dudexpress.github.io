import React from "react"
import BaseBox from "./BaseBox"

interface DurationBoxProps {
  value: string
}

export default class DurationBox extends React.PureComponent<DurationBoxProps> {
  private renderFooter(): React.ReactNode {
    return "-"
  }

  public render(): React.ReactNode {
    return (
      <BaseBox title="Durata" footer={this.renderFooter()}>
        {this.props.value}
      </BaseBox>
    )
  }
}
