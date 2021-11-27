import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Frontmatter } from "../../types"
import Img from "gatsby-image"

export default class BlogPostHeader extends React.PureComponent<Frontmatter> {
  public render(): React.ReactNode {
    return (
      <header className="blog-post-header">
        <Container>
          <Row>
            <Col md={3}>
              <Img fluid={this.props.featureImage.childImageSharp.fluid} />
            </Col>
            <Col md={9} className="blog-post-title">
              <h4>
                {this.props.designer} ● {this.props.publisher.replace("-", "●")}
              </h4>
              <h1 itemProp="headline">{this.props.title}</h1>
              <p>{this.props.description}</p>
            </Col>
          </Row>
        </Container>
      </header>
    )
  }
}
