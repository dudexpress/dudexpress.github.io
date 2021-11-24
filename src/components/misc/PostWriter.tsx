import classnames from "classnames"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

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
    <div className={className}>
      <img
        src={`../../people/${author.image}`}
        alt={author.name}
        className="me-3"
      />
      <div>
        <h5>{author.name}</h5>
        <p>{author?.summary}</p>
      </div>
    </div>
  )
}

export default PostWriter
