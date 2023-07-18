import { Link, graphql } from "gatsby"

import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import GameCard from "../components/misc/GameCard"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import React from "react"
import Row from "react-bootstrap/Row"

const FundingBlogList = ({ data, location, pageContext }) => {
  const { title } = data.site.siteMetadata
  const { currentPage, numPages, basePath } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString(),
    metaTitle = `${pageContext.title} - pagina ${currentPage} | ${title}`

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>{metaTitle}</title>
      </Helmet>

      <Container className="mb-5">
        <Row className="game-list">
          <Col lg={{ span: 8, offset: 2 }}>
            <h1 className="my-5">
              {pageContext.title} - pagina {currentPage}
            </h1>

            {data.allMdx.edges.map(post => (
              <GameCard key={post.node.frontmatter.title} post={post.node} />
            ))}

            <div className="text-center">
              {!isFirst && (
                <Link
                  to={`/${basePath}/${prevPage}`}
                  rel="prev"
                  className="btn btn-outline-secondary mt-2 mb-4 mx-2"
                >
                  ←
                </Link>
              )}

              {!isLast && (
                <Link
                  to={`/${basePath}/${nextPage}`}
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

export default FundingBlogList

export const FundingBlogListQuery = graphql`
  query FundingBlogListQuery($skip: Int!, $limit: Int!, $types: [String]) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { frontmatter: { type: { in: $types } } }
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
            mechanisms
            featureImage {
              childImageSharp {
                gatsbyImageData(
                  width: 330
                  placeholder: BLURRED
                  formats: [JPG, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
  }
`
