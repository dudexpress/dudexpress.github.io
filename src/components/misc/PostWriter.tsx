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
    <div className="post-writer p-3 d-flex">
      <img src={`../../people/${author.image}`} alt={author.name} width={100} />
      <p>
        <h4>{author.name}</h4>
        {author?.summary}
      </p>
    </div>
  )
}

export default PostWriter
