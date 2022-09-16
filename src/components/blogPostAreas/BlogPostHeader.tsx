import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Fields, Frontmatter } from "../../types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import * as style from "./BlogPostHeader.module.scss"
import LinkCtaBtn from "../misc/LinkCtaBtn"

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
      <div className="mt-3">
        <LinkCtaBtn slug={this.props.fields.slug} title="Leggi la recensione" />
      </div>
    )
  }

  private renderDate(): React.ReactNode {
    if (this.props.fields?.slug != null) {
      return null
    }
    return (
      <small className="mt-4">
        Pubblicata il {this.props.frontmatter.date}
      </small>
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
              {this.renderDate()}
              {this.renderLink()}
            </Col>
          </Row>
        </Container>
      </header>
    )
  }
}
