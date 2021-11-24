import React from "react"
import BaseSection from "./BaseSection"

export default class Feedback extends React.PureComponent {
  public render(): React.ReactNode {
    return (
      <BaseSection title="Impressioni" trait="pink">
        {this.props.children}
      </BaseSection>
    )
  }
}
