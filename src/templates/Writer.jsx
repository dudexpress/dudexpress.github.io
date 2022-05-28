import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Container from "react-bootstrap/Container"
import GameCard from "../components/misc/GameCard"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import PostWriter from "../components/misc/PostWriter"
import { Helmet } from "react-helmet"

const writers = ({ pageContext, location, data }) => {
  const { title } = data.site.siteMetadata,
    metaTitle = `${pageContext.writer} | ${title}`

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>{metaTitle}</title>
      </Helmet>

      <Container className="mb-5">
        <Row className="game-list">
          <Col lg={{ span: 8, offset: 2 }}>
            <div className="my-5">
              <PostWriter writerName={pageContext.writer} asCard={false} />
            </div>

            {data.allMdx.edges.map(post => (
              <GameCard key={post.node.frontmatter.title} post={post.node} />
            ))}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export const writersQuery = graphql`
  query writerQuery($ids: [String]!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { id: { in: $ids } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            writer
            title
            description
            featureImage {
              childImageSharp {
                gatsbyImageData(
                  width: 330
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
  }
`

export default writers
