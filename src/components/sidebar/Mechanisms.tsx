import React from "react"
import Badge from "react-bootstrap/Badge"
import * as styles from "./Mechanisms.module.scss"
import { Link } from "gatsby"
import slugify from "slugify"

interface MechanismsProps {
  values: string[]
}

export default class Mechanisms extends React.PureComponent<MechanismsProps> {
  private renderTag(tag: string): React.ReactNode {
    return (
      <Link to={`/mechanisms/${slugify(tag, { lower: true })}`}>
        <Badge key={tag} className={styles.badge} bg="secondary me-1 mb-1">
          {tag}
        </Badge>
      </Link>
    )
  }

  public render(): React.ReactNode {
    return (
      <>
        <h5>Meccaniche</h5>
        <div className={styles.mechanisms}>
          {this.props.values.map(this.renderTag)}
        </div>
      </>
    )
  }
}
