import React from "react"
import classnames from "classnames"

interface BaseSectionProps {
  title: string
  trait: string
}

export default class BaseSection extends React.PureComponent<BaseSectionProps> {
  public render(): React.ReactNode {
    let lineClassName = classnames("base-section-color", {
      [`base-section-color-${this.props.trait}`]: true,
    })

    return (
      <div className="base-section">
        <h2>{this.props.title}</h2>
        <div className={lineClassName} />
        <p>{this.props.children}</p>
      </div>
    )
  }
}
