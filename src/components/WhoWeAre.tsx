import React from "react"
import { Author } from "../types"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

interface WhoWeAreProps {
  authors: Author[]
}

export default class WhoWeArea extends React.PureComponent<WhoWeAreProps> {
  private renderAuthor(author: Author): React.ReactNode {
    return (
      <Col>
        <img
          src={`../../people/${author.image}`}
          alt={author.name}
          width={100}
        />
        <h4>{author.name}</h4>
        <p>{author.summary}</p>
      </Col>
    )
  }

  public render(): React.ReactNode {
    return <Row>{this.props.authors.map(this.renderAuthor)}</Row>
  }
}
