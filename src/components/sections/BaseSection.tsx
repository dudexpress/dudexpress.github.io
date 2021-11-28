import React from "react"
import classnames from "classnames"
import * as style from "./BaseSection.module.scss"

interface BaseSectionProps {
  title: string
  trait: "green" | "orange" | "pink"
}

export default class BaseSection extends React.PureComponent<BaseSectionProps> {
  public render(): React.ReactNode {
    let lineClassName = classnames(style.baseSectionColor, {
      [style.baseSectionColorGreen]: this.props.trait === "green",
      [style.baseSectionColorOrange]: this.props.trait === "orange",
      [style.baseSectionColorPink]: this.props.trait === "pink",
    })

    return (
      <div className={style.baseSection}>
        <h2>{this.props.title}</h2>
        <div className={lineClassName} />
        <p>{this.props.children}</p>
      </div>
    )
  }
}
