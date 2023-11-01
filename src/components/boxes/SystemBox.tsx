import React from "react"
import BaseBox from "./BaseBox"

interface SystemBoxProps {
  value: string
  small?: boolean
}

export default class SystemBox extends React.PureComponent<SystemBoxProps> {
  public render(): React.ReactNode {
    return (
      <BaseBox title="Sistema" small={this.props.small}>
        {this.props.value}
      </BaseBox>
    )
  }
}
