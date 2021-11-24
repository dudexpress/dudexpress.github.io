import React from "react"

import GameCard from "../components/GameCard"

const GameList = ({ games }) => {
  return (
    <div className="game-list">
      <ol style={{ listStyle: `none` }}>
        {games.map(post => (
          <GameCard key={post.frontmatter.title} post={post} />
        ))}
      </ol>
    </div>
  )
}

export default GameList
