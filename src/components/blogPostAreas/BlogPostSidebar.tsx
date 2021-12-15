import classnames from "classnames"
import React from "react"
import { Frontmatter } from "../../types"
import SidebarValues from "../sidebar/SidebarVotes"
import Mechanisms from "../sidebar/Mechanisms"
import * as style from "./BlogPostSidebar.module.scss"
import Sleeves from "../sidebar/Sleeves"
import Socials from "../sidebar/Socials"

export default class BlogPostSidebar extends React.PureComponent<Frontmatter> {
  private renderSleeves(): React.ReactNode {
    if (this.props.sleeves == null) {
      return null
    }

    return (
      <div className="mt-5">
        <Sleeves sleeves={this.props.sleeves} />
      </div>
    )
  }

  public render(): React.ReactNode {
    const className = classnames(style.blogPostSidebar, "mt-5 mt-md-0")

    return (
      <div className={className}>
        <Mechanisms values={this.props.mechanisms} />
        <div className="mt-5">
          <SidebarValues values={this.props.sidebar_votes} />
        </div>
        {this.renderSleeves()}
        <div className="mt-5">
          <Socials />
        </div>
      </div>
    )
  }
}
