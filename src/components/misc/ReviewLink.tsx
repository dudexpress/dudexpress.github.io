import React from "react"
import { Link } from "gatsby"
import * as styles from "./ReviewLink.module.scss"

interface ReviewLinkProps {
  slug: string
}

const ReviewLink = ({ slug }: ReviewLinkProps) => {
  console.log(styles)
  return (
    <Link to={slug} className={styles.reviewLink}>
      Leggi la recensione →
    </Link>
  )
}

export default ReviewLink
