import BaseBox from "../boxes/BaseBox"
import BaseSection from "./BaseSection"
import Col from "react-bootstrap/Col"
import DeadlineBox from "../boxes/DeadlineBox"
import DurationBox from "../boxes/DurationBox"
import HypeBox from "../boxes/HypeBox"
import Mechanisms from "../sidebar/Mechanisms"
import PlayerCountBox from "../boxes/PlayerCountBox"
import { PostWeigth } from "../../types"
import PriceBox from "../boxes/PriceBox"
import React from "react"
import Row from "react-bootstrap/Row"
import WeightBox from "../boxes/WeightBox"

export interface AdvisorBitProps {
  title: string
  hype: number
  player_count: number
  player_count_official: string
  weight: PostWeigth
  playing_time: string
  playing_time_official: string
  deadline: string
  delivery: string
  price: string
  otherPrice: string
  mechanism: string[]
  designer?: string[]
  publisher?: string[]
}

export const FundingBit = (props: React.PropsWithChildren<AdvisorBitProps>) => {
  function renderAfterTitle(): JSX.Element {
    return (
      <Row className="welcome-boxes">
        <Col md={6} xl={4} className="p-0">
          <HypeBox value={props.hype} small />
        </Col>
        <Col md={6} xl={4} className="p-0">
          <DurationBox
            value={props.playing_time}
            officialValue={props.playing_time_official}
            small
          />
        </Col>
        <Col md={6} xl={4} className="p-0">
          <WeightBox value={props.weight} small />
        </Col>
        <Col md={6} xl={4} className="p-0">
          <PlayerCountBox
            value={props.player_count}
            officialValue={props.player_count_official}
            small
          />
        </Col>
        <Col md={6} xl={4} className="p-0">
          <DeadlineBox
            value={props.deadline}
            deliverylValue={props.delivery}
            small
          />
        </Col>
        <Col md={6} xl={4} className="p-0">
          <PriceBox value={props.price} otherValue={props.otherPrice} small />
        </Col>

        <Col md={12} xl={12} className="p-0">
          <BaseBox title="Meccaniche" small noHeight>
            <Mechanisms values={props.mechanism} small />
          </BaseBox>
        </Col>
      </Row>
    )
  }

  return (
    <BaseSection
      title={props.title}
      publisher={props.publisher}
      designer={props.designer}
      trait="pink"
      className="mb-4"
      renderAfterTitle={renderAfterTitle}
    >
      <p className="mt-4">{props.children}</p>
      {/* <PostWriter writerName={writer} asCard={true} inAdvisor={true} /> */}
    </BaseSection>
  )
}
