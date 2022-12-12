import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import { Author } from "../../types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram"
import slugify from "slugify"
import * as styles from "./PostWriter.module.scss"
import { faGlobeEurope } from "@fortawesome/free-solid-svg-icons"
import { faYoutube } from "@fortawesome/free-brands-svg-icons"

interface PostWriterProps {
  writerName: string
  asCard: boolean
}

const PostWriter = ({ writerName, asCard }: PostWriterProps) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          authors {
            name
            summary
            image
            instagram_url
            youtube_url
            website
          }
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.authors.find(
    (x: Author) => x.name === writerName
  )

  const renderSocial = (): React.ReactNode => {
    if (asCard) {
      return null
    }
    let socials = []

    if (author.instagram_url != null) {
      socials.push(
        <a href={author.instagram_url} target="_blank" className="me-1">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      )
    }

    if (author.youtube_url != null) {
      socials.push(
        <a href={author.youtube_url} target="_blank" className="me-1">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      )
    }

    if (author.website != null) {
      socials.push(
        <a href={author.website} target="_blank" className="me-1">
          <FontAwesomeIcon icon={faGlobeEurope} />
        </a>
      )
    }

    return <span>{socials}</span>
  }

  const content = (
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
  )

  if (asCard) {
    return (
      <Card className={styles.postWriter + " " + styles.asCard}>
        <Link
          to={`/writers/${slugify(author.name, { lower: true })}`}
          className="stretched-link"
        />
        <Card.Body>{content}</Card.Body>
      </Card>
    )
  }

  return <div className={styles.postWriter}>{content}</div>
}

export default PostWriter
