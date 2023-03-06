import React from "react"
import BaseSection from "./BaseSection"

export default class FundingIntro extends React.PureComponent<
  React.PropsWithChildren<{}>
> {
  public render(): React.ReactNode {
    return <BaseSection trait="pink">{this.props.children}</BaseSection>
  }
}
