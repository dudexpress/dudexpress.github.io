import React from "react"
import Badge from "react-bootstrap/Badge"
import * as styles from "./Mechanisms.module.scss"
import { Link } from "gatsby"
import slugify from "slugify"

interface MechanismsProps {
  title?: string
  values: string[]
  withMore?: boolean
  small?: boolean
  avoidLinks?: boolean
}

export default class Mechanisms extends React.PureComponent<MechanismsProps> {
  private renderTag(tag: string): React.ReactNode {
    const badge = (
      <Badge key={tag} className={styles.badge} bg="secondary me-1 mb-1">
        {tag}
      </Badge>
    )
    if (this.props.avoidLinks) {
      return <div className="mt-1">{badge}</div>
    }

    return (
      <Link
        key={tag}
        to={`/mechanisms/${slugify(tag, { lower: true, strict: true })}`}
      >
        {badge}
      </Link>
    )
  }

  private renderMore(): React.ReactNode {
    if (!this.props.withMore) {
      return null
    }

    return (
      <Link to="/mechanisms" className="text-muted">
        e molte altre...
      </Link>
    )
  }

  public render(): React.ReactNode {
    if (this.props.small) {
      return (
        <div className="text-center text-lg-start">
          <div
            className={
              styles.mechanisms + " flex-row justify-content-center flex-wrap"
            }
          >
            {this.props.values.map(this.renderTag.bind(this))}
          </div>
        </div>
      )
    }

    return (
      <div className="mb-5 text-center text-lg-start">
        <h5 className="fw-bold">{this.props.title ?? "Meccaniche"}</h5>
        <div className={styles.mechanisms}>
          {this.props.values.map(this.renderTag.bind(this))}
          {this.renderMore()}
        </div>
      </div>
    )
  }
}
