import React from "react"
import { graphql } from "gatsby"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { withPrefix } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/Layout"
import Search from "../components/Search"
import * as style from "./index.module.scss"

const Index = ({ data, location }) => {
  const { title } = data.site.siteMetadata,
    metaTitle = `Ricerca | ${title}`,
    metaDescription = "Pagina di ricerca"

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href="https://dudexpress.it/search" />

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

      <div
        style={{ minHeight: "calc(100vh - 82px - 88px)" }}
        className={style.index}
      >
        <div className="main-content">
          <Container className="mb-5">
            <Row className="game-list">
              <Col lg={{ span: 8, offset: 2 }} className="mt-4">
                <h1 className="my-5">Cerca</h1>

                <Search
                  {...data.localSearchPages}
                  location={location}
                  defaultPosts={data.allMdx.nodes}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query {
    localSearchPages {
      index
      store
    }
    site {
      siteMetadata {
        title
        description
        authors {
          name
          summary
          image
        }
      }
    }
    allMdx(limit: 6, sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD/MM/YYYY")
          writer
          title
          designer
          publisher

          featureImage {
            childImageSharp {
              gatsbyImageData(
                width: 330
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          description
        }
      }
    }
  }
`
