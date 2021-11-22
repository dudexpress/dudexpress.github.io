import React from "react"

interface BaseSectionProps {
  title: string
}

export default class BaseSection extends React.PureComponent<BaseSectionProps> {
  public render(): React.ReactNode {
    return (
      <div className="base-section pb-5">
        <h1>{this.props.title}</h1>
        <p>{this.props.children}</p>
      </div>
    )
  }
}
