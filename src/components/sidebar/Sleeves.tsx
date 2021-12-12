import React from "react"
import { Sleeve } from "../../types"

interface SleevesProps {
  sleeves: Sleeve[]
}

export default class Sleeves extends React.PureComponent<SleevesProps> {
  private renderSleeve(sleeve: Sleeve): React.ReactNode {
    return (
      <li>
        <strong>{sleeve.size}</strong>: {sleeve.amount} carte
      </li>
    )
  }

  public render(): React.ReactNode {
    return (
      <>
        <h5>Bustine protettive</h5>
        <ul className="list-unstyled">
          {this.props.sleeves.map(this.renderSleeve)}
        </ul>
      </>
    )
  }
}
