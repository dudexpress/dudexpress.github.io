import React from "react"
import SidebarVote, { SidebarVoteProps } from "./SidebarVote"

interface SidebarVotesProps {
  values: SidebarVoteProps[]
}

export default class SidebarVotes extends React.PureComponent<SidebarVotesProps> {
  public render(): React.ReactNode {
    return this.props.values.map((value: SidebarVoteProps) => (
      <SidebarVote key={value.title} {...value} />
    ))
  }
}
