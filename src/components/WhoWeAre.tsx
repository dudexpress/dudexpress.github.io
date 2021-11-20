import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Author } from "../types"

interface WhoWeAreProps {
  authors: Author[]
}

export default class WhoWeArea extends React.PureComponent<WhoWeAreProps> {
  private renderAuthor(author: Author): React.ReactNode {
    return (
      <div>
        <img
          src={`../../people/${author.image}`}
          alt={author.name}
          width={100}
        />
        <h4>{author.name}</h4>
        <p>{author.summary}</p>
      </div>
    )
  }

  public render(): React.ReactNode {
    return this.props.authors.map(this.renderAuthor)
  }
}
