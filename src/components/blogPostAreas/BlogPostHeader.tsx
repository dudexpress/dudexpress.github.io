import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Fields, Frontmatter } from "../../types"
import Img from "gatsby-image"
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

  public render(): React.ReactNode {
    return (
      <header className={style.blogPostHeader}>
        <Container>
          <Row>
            <Col md={3}>
              <Img
                fluid={
                  this.props.frontmatter.featureImage.childImageSharp.fluid
                }
                className={style.blogPostHeaderImg}
                alt="cover"
              />
            </Col>
            <Col md={9} className={style.blogPostTitle}>
              <h4>
                {this.props.frontmatter.designer.replace(/-/g, "●")} ●{" "}
                {this.props.frontmatter.publisher.replace(/-/g, "●")}
              </h4>
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
