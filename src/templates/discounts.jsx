import React, { useEffect, useState } from "react"
import { graphql, withPrefix } from "gatsby"
import Container from "react-bootstrap/Container"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"
import Row from "react-bootstrap/Row"
import Badge from "react-bootstrap/Badge"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import * as style from "./discounts.module.scss"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import axios from "axios"

const Discount = ({ data, location, pageContext }) => {
  const [sorting, setSorting] = useState("nome"),
    [query, setQuery] = useState(),
    [isLoading, setIsLoading] = useState(false),
    [fetchedItems, setFetchedItems] = useState([]),
    { title } = data.site.siteMetadata,
    metaTitle = `Giochi in sconto | ${title}`,
    metaDescription =
      "I migliori giochi in sconto sui nostri store preferiti! Affrettati, dureranno poco!",
    getQueryUrl = value => {
      if (!value) {
        return null
      }
      return `https://dude.hardwarepanic.it/search?query=${value
        .split(" ")
        .join("%20")}`
    },
    fetchItems = value => {
      console.log("FETCH!", value)
      axios.get(getQueryUrl(value)).then(response => {
        setIsLoading(false)
        console.log(response)
        setFetchedItems(response.data.items)
        console.log(response.items)
        // console.log(response.data[0]?.PostOffice[0])
      })
    },
    handleQuery = e => {
      let value = e.target.value
      setQuery(value)

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
            placeholder="Jumangi, Monopoly, ..."
            onChange={handleQuery}
          />
        </Form.Group>
      )
    },
    renderSorting = () => {
      return (
        <DropdownButton
          variant="light"
          id="dropdown-basic-button"
          className={style.sorter}
          title={`Ordina per ${sorting}`}
          onSelect={setSorting}
        >
          <Dropdown.Item eventKey="nome">Nome</Dropdown.Item>
          <Dropdown.Item eventKey="sconto">Sconto</Dropdown.Item>
        </DropdownButton>
      )
    },
    renderStore = link => {
      const heigth = 45
      if (link.includes("dungeondice.it")) {
        return (
          <img
            src="../../logo/dungeondice.png"
            alt="dungeondice"
            height={heigth}
          />
        )
      }
      if (link.includes("getyourfun.it")) {
        return (
          <img
            src="../../logo/getyourfun.jpg"
            alt="getyourfun"
            height={heigth}
          />
        )
      }
      if (link.includes("fantasiastore.it")) {
        return (
          <img src="../../logo/fantasia.png" alt="fantasia" height={heigth} />
        )
      }
      return <img src="../../logo/weega.png?t=1" alt="weega" height={heigth} />
    },
    renderItem = ({ title, url, link, img, image, discount }) => {
      console.log({ title, url, img, discount })
      url = url ? url : link
      img = img ? img : image
      return (
        <Col
          key={url}
          xs={6}
          lg={4}
          className="d-flex align-items-stretch mb-3"
        >
          <Card className={style.gameCard}>
            <OutboundLink
              href={url}
              target="_blank"
              className="stretched-link"
            />
            <Card.Img variant="top" src={img} />
            <Card.Body className="px-0">
              <Card.Title className="mb-0">{title}</Card.Title>
            </Card.Body>
            <Card.Footer className="text-right text-muted bg-white border-0 p-0 d-flex justify-content-between align-items-center">
              {renderStore(url)}
              <div>
                <Badge className={style.badge}>{discount}</Badge>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      )
    },
    sortByName = (a, b) => a.title.localeCompare(b.title),
    sortByDiscount = (a, b) => {
      const discountA = parseInt(a.discount, 10),
        discountB = parseInt(b.discount, 10)

      return discountA - discountB
    },
    getItems = () => {
      if (query) {
        console.log("fetchedItems", fetchedItems)
        return fetchedItems
      }

      let items = [...pageContext.discountItems].filter(x => x.title)

      // if (query) {
      // items = items.filter(x =>
      // x.title.toLowerCase().includes(query.toLowerCase())
      // )
      // }
      if (sorting === "nome") {
        return items.sort(sortByName)
      }
      if (sorting === "sconto") {
        return items.sort(sortByDiscount)
      }
      return items
    },
    renderItems = () => {
      if (isLoading) {
        return "loading..."
      }

      const items = getItems()
      if (items.length === 0) {
        return (
          <div className="mt-5 text-center">
            Questo gioco oggi non è in sconto :(
          </div>
        )
      }
      return items.map(renderItem)
    }

  // useEffect(() => {
  //   // This gets called after every render, by default
  //   // (the first one, and every one after that)
  //   console.log(query)

  //   if (!query) {
  //     setIsLoading(false)
  //     return null
  //   }

  //   setIsLoading(true)
  //   debounce(() => {
  //     console.log("AAAAA")
  //     axios.get(getQueryUrl()).then(response => {
  //       setIsLoading(false)
  //       setFetchedItems(response.items)
  //       console.log(response.items)
  //       // console.log(response.data[0]?.PostOffice[0])
  //     })
  //   })

  //   // If you want to implement componentWillUnmount,
  //   // return a function from here, and React will call
  //   // it prior to unmounting.
  //   // return () => console.log("unmounting...")
  // }, [query])

  useEffect(
    () => {
      // Wait 1000ms before copying the value of tempValue into value;
      if (!query) {
        setIsLoading(false)
        setFetchedItems([])
        return
      }

      const timeout = setTimeout(() => {
        fetchItems(query)
      }, 1000)

      // If the hook is called again, cancel the previous timeout
      // This creates a debounce instead of a delay
      return () => clearTimeout(timeout)
    },
    // Run the hook every time the user makes a keystroke
    [query]
  )

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
                <h1 className="mt-5">Giochi in sconto</h1>
                <blockquote className="mb-5 text-muted">
                  I migliori giochi in sconto sui nostri store preferiti! <br />
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
