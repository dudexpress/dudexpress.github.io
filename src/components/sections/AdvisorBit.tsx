import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import BaseSection from "./BaseSection"
import GameCard from "../misc/GameCard"
import * as stylesGameCard from "../misc/GameCard.module.scss"
import PostWriter from "../misc/PostWriter"

export interface AdvisorBitProps {
  slug: string
  writer: string
  img: string
}

export const AdvisorBit = ({
  slug,
  writer,
  img,
  children,
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
    <BaseSection
      title={`Il consiglio di ${writer}`}
      trait="pink"
      className="mb-4"
    >
      <GameCard
        key={review.frontmatter.title}
        post={review}
        className={stylesGameCard.gameCardDark}
      />
      <p className="mt-4">{children}</p>
      <PostWriter writerName={writer} asCard={true} inAdvisor={true} />
    </BaseSection>
  )
}
