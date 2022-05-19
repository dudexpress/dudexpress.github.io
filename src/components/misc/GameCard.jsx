import React from "react"
import { Link } from "gatsby"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import * as styles from "./GameCard.module.scss"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const GameCard = ({ post }) => {
  const title = post.frontmatter.title || post.fields.slug

  return (
    <Card className={styles.gameCard}>
      <Link to={post.fields.slug} className="stretched-link" />
      <Card.Body className={styles.gameCardBody}>
        <Row className="w-100">
          <Col md={2} className="mb-3 mb-md-0">
            <GatsbyImage
              image={getImage(post.frontmatter.featureImage)}
              className={styles.gameCardImg}
              alt="cover"
            />
          </Col>
          <Col md={10}>
            <div className="d-flex flex-column justify-content-center h-100">
              <h4>{title}</h4>
              <p>{post.frontmatter.description}</p>
              <small>
                {post.frontmatter.writer} ●{" "}
                <span className="release-date">{post.frontmatter.date}</span>
              </small>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default GameCard
