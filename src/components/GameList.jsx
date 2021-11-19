import React from "react"

import GameCard from "../components/GameCard"

const GameList = ({ games }) => {
  return (
    <ol style={{ listStyle: `none` }}>
      {games.map(post => (
        <GameCard key={post.frontmatter.title} post={post} />
      ))}
    </ol>
  )
}

export default GameList
