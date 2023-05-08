import React from "react"
import BaseSection from "../sections/BaseSection"

export default class InterviewIntro extends React.PureComponent<
  React.PropsWithChildren<{}>
> {
  public render(): React.ReactNode {
    return <BaseSection trait="pink">{this.props.children}</BaseSection>
  }
}
