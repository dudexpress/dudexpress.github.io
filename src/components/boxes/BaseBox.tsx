import React from "react"
import Card from "react-bootstrap/Card"

interface BaseBoxProps {
  title: string
  footer?: React.ReactNode
}

export default class BaseBox extends React.PureComponent<BaseBoxProps> {
  public render(): React.ReactNode {
    return (
      <Card className="base-box">
        <Card.Body>
          <Card.Title className="mb-0">{this.props.title}</Card.Title>
          <Card.Text>{this.props.children}</Card.Text>
          <Card.Footer className="p-0">{this.props.footer}</Card.Footer>
        </Card.Body>
      </Card>
    )
  }
}
