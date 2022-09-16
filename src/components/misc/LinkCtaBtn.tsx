import React from "react"
import { Link } from "gatsby"
import * as styles from "./LinkCtaBtn.module.scss"

interface ReviewLinkProps {
  slug: string
  title: string
}

const LinkCtaBtn = ({ slug, title }: ReviewLinkProps) => {
  return (
    <Link to={slug} className={styles.reviewLink}>
      {title} →
    </Link>
  )
}

export default LinkCtaBtn
