import React from "react"
import BaseBox from "./BaseBox"

interface WeightBoxProps {
  value: number
}

export default class WeightBox extends React.PureComponent<WeightBoxProps> {
  private renderFooter(): React.ReactNode {
    return "leggero"
  }

  public render(): React.ReactNode {
    return (
      <BaseBox title="Peso" footer={this.renderFooter()}>
        {this.props.value} / 5
      </BaseBox>
    )
  }
}
