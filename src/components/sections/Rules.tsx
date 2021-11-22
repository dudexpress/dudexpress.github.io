import React from "react"
import BaseSection from "./BaseSection"

export default class Rules extends React.PureComponent {
  public render(): React.ReactNode {
    return (
      <BaseSection title="Regole in breve">{this.props.children}</BaseSection>
    )
  }
}
