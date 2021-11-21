import React from "react"
import Badge from "react-bootstrap/Badge"

interface MechanismsProps {
  values: string[]
}

export default class Mechanisms extends React.PureComponent<MechanismsProps> {
  private renderTag(tag: string): React.ReactNode {
    return <Badge bg="secondary me-1 mb-1">{tag}</Badge>
  }

  public render(): React.ReactNode {
    return (
      <>
        <h5>Meccaniche</h5>
        {this.props.values.map(this.renderTag)}
      </>
    )
  }
}
