import React from "react"
import BaseBox from "./BaseBox"

interface PublisherBoxProps {
  value: string
  small?: boolean
}

export default class PublisherBox extends React.PureComponent<PublisherBoxProps> {
  public render(): React.ReactNode {
    return (
      <BaseBox title="Editore" small={this.props.small}>
        {this.props.value}
      </BaseBox>
    )
  }
}
