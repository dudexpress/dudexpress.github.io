import React from "react"
import * as styles from "./ReviewLink.module.scss"
import { Link } from "gatsby"

export const ReviewLink = props => {
  return <Link className={styles.reviewLink} {...props} />
}
