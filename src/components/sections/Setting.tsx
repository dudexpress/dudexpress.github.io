import React from "react"
import BaseSection from "./BaseSection"

export default class Setting extends React.PureComponent {
  public render(): React.ReactNode {
    return (
      <BaseSection title="Ambientazione" trait="green">
        {this.props.children}
      </BaseSection>
    )
  }
}
