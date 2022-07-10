import React from "react"
import SidebarVote, { SidebarVoteProps } from "./SidebarVote"

interface SidebarVotesProps {
  values: SidebarVoteProps[]
}

export default class SidebarVotes extends React.PureComponent<SidebarVotesProps> {
  private renderItems(): React.ReactNode {
    return this.props.values.map((value: SidebarVoteProps) => (
      <SidebarVote key={value.title} {...value} />
    ))
  }

  public render(): React.ReactNode {
    return <div className="mb-5">{this.renderItems()}</div>
  }
}
