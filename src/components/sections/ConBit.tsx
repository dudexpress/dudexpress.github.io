import React from "react"

import BaseSection from "./BaseSection"
import HypeBox from "../boxes/HypeBox"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import DurationBox from "../boxes/DurationBox"
import WeightBox from "../boxes/WeightBox"
import PlayerCountBox from "../boxes/PlayerCountBox"
import { PostWeigth } from "../../types"
import Mechanisms from "../sidebar/Mechanisms"
import BaseBox from "../boxes/BaseBox"
import ScoreBox from "../boxes/ScoreBox"
import PublisherBox from "../boxes/PublisherBox"
import StandBox from "../boxes/StandBox"
import GameCard from "../misc/GameCard"
import { graphql, useStaticQuery } from "gatsby"
import * as stylesGameCard from "../misc/GameCard.module.scss"
import SystemBox from "../boxes/SystemBox"
import FamilyBox from "../boxes/FamilyBox"

export interface ConBitProps {
  title: string
  hype?: number
  score?: number
  slug?: string
  player_count?: number
  player_count_official?: string
  weight: PostWeigth
  playing_time?: string
  playing_time_official?: string
  publisher: string
  stand: string
  mechanism: string[]
  // gdr
  system?: string
  family?: string
}

export const ConBit = (props: React.PropsWithChildren<ConBitProps>) => {
  let review = null
  if (props.slug != null) {
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
    review = data.allMdx.nodes.filter(
      x => x.fields.slug === `/reviews/${props.slug}/`
    )[0]
  }

  function renderAfterTitle(): JSX.Element {
    const isGdR = props.family != null

    return (
      <Row className="welcome-boxes">
        <Col md={6} xl={4} className="p-0">
          {props.score && <ScoreBox value={props.score} small />}
          {props.hype && <HypeBox value={props.hype} small />}
        </Col>
        <Col md={6} xl={4} className="p-0">
          {isGdR ? (
            <SystemBox value={props.system!} small />
          ) : (
            <DurationBox
              value={props.playing_time!}
              officialValue={props.playing_time_official!}
              small
            />
          )}
        </Col>
        <Col md={6} xl={4} className="p-0">
          <WeightBox value={props.weight} small />
        </Col>
        <Col md={6} xl={4} className="p-0">
          {isGdR ? (
            <FamilyBox value={props.family!} small />
          ) : (
            <PlayerCountBox
              value={props.player_count!}
              officialValue={props.player_count_official!}
              small
            />
          )}
        </Col>
        <Col md={6} xl={4} className="p-0">
          <PublisherBox value={props.publisher} small />
        </Col>
        <Col md={6} xl={4} className="p-0">
          <StandBox value={props.stand} small />
        </Col>

        <Col md={12} xl={12} className="p-0">
          <BaseBox title="Meccaniche" small noHeight>
            <Mechanisms values={props.mechanism} small avoidLinks={isGdR} />
          </BaseBox>
        </Col>
      </Row>
    )
  }

  return (
    <BaseSection
      title={props.title}
      trait="pink"
      className="mb-4"
      renderAfterTitle={renderAfterTitle}
    >
      <p className="mt-4">{props.children}</p>
      {review && (
        <GameCard
          post={review}
          className={stylesGameCard.gameCardDark + " mt-5 mb-5"}
        />
      )}
    </BaseSection>
  )
}
