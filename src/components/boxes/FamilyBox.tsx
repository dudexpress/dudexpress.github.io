import React from "react"
import BaseBox from "./BaseBox"

interface FamilyBoxProps {
  value: string
  small?: boolean
}

export default class FamilyBox extends React.PureComponent<FamilyBoxProps> {
  public render(): React.ReactNode {
    return (
      <BaseBox title="Famiglia" small={this.props.small}>
        {this.props.value}
      </BaseBox>
    )
  }
}
