import BaseSection from "./BaseSection"
import React from "react"

export default class Panoramic extends React.PureComponent<
  React.PropsWithChildren<{}>
> {
  public render(): React.ReactNode {
    return (
      <BaseSection title="Panoramica" trait="orange">
        {this.props.children}
      </BaseSection>
    )
  }
}
