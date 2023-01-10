import React from "react"
import classnames from "classnames"
import * as style from "./BaseSection.module.scss"

interface BaseSectionProps {
  title?: string
  trait?: "green" | "orange" | "pink"
  className?: string
}

export default class BaseSection extends React.PureComponent<
  React.PropsWithChildren<BaseSectionProps>
> {
  private renderTitle(): React.ReactNode {
    if (this.props.title == null) {
      return null
    }

    let lineClassName = classnames(style.baseSectionColor, {
      [style.baseSectionColorGreen]: this.props.trait === "green",
      [style.baseSectionColorOrange]: this.props.trait === "orange",
      [style.baseSectionColorPink]: this.props.trait === "pink",
    })

    return (
      <>
        <h2>{this.props.title}</h2>
        <div className={lineClassName} />
      </>
    )
  }

  public render(): React.ReactNode {
    let className = classnames(style.baseSection, this.props.className)

    return (
      <div className={className}>
        {this.renderTitle()}
        <p>{this.props.children}</p>
      </div>
    )
  }
}
