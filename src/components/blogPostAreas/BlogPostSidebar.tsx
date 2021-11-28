import classnames from "classnames"
import React from "react"
import { Frontmatter } from "../../types"
import SidebarValues from "../sidebar/SidebarVotes"
import Mechanisms from "../sidebar/Mechanisms"
import * as style from "./BlogPostSidebar.module.scss"

export default class BlogPostSidebar extends React.PureComponent<Frontmatter> {
  public render(): React.ReactNode {
    const className = classnames(style.blogPostSidebar, "mt-5 mt-md-0")

    return (
      <div className={className}>
        <Mechanisms values={this.props.mechanisms} />
        <div className="mt-5">
          <SidebarValues values={this.props.sidebar_votes} />
        </div>
      </div>
    )
  }
}
