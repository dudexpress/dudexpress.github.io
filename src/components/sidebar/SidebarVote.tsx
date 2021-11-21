import React from "react"

export interface SidebarVoteProps {
  title: string
  value: number
}

export default class SidebarVote extends React.PureComponent<SidebarVoteProps> {
  private renderCirles(length: number, sign: string): React.ReactNode {
    return Array.from({ length }, (_, i) => sign)
  }

  public render(): React.ReactNode {
    const emptyCircles = 5 - this.props.value

    return (
      <div className="sidebar-random-value py-2">
        <h5>{this.props.title}</h5>
        <p className="values m-0">
          {this.renderCirles(this.props.value, "⬤")}
          {this.renderCirles(emptyCircles, "◯")}
        </p>
      </div>
    )
  }
}
