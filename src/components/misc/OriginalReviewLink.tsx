import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import GameCard from "../misc/GameCard"
import * as stylesGameCard from "../misc/GameCard.module.scss"
import BaseSection from "../sections/BaseSection"

export interface AdvisorBitProps {
  slug: string
}

export const OriginalReviewLink = ({
  slug,
}: React.PropsWithChildren<AdvisorBitProps>) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { fields: [frontmatter___date], order: ASC }
        filter: { frontmatter: { type: { eq: "review" } } }
      ) {
        nodes {
          id
          body
          frontmatter {
            type
            title
            description
            date(formatString: "DD/MM/YYYYY")
            mechanisms
            writer
            featureImage {
              childImageSharp {
                gatsbyImageData(
                  width: 330
                  placeholder: BLURRED
                  formats: [JPG, WEBP, AVIF]
                )
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  `)
  const review = data.allMdx.nodes.filter(
    x => x.fields.slug === `/reviews/${slug}/`
  )[0]

  return (
    <BaseSection title={`Espansione di`} trait="green" className="mb-4">
      <GameCard post={review} className={stylesGameCard.gameCardDark} />
    </BaseSection>
  )
}
