import React from "react"
import Card from "react-bootstrap/Card"

interface BaseBoxProps {
  title: string
  footer?: React.ReactNode
}

export default class BaseBox extends React.PureComponent<BaseBoxProps> {
  private renderFooter(): React.ReactNode {
    if (this.props.footer == null) {
      return null
    }
    return <Card.Footer>{this.props.footer}</Card.Footer>
  }

  public render(): React.ReactNode {
    return (
      <Card className="base-box">
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>{this.props.children}</Card.Text>
        </Card.Body>
        {this.renderFooter()}
      </Card>
    )
  }
}
