import React from "react"
import Container from "react-bootstrap/Container"
import { Helmet } from "react-helmet"

import Layout from "../components/Layout"
import { graphql } from "gatsby"
import { SiteMetadata } from "../types"

interface Icon {
  name: string
  url: string
}

// [...document.querySelectorAll('.icons-list__item a')].map(x => ({name: x.href.split('/')[5], url: x.href.split('/')[4] + '/' + x.href.split('/')[5]}))

const icons: Icon[] = [
  { name: "whale", url: "vLoyKUoYhPuX/whale" },
  { name: "corgi", url: "116897/corgi" },
  { name: "elephant", url: "101717/elephant" },
  { name: "hummingbird", url: "_tOGCvyYkx7s/hummingbird" },
  { name: "parrot", url: "8Yhi0cuR80EI/parrot" },
  { name: "woman", url: "SSfJ7MRp9qFs/woman" },
  { name: "woman", url: "QvUXDRHlRbI0/woman" },
  { name: "woman", url: "2IWbKLq6AxuJ/woman" },
  { name: "woman", url: "rKoU3TfWBuZz/woman" },
  { name: "woman", url: "FlwLlmA9IP8d/woman" },
  { name: "woman", url: "7iD2xZ2XTgaI/woman" },
  { name: "woman", url: "VGbcWHIzNwLW/woman" },
  { name: "woman", url: "ru1fDgX61vqA/woman" },
  { name: "man", url: "p2HqVHxNq3CQ/man" },
  { name: "man", url: "hn6wdLdmoBYd/man" },
  { name: "man", url: "ioDdQy2TH8B5/man" },
  { name: "man", url: "rKBmYRUjvbdl/man" },
  { name: "man", url: "c9J06F8lHhV7/man" },
  { name: "man", url: "VvMpLZL5r0aX/man" },
  { name: "man", url: "x0GTt798eXuD/man" },
  { name: "man", url: "dkYCqZS6eHXG/man" },
  { name: "heart", url: "95473/heart" },
  { name: "half-heart", url: "6I8HUVi4eZCN/half-heart" },
]

const renderCredit = (icon: Icon): React.ReactNode => {
  return (
    <li>
      <a target="_blank" href={`https://icons8.com/icon/${icon.url}`}>
        {icon.name}
      </a>{" "}
      icon by{" "}
      <a target="_blank" href="https://icons8.com">
        Icons8
      </a>
    </li>
  )
}

const Credits = ({
  data,
  location,
}: {
  data: CreditsProps
  location: Location
}) => {
  const { title } = data.site.siteMetadata

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>Credits</title>
      </Helmet>

      <div
        style={{ minHeight: "calc(100vh - 88px - 94px)" }}
        className="main-content"
      >
        <Container>
          <h2>Credits</h2>
          <ul>{icons.map(renderCredit)}</ul>
        </Container>
      </div>
    </Layout>
  )
}

export default Credits

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export interface CreditsProps {
  site: {
    siteMetadata: SiteMetadata
  }
}
