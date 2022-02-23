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

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://dudexpress.it/" />

        <meta name="og:type" content="website" />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:image" content={withPrefix("logo/logo.png")} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={withPrefix("logo/logo.png")} />
      </Helmet>

      {/* <Search {...data.localSearchPages} location={location} /> */}
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
                <FantasiaHomepage />
                <div className="mt-5"></div>
                <Socials />
              </Col>
            </Row>
            {/* <Link to="/blog" rel="next">Scopri di più →</Link> */}
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
