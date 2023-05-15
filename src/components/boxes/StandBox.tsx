import React from "react"
import BaseBox from "./BaseBox"

interface StandBoxProps {
  value: string
  small?: boolean
}

export default class StandBox extends React.PureComponent<StandBoxProps> {
  public render(): React.ReactNode {
    return (
      <BaseBox title="Stand" small={this.props.small}>
        {this.props.value}
      </BaseBox>
    )
  }
}
