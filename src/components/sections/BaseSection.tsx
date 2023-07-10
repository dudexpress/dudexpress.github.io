import * as style from "./BaseSection.module.scss"

import React from "react"
import classnames from "classnames"

interface BaseSectionProps {
  title?: string
  publisher?: string[]
  designer?: string[]
  trait?: "green" | "orange" | "pink"
  className?: string
  renderAfterTitle?: () => JSX.Element
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
        {this.props.designer && this.props.publisher && (
          <h4
            style={{
              fontSize: "0.8em",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {this.props.designer.join(" ● ")}
            {" ● "}
            {this.props.publisher.join(" ● ")}
          </h4>
        )}
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
        {this.props.renderAfterTitle?.()}
        <p>{this.props.children}</p>
      </div>
    )
  }
}
