import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Fields, Frontmatter } from "../../types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import * as style from "./BlogPostHeader.module.scss"
import ReviewLink from "../misc/ReviewLink"

export interface BlogPostHeaderProps {
  frontmatter: Frontmatter
  fields?: Fields
  withLink?: boolean
}

export default class BlogPostHeader extends React.PureComponent<BlogPostHeaderProps> {
  private renderLink(): React.ReactNode {
    if (this.props.fields == null) {
      return null
    }
    return (
      <div>
        <ReviewLink slug={this.props.fields.slug} />
      </div>
    )
  }

  private renderDesignersAndPublishers(): React.ReactNode {
    const designers = this.props.frontmatter.designer.replace(/\s-\s/g, " ● ")
    const publisher = this.props.frontmatter.publisher.replace(/\s-\s/g, " ● ")

    if (!designers || !publisher) {
      return (
        <h4>
          {designers}
          {publisher}
        </h4>
      )
    }

    return (
      <h4>
        {designers} ● {publisher}
      </h4>
    )
  }

  public render(): React.ReactNode {
    return (
      <header className={style.blogPostHeader}>
        <Container>
          <Row>
            <Col md={3}>
              <GatsbyImage
                image={getImage(this.props.frontmatter.featureImage)!}
                className={style.blogPostHeaderImg}
                alt={this.props.frontmatter.title + " cover"}
              />
            </Col>
            <Col md={9} className={style.blogPostTitle}>
              {this.renderDesignersAndPublishers()}
              <h1>{this.props.frontmatter.title}</h1>
              <p>{this.props.frontmatter.description}</p>
              {this.renderLink()}
            </Col>
          </Row>
        </Container>
      </header>
    )
  }
}
