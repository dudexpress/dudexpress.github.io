import React, { useState } from "react"
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
  const { title, description } = data.site.siteMetadata,
    metaTitle = `Ricerca | ${title}`,
    metaDescription = "Pagina di ricerca"

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://dudexpress.it/search" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`https://dudexpress.it${withPrefix("logo/logo.png")}`}
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={`https://dudexpress.it${withPrefix("logo/logo.png")}`}
        />
      </Helmet>

      <div style={{ minHeight: "calc(100vh - 88px)" }} className={style.index}>
        <div className="main-content">
          <Container className="read-more-posts pt-0">
            <Row className="game-list">
              <Col lg={{ span: 8, offset: 2 }}>
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
          date(formatString: "MMMM DD, YYYY")
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
    otherGames: allMdx(
      skip: 6
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
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
