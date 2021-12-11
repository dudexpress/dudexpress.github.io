import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Frontmatter } from "../../types"
import Img from "gatsby-image"
import * as style from "./BlogPostHeader.module.scss"

export default class BlogPostHeader extends React.PureComponent<Frontmatter> {
  public render(): React.ReactNode {
    return (
      <header className={style.blogPostHeader}>
        <Container>
          <Row>
            <Col md={3}>
              <Img
                fluid={this.props.featureImage.childImageSharp.fluid}
                className={style.blogPostHeaderImg}
                alt="cover"
              />
            </Col>
            <Col md={9} className={style.blogPostTitle}>
              <h4>
                {this.props.designer.replace(/-/g, "●")} ●{" "}
                {this.props.publisher.replace(/-/g, "●")}
              </h4>
              <h1>{this.props.title}</h1>
              <p>{this.props.description}</p>
            </Col>
          </Row>
        </Container>
      </header>
    )
  }
}
