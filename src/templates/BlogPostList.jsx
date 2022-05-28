import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import GameCard from "../components/misc/GameCard"
import { Helmet } from "react-helmet"

const BlogList = ({ data, location, pageContext }) => {
  const { title } = data.site.siteMetadata
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString(),
    metaTitle = `Recensioni - pagina ${currentPage} | ${title}`

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>{metaTitle}</title>
      </Helmet>

      <Container className="mb-5">
        <Row className="game-list">
          <Col lg={{ span: 8, offset: 2 }}>
            <h1 className="my-5">Recensioni - pagina {currentPage}</h1>

            {data.allMdx.edges.map(post => (
              <GameCard key={post.node.frontmatter.title} post={post.node} />
            ))}

            <div className="text-center">
              {!isFirst && (
                <Link
                  to={`/blog/${prevPage}`}
                  rel="prev"
                  className="btn btn-outline-secondary mt-2 mb-4 mx-2"
                >
                  ←
                </Link>
              )}

              {!isLast && (
                <Link
                  to={`/blog/${nextPage}`}
                  rel="next"
                  className="btn btn-outline-secondary mt-2 mb-4 mx-2"
                >
                  →
                </Link>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default BlogList

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
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
