import React, { useEffect, useState } from "react"
import { graphql, withPrefix } from "gatsby"
import Container from "react-bootstrap/Container"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import Spinner from "../components/misc/Spinner"
import DiscountCard from "../components/discounts/DiscountCard"
import * as style from "./discounts.module.scss"
import axios from "axios"

const Discount = ({ data, location }) => {
  const [sorting, setSorting] = useState(
      new URLSearchParams(window.location.search).get("sort") ?? "magia"
    ),
    [isLoading, setIsLoading] = useState(false),
    // first fetch
    [firstFetch, setFirstFetch] = useState(true),
    [fetchedDiscountItems, setFetchedDiscountItems] = useState([]),
    // query fetch
    [query, setQuery] = useState(
      new URLSearchParams(window.location.search).get("query")
    ),
    [fetchedItems, setFetchedItems] = useState([]),
    { title } = data.site.siteMetadata,
    metaTitle = `Trova sconti | ${title}`,
    metaDescription =
      "I migliori giochi in sconto sui nostri store preferiti! Affrettati, dureranno poco!",
    apiHost = "https://api.dudexpress.it",
    getFetchDiscountItemUrl = () => `${apiHost}/discounts`,
    getQueryUrl = value =>
      `${apiHost}/search?query=${value.split(" ").join("%20")}`,
    fetchDiscountItems = () => {
      axios.get(getFetchDiscountItemUrl()).then(response => {
        setFetchedDiscountItems(response.data.items)
        setIsLoading(false)
        setFirstFetch(false)
      })
    },
    fetchItems = value => {
      axios.get(getQueryUrl(value)).then(response => {
        setFetchedItems(response.data.items)
        setIsLoading(false)
      })
    },
    updateUrl = (key, value) => {
      const url = new URL(window.location)
      url.searchParams.set(key, value)
      window.history.pushState({}, "", url)
    },
    handleQuery = e => {
      let value = e.target.value
      setQuery(value)
      updateUrl("query", value)

      if (!query) {
        setIsLoading(false)
        return null
      }

      setIsLoading(true)
    },
    renderFilter = () => {
      return (
        <Form.Group className="mb-2 mb-md-0">
          <Form.Control
            defaultValue={query}
            placeholder="Arkham horror, Scythe, Sapphire, ..."
            onChange={handleQuery}
          />
        </Form.Group>
      )
    },
    sortingKeyToLabel = {
      magia: "Ordina per magia",
      nome: "Ordine alfabetico",
      sconto: "I più scontati",
      "prezzo-up": "I meno costosi",
      "prezzo-down": "I più costosi",
    },
    handleSorting = value => {
      setSorting(value)
      updateUrl("sort", value)
    },
    renderSorting = () => {
      return (
        <DropdownButton
          variant="light"
          id="dropdown-basic-button"
          className={style.sorter}
          title={sortingKeyToLabel[sorting]}
          onSelect={handleSorting}
        >
          {Object.keys(sortingKeyToLabel).map(key => (
            <Dropdown.Item eventKey={key}>
              {sortingKeyToLabel[key]}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      )
    },
    renderItem = props => {
      return (
        <Col
          key={props.url}
          xs={6}
          lg={4}
          className="d-flex align-items-stretch mb-3"
        >
          <DiscountCard {...props} />
        </Col>
      )
    },
    sortByName = (a, b) => a.title.localeCompare(b.title),
    sortByDiscount = (a, b) => b.discount - a.discount,
    sortByPrice = (a, b) => b.currentPrice - a.currentPrice,
    getItems = () => {
      let items
      if (query) {
        items = [...fetchedItems]
      } else {
        items = [...fetchedDiscountItems]
      }

      items = items.filter(x => x.title)

      if (sorting === "nome") {
        return items.sort(sortByName)
      }
      if (sorting === "sconto") {
        return items.sort(sortByDiscount)
      }
      if (sorting === "prezzo-down") {
        return items.sort(sortByPrice)
      }
      if (sorting === "prezzo-up") {
        return items.sort(sortByPrice).reverse()
      }
      return query ? items : items.sort(sortByDiscount)
    },
    renderItems = () => {
      if (isLoading) {
        return <Spinner />
      }

      const items = getItems()
      if (items.length === 0) {
        return <div className="mt-5 text-center">Nessun gioco trovato :(</div>
      }
      return items.map(renderItem)
    }

  useEffect(() => {
    setIsLoading(true)
    if (firstFetch) {
      if (!query) {
        fetchDiscountItems()
        return
      }
    }

    if (!query) {
      setIsLoading(false)
      setFetchedItems([])
      return
    }

    const timeout = setTimeout(() => {
      fetchItems(query)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [query])

  return (
    <Layout location={location} title={metaTitle}>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href="https://dudexpress.it/" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta
          property="og:image"
          content={`https://dudexpress.it${withPrefix("logo/logo.png")}`}
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta
          name="twitter:image"
          content={`https://dudexpress.it${withPrefix("logo/logo.png")}`}
        />
      </Helmet>

      <div className={style.discounts}>
        <div className="main-content mb-5">
          <Container className="mb-5">
            <Row className="game-list">
              <Col lg={{ span: 8, offset: 2 }} className="mt-4">
                <h1 className="mt-5">
                  Trova sconti <small className="text-muted">- beta</small>
                </h1>
                <blockquote className="mb-5 text-muted">
                  I migliori giochi in sconto sui nostri store preferiti!
                  <br />
                  Affrettati, dureranno poco!
                </blockquote>

                <Row className="mb-3">
                  <Col md={8}>{renderFilter()}</Col>
                  <Col md={4}>{renderSorting()}</Col>
                </Row>
                <Row>{renderItems()}</Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Layout>
  )
}

export default Discount

export const discountQuery = graphql`
  query discountQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
