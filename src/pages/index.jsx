import React, { useState } from "react"
import { graphql } from "gatsby"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { withPrefix } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/Layout"
import GameCard from "../components/misc/GameCard"
import * as style from "./index.module.scss"
import BlogPostHeader from "../components/blogPostAreas/BlogPostHeader"
import FantasiaHomepage from "../components/misc/FantasiaHomepage"
import Socials from "../components/sidebar/Socials"

const Index = ({ data, location }) => {
  const [renderOtherGames, setRenderOtherGames] = useState(false)
  const { title, description } = data.site.siteMetadata,
    [firstPost, ...posts] = data.allMdx.nodes

  const renderOtherPosts = () => {
    if (renderOtherGames) {
      return data.otherGames.nodes.map(post => (
        <GameCard key={post.frontmatter.title} post={post} />
      ))
    }
    return (
      <div className="text-center">
        <button
          className="btn btn-outline-secondary mt-2 mb-4"
          onClick={() => setRenderOtherGames(true)}
        >
          Leggi di più
        </button>
      </div>
    )
  }

  const structuredJSON = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://dudexpress.it/#organization",
        name: "dudexpress",
        url: "https://dudexpress.it/",
        sameAs: [
          "https://www.facebook.com/dudexpress.review",
          "https://www.instagram.com/dudexpress.review/",
        ],
        logo: {
          "@type": "ImageObject",
          "@id": "https://dudexpress.it/#logo",
          inLanguage: "it-IT",
          url: `https://dudexpress.it${withPrefix("logo/logo.png")}`,
          caption: "dudexpress",
        },
        image: { "@id": "https://dudexpress.it/#logo" },
      },
      {
        "@type": "WebSite",
        "@id": "https://dudexpress.it/#website",
        url: "https://dudexpress.it/",
        name: title,
        description,
        publisher: { "@id": "https://dudexpress.it/#organization" },
        potentialAction: [],
        inLanguage: "it-IT",
      },
    ],
  })

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>{title} | Recensioni di giochi da tavolo</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://dudexpress.it/" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`https://dudexpress.it${withPrefix("logo/logo.png")}`}
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={`https://dudexpress.it${withPrefix("logo/logo.png")}`}
        />

        <script type="application/ld+json">{structuredJSON}</script>
      </Helmet>

      <div style={{ minHeight: "calc(100vh - 88px)" }} className={style.index}>
        <div className="main-content">
          <BlogPostHeader
            fields={firstPost.fields}
            frontmatter={firstPost.frontmatter}
            withLink
          />

          <Container className="read-more-posts pt-0">
            <Row className="game-list">
              <Col lg={8}>
                {posts.map(post => (
                  <GameCard key={post.frontmatter.title} post={post} />
                ))}
                {renderOtherPosts()}
              </Col>
              <Col lg={4}>
                <h5>Benvenuto su dudexpress.it!</h5>
                <blockquote>
                  Recensioni di giochi da tavolo semplici, immediate e
                  immersive.
                </blockquote>
                <div className="mt-5"></div>
                <Socials />
                <div className="mt-5"></div>
                <FantasiaHomepage />
              </Col>
            </Row>
            {/* <WhoWeAre authors={data.site.siteMetadata.authors} /> */}
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
    otherGames: allMdx(
      skip: 6
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
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
