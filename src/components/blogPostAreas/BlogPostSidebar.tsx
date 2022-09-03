import classnames from "classnames"
import React from "react"
import { Frontmatter } from "../../types"
import SidebarValues from "../sidebar/SidebarVotes"
import Mechanisms from "../sidebar/Mechanisms"
import * as style from "./BlogPostSidebar.module.scss"
import Sleeves from "../sidebar/Sleeves"
import Stores from "../sidebar/Stores"
import Disclaimer from "../sidebar/Disclainer"

export default class BlogPostSidebar extends React.PureComponent<Frontmatter> {
  public render(): React.ReactNode {
    const className = classnames(style.blogPostSidebar, "mt-5 mt-md-0")

    return (
      <div className={className}>
        <Stores {...this.props} linkToSpecificGame={true} />
        <Mechanisms values={this.props.mechanisms} />
        <SidebarValues values={this.props.sidebar_votes} />
        <Sleeves sleeves={this.props.sleeves} />
        <Disclaimer {...this.props} />
      </div>
    )
  }
}
