import React, { useState } from "react"
import { useFlexSearch } from "react-use-flexsearch"

import GameList from "../components/GameList"

const Search = ({ index, store }) => {
  const { search } = window.location
  const query = new URLSearchParams(search).get("s")
  const [searchQuery, setSearchQuery] = useState(query || "")
  const results = useFlexSearch(searchQuery, index, store)
  const games = results.map(x => ({
    fields: {
      slug: x.slug,
    },
    frontmatter: {
      title: x.title,
      date: x.date,
      description: x.description,
    },
  }))

  return (
    <div>
      <form action="/" method="get" autoComplete="off">
        <label htmlFor="header-search">
          <span className="visually-hidden">Search blog posts</span>
        </label>
        <input
          value={searchQuery}
          onInput={e => setSearchQuery(e.target.value)}
          type="text"
          id="header-search"
          placeholder="Search blog posts"
          name="s"
        />
      </form>
      <GameList games={games} />
      <hr />
    </div>
  )
}

export default Search
