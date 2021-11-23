import React from "react"

interface BaseSectionProps {
  title: string
}

export default class BaseSection extends React.PureComponent<BaseSectionProps> {
  public render(): React.ReactNode {
    return (
      <div className="base-section">
        <h2>{this.props.title}</h2>
        <p>{this.props.children}</p>
      </div>
    )
  }
}
