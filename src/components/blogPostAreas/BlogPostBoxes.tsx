import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Frontmatter } from "../../types"
import WeightBox from "../boxes/WeightBox"
import PlayerCountBox from "../boxes/PlayerCountBox"
import DurationBox from "../boxes/DurationBox"
import ScoreBox from "../boxes/ScoreBox"
import HypeBox from "../boxes/HypeBox"

export default class BlogPostBoxes extends React.PureComponent<Frontmatter> {
  private renderScoreBox(): React.ReactNode {
    if (
      this.props.gamefound_url != null ||
      this.props.kickstarter_url != null
    ) {
      return <HypeBox value={this.props.score} />
    }
    return <ScoreBox value={this.props.score} />
  }

  public render(): React.ReactNode {
    return (
      <Container>
        <Row className="welcome-boxes">
          <Col md={6} xl={3}>
            {this.renderScoreBox()}
          </Col>
          <Col md={6} xl={3}>
            <DurationBox
              value={this.props.playing_time}
              officialValue={this.props.playing_time_official}
            />
          </Col>
          <Col md={6} xl={3}>
            <WeightBox value={this.props.weight} />
          </Col>
          <Col md={6} xl={3}>
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
