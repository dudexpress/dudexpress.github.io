import React from "react"
import { Link } from "gatsby"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Img from "gatsby-image"

const GameCard = ({ post }) => {
  const title = post.frontmatter.title || post.fields.slug
  return (
    <article
      className="post-list-item"
      itemScope
      itemType="http://schema.org/Article"
    >
      <Card>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Img
                fluid={post.frontmatter.featureImage.childImageSharp.fluid}
              />
            </Col>
            <Col md={8}>
              <div className="d-flex flex-column justify-content-center h-100">
                <h4 itemProp="headline">{title}</h4>
                <p
                  dangerouslySetInnerHTML={{
                    __html: post.frontmatter.description,
                  }}
                  itemProp="description"
                />
              </div>

              <Link
                to={post.fields.slug}
                className="stretched-link"
                itemProp="url"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </article>
  )
}

export default GameCard
