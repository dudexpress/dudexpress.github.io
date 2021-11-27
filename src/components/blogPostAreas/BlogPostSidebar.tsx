import React from "react"
import { Frontmatter } from "../../types"
import SidebarValues from "../sidebar/SidebarVotes"
import Mechanisms from "../sidebar/Mechanisms"

export default class BlogPostSidebar extends React.PureComponent<Frontmatter> {
  public render(): React.ReactNode {
    return (
      <>
        <Mechanisms values={this.props.mechanisms} />
        <div className="mt-5">
          <SidebarValues values={this.props.sidebar_votes} />
        </div>
      </>
    )
  }
}
