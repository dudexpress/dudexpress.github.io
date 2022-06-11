import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch"
import React, { useState, useEffect } from "react"
import { useFlexSearch } from "react-use-flexsearch"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import GameCard from "../components/misc/GameCard"

const Search = ({ index, store, location, defaultPosts }) => {
  const { search } = location
  const query = new URLSearchParams(search).get("s")
  const [searchQuery, setSearchQuery] = useState(query || "")
  const results = useFlexSearch(searchQuery, index, store)

  const renderEmptyState = () => {
    if (searchQuery && results.length === 0) {
      return <div className="text-center mt-5">Nessun risultato :(</div>
    }
  }

  const sendEventToGogoleAnalytics = search_term => {
    if (window.gtag == null) {
      window.gtag = console.log
    }
    window.gtag("event", "search", { search_term })
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        sendEventToGogoleAnalytics(searchQuery)
      }
    }, 400)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  const getGames = () => {
    if (!searchQuery) {
      return defaultPosts
    }

    return results.map(x => ({
      fields: {
        slug: x.slug,
      },
      frontmatter: {
        writer: x.writer,
        title: x.title,
        date: x.date,
        description: x.description,
        featureImage: x.featureImage,
      },
    }))
  }

  return (
    <div>
      <form action="/" method="get" autoComplete="off">
        <div className="input-group mb-3">
          <input
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Everdell, Piazzamento Lavoratori, Nani, Eris.in.Boardgameland, ..."
          />
          <span className="input-group-text bg-white" id="basic-addon2">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
      </form>
      {getGames().map(post => (
        <GameCard key={post.frontmatter.title} post={post} />
      ))}
      {renderEmptyState()}
    </div>
  )
}

export default Search
