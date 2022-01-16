import classnames from "classnames"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import { Author } from "../../types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram"

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
            instagram_url
          }
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.authors.find(
    (x: Author) => x.name === writerName
  )

  const renderSocial = (): React.ReactNode => {
    let socials = []

    if (author.instagram_url != null) {
      socials.push(
        <a href={author.instagram_url} target="_blank">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      )
    }

    return <span>{socials}</span>
  }

  return (
    <Card className={styles.postWriter}>
      <Card.Body>
        <Row>
          <Col md={2} className="mb-3 mb-md-0">
            <img src={`../../people/${author.image}`} alt={author.name} />
          </Col>
          <Col md={10}>
            <div className="d-flex flex-column justify-content-center h-100">
              <h4>
                {author.name} {renderSocial()}
              </h4>
              <p>{author?.summary}</p>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default PostWriter
