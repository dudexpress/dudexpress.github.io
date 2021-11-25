import classnames from "classnames"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import { Author } from "../../types"

import * as styles from "./PostWriter.module.scss"

interface PostWriterProps {
  writerName: string
}

const PostWriter = ({ writerName }: PostWriterProps) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          authors {
            name
            summary
            image
          }
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.authors.find(
    (x: Author) => x.name === writerName
  )

  const className = classnames(
    styles.postWriter,
    "d-flex justify-content-center"
  )
  return (
    <Card className={styles.postWriter}>
      <Card.Body className={styles.gameCardBody}>
        <Row>
          <Col md={2}>
            <img src={`../../people/${author.image}`} alt={author.name} />
          </Col>
          <Col md={10}>
            <div className="d-flex flex-column justify-content-center h-100">
              <h4>{author.name}</h4>
              <p>{author?.summary}</p>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default PostWriter
