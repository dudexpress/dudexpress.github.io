import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Frontmatter } from "../../types"
import WeightBox from "../boxes/WeightBox"
import PlayerCountBox from "../boxes/PlayerCountBox"
import DurationBox from "../boxes/DurationBox"
import ScoreBox from "../boxes/ScoreBox"

export default class BlogPostBoxes extends React.PureComponent<Frontmatter> {
  public render(): React.ReactNode {
    return (
      <Container>
        <Row className="welcome-boxes">
          <Col md={6} lg={3}>
            <ScoreBox value={this.props.score} />
          </Col>
          <Col md={6} lg={3}>
            <DurationBox
              value={this.props.playing_time}
              officialValue={this.props.playing_time_official}
            />
          </Col>
          <Col md={6} lg={3}>
            <WeightBox value={this.props.weight} />
          </Col>
          <Col md={6} lg={3}>
            <PlayerCountBox
              value={this.props.player_count}
              officialValue={this.props.player_count_official}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}
