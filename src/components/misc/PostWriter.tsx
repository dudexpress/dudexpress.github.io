import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Author } from "../../types"

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

  return (
    <div className="post-writer mt-5">
      <h5>{author.name}</h5>
      <img
        src={`../../people/${author.image}`}
        alt={author.name}
        className="py-2"
      />
      <p>{author?.summary}</p>
    </div>
  )
}

export default PostWriter
