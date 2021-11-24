import React from "react"
import { Link, graphql } from "gatsby"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import Layout from "../components/Layout"
import Seo from "../components/seo"
import WhoWeAre from "../components/WhoWeAre"
import GameCard from "../components/GameCard"
import Search from "../components/Search"

const BlogIndex = ({ data, location }) => {
  const { title, authors } = data.site.siteMetadata

  return (
    <Layout location={location} title={title}>
      <Seo title="Welcome" />
      {/* <Search {...data.localSearchPages} location={location} /> */}
      <div style={{ minHeight: "calc(100vh - 88px)" }}>
        <Container className="text-center welcome-title">
          <h1>{title}</h1>
          <h5>Recensioni semplici, immediate e immersive</h5>
        </Container>

        <div className="main-content">
          <Container className="read-more-posts pt-0">
            <Row className="game-list">
              <Col lg={{ span: 6, offset: 3 }}>
                <h1>Leggi gli ultimi articoli</h1>
                {data.allMdx.nodes.map(post => (
                  <GameCard key={post.frontmatter.title} post={post} />
                ))}
              </Col>
            </Row>
            {/* <Link to="/blog" rel="next">
            Scopri di più →
          </Link> */}
            {/* <hr /> */}
            {/* <h2>Chi siamo</h2> */}
            {/* <WhoWeAre authors={authors} /> */}
          </Container>
        </div>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    localSearchPages {
      index
      store
    }
    site {
      siteMetadata {
        title
        authors {
          name
          summary
          image
        }
      }
    }
    allMdx(limit: 5, sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          featureImage {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          description
        }
      }
    }
  }
`
