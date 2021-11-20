import React from "react"

interface BaseSectionProps {
  title: string
  color: string
}

export default class BaseSection extends React.PureComponent<BaseSectionProps> {
  public render(): React.ReactNode {
    return (
      <>
        <h1>{this.props.title}</h1>
        <p style={{ color: this.props.color }}>--</p>
        <p>{this.props.children}</p>
      </>
    )
  }
}
