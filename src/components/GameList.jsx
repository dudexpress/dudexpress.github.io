import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import GameCard from "../components/GameCard"

const GameList = ({ games }) => {
  return (
    <Row className="game-list">
      <Col lg={{ span: 6, offset: 3 }}>
        {games.map(post => (
          <GameCard key={post.frontmatter.title} post={post} />
        ))}
      </Col>
    </Row>
  )
}

export default GameList
